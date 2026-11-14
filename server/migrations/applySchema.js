// Safe to run on an existing database: schema.sql uses CREATE ... IF NOT EXISTS.
import "dotenv/config";
import { readFile } from "node:fs/promises";
import { pool } from "../config/db.js";

try {
  const sql = await readFile(new URL("./schema.sql", import.meta.url), "utf8");
  await pool.query(sql);
  console.log("Database schema applied successfully.");
} catch (error) {
  console.error("Schema update failed:", error.message);
  process.exitCode = 1;
} finally {
  await pool.end();
}
