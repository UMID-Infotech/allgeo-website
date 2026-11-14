// Optional initial admin setup for a new, empty PostgreSQL database.
// Existing admin records (including migrated password hashes) are never changed.
import "dotenv/config";
import { randomUUID } from "node:crypto";
import bcrypt from "bcryptjs";
import { pool } from "../config/db.js";

const name = process.env.ADMIN_NAME || "Admin";
const email = process.env.ADMIN_EMAIL?.toLowerCase().trim();
const password = process.env.ADMIN_PASSWORD;

try {
  if (!email || !password) throw new Error("Set ADMIN_EMAIL and ADMIN_PASSWORD before seeding an admin");
  const existing = await pool.query("SELECT id FROM admins WHERE email=$1", [email]);
  if (existing.rowCount) {
    console.log("Admin already exists; no changes made.");
  } else {
    const hash = await bcrypt.hash(password, 10);
    await pool.query(
      "INSERT INTO admins (id, name, email, password_hash) VALUES ($1,$2,$3,$4)",
      [randomUUID(), name, email, hash],
    );
    console.log("Admin seeded successfully.");
  }
} catch (error) {
  console.error("Error seeding admin:", error.message);
  process.exitCode = 1;
} finally {
  await pool.end();
}
