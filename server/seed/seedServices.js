// Optional sync from src/data into PostgreSQL. Existing migration data may be
// overwritten for matching slugs/FAQ IDs, so run only when explicitly desired.
import "dotenv/config";
import { randomUUID } from "node:crypto";
import { pool } from "../config/db.js";
import services from "../../src/data/services.js";
import serviceFaqs from "../../src/data/serviceFaqs.js";

let client;
try {
  client = await pool.connect();
  await client.query("BEGIN");
  const bySlug = new Map();
  for (const [index, item] of services.entries()) {
    const result = await client.query(
      `INSERT INTO services
       (id, slug, title, short_description, long_description, image, order_index)
       VALUES ($1,$2,$3,$4,$5,$6,$7)
       ON CONFLICT (slug) DO UPDATE SET
         title=EXCLUDED.title, short_description=EXCLUDED.short_description,
         long_description=EXCLUDED.long_description, image=EXCLUDED.image,
         order_index=EXCLUDED.order_index, updated_at=NOW()
       RETURNING id`,
      [randomUUID(), item.slug, item.title, item.shortDescription,
        item.longDescription, item.image, index],
    );
    bySlug.set(item.slug, result.rows[0].id);
  }

  let faqCount = 0;
  for (const [slug, items] of Object.entries(serviceFaqs)) {
    const serviceId = bySlug.get(slug);
    if (!serviceId) throw new Error(`No matching service for FAQ group ${slug}`);
    for (const [index, item] of items.entries()) {
      await client.query(
        `INSERT INTO service_faqs
         (id, service_id, service_slug, faq_id, title, description, images, order_index)
         VALUES ($1,$2,$3,$4,$5,$6,$7::jsonb,$8)
         ON CONFLICT (service_id, faq_id) DO UPDATE SET
           service_slug=EXCLUDED.service_slug, title=EXCLUDED.title,
           description=EXCLUDED.description, images=EXCLUDED.images,
           order_index=EXCLUDED.order_index, updated_at=NOW()`,
        [randomUUID(), serviceId, slug, item.id, item.title,
          item.description, JSON.stringify(item.images ?? []), index],
      );
      faqCount += 1;
    }
  }
  await client.query("COMMIT");
  console.log(`Synced ${services.length} services and ${faqCount} FAQs.`);
} catch (error) {
  if (client) await client.query("ROLLBACK").catch(() => {});
  console.error("Error seeding services:", error.message);
  process.exitCode = 1;
} finally {
  client?.release();
  await pool.end();
}
