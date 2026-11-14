// One-time import from MongoDB Compass full-collection JSON exports.
// Usage: node server/migrations/importMongoExports.js "D:\\Projects\\allgeo-db-backup"
// The directory must stay outside this Git repository. This script refuses
// to import when any target table already contains rows.

import "dotenv/config";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import pg from "pg";

const exportDir = process.argv[2];
if (!exportDir) {
  console.error("Usage: node server/migrations/importMongoExports.js <export-directory>");
  process.exit(1);
}

const requiredEnv = ["PGHOST", "PGPORT", "PGDATABASE", "PGUSER", "PGPASSWORD"];
const missingEnv = requiredEnv.filter((key) => !process.env[key]);
if (missingEnv.length) {
  console.error(`Missing environment settings: ${missingEnv.join(", ")}`);
  process.exit(1);
}

const objectId = (value, field) => {
  const id = typeof value === "string" ? value : value?.$oid;
  if (typeof id !== "string" || !id.trim()) {
    throw new Error(`Invalid or missing ${field} in MongoDB export`);
  }
  return id;
};

const dateValue = (value) => {
  if (value == null) return null;
  const raw = typeof value === "object" && "$date" in value ? value.$date : value;
  const millis = typeof raw === "object" && "$numberLong" in raw ? Number(raw.$numberLong) : raw;
  const date = new Date(millis);
  if (Number.isNaN(date.getTime())) throw new Error("Invalid date in MongoDB export");
  return date;
};

const nonempty = (value, field) => {
  if (typeof value !== "string" || !value.trim()) throw new Error(`Missing ${field} in MongoDB export`);
  return value;
};

const readCollection = async (name) => {
  const file = path.join(exportDir, `allgeo-solutions.${name}.json`);
  const content = await readFile(file, "utf8");
  let rows;
  try {
    rows = JSON.parse(content);
  } catch {
    // Some export tools produce one JSON document per line.
    rows = content.split(/\r?\n/).filter(Boolean).map((line) => JSON.parse(line));
  }
  if (!Array.isArray(rows) || rows.length === 0 || rows.some((row) => !row || typeof row !== "object")) {
    throw new Error(`${file} must contain a nonempty collection of documents`);
  }
  return rows;
};

const counts = { admins: 0, services: 0, serviceFaqs: 0 };
let transactionStarted = false;
const client = new pg.Client({
  host: process.env.PGHOST,
  port: Number(process.env.PGPORT),
  database: process.env.PGDATABASE,
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  connectionTimeoutMillis: 10000,
});

try {
  // Read and validate all three files before opening a database transaction.
  const [admins, services, faqs] = await Promise.all([
    readCollection("admins"),
    readCollection("services"),
    readCollection("servicefaqs"),
  ]);
  console.log(`Source: ${admins.length} admins, ${services.length} services, ${faqs.length} FAQs`);

  const schemaPath = path.join(path.dirname(fileURLToPath(import.meta.url)), "schema.sql");
  const schema = await readFile(schemaPath, "utf8");
  await client.connect();
  await client.query("BEGIN");
  transactionStarted = true;
  await client.query(schema);

  const existing = await client.query(`
    SELECT (SELECT count(*) FROM admins) AS admins,
           (SELECT count(*) FROM services) AS services,
           (SELECT count(*) FROM service_faqs) AS faqs
  `);
  if (Object.values(existing.rows[0]).some((value) => Number(value) > 0)) {
    throw new Error("PostgreSQL tables already contain records; import aborted to prevent overwriting data");
  }

  for (const item of admins) {
    await client.query(
      `INSERT INTO admins
       (id, name, email, password_hash, role, is_active, last_login, created_at, updated_at)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)`,
      [
        objectId(item._id, "admin _id"), nonempty(item.name, "admin name"),
        nonempty(item.email, "admin email").toLowerCase().trim(),
        nonempty(item.password, "admin password hash"), item.role ?? "admin",
        item.isActive ?? true, dateValue(item.lastLogin),
        dateValue(item.createdAt) ?? new Date(), dateValue(item.updatedAt) ?? new Date(),
      ],
    );
    counts.admins += 1;
  }

  const serviceIds = new Set();
  for (const item of services) {
    const id = objectId(item._id, "service _id");
    serviceIds.add(id);
    await client.query(
      `INSERT INTO services
       (id, slug, title, short_description, long_description, image, order_index, is_active, created_at, updated_at)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)`,
      [
        id, nonempty(item.slug, "service slug").toLowerCase().trim(),
        nonempty(item.title, "service title"), nonempty(item.shortDescription, "short description"),
        nonempty(item.longDescription, "long description"), nonempty(item.image, "service image"),
        item.order ?? 0, item.isActive ?? true,
        dateValue(item.createdAt) ?? new Date(), dateValue(item.updatedAt) ?? new Date(),
      ],
    );
    counts.services += 1;
  }

  for (const item of faqs) {
    const serviceId = objectId(item.service, "FAQ service reference");
    if (!serviceIds.has(serviceId)) throw new Error(`FAQ refers to missing service ${serviceId}`);
    const images = item.images ?? [];
    if (!Array.isArray(images) || images.some((image) => typeof image !== "string")) {
      throw new Error(`Invalid images for FAQ ${objectId(item._id, "FAQ _id")}`);
    }
    await client.query(
      `INSERT INTO service_faqs
       (id, service_id, service_slug, faq_id, title, description, images, order_index, created_at, updated_at)
       VALUES ($1,$2,$3,$4,$5,$6,$7::jsonb,$8,$9,$10)`,
      [
        objectId(item._id, "FAQ _id"), serviceId,
        nonempty(item.serviceSlug, "FAQ service slug"), nonempty(item.faqId, "FAQ ID"),
        nonempty(item.title, "FAQ title"), nonempty(item.description, "FAQ description"),
        JSON.stringify(images), item.order ?? 0,
        dateValue(item.createdAt) ?? new Date(), dateValue(item.updatedAt) ?? new Date(),
      ],
    );
    counts.serviceFaqs += 1;
  }

  await client.query("COMMIT");
  transactionStarted = false;
  console.log("Import complete:", counts);
} catch (error) {
  if (transactionStarted) await client.query("ROLLBACK").catch(() => {});
  console.error("Import failed:", error.message);
  process.exitCode = 1;
} finally {
  await client.end().catch(() => {});
}
