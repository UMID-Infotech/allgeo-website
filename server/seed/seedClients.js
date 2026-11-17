// server/seed/seedClients.js
//
// Standalone script to load src/data/clients.json into the PostgreSQL
// `clients` table.
//
// This is NOT imported or run by server.js — run it manually.
//
// Usage (from project root, where package.json lives):
//   npm run db:schema          (once, creates the tables)
//   node server/seed/seedClients.js
//
// Safe to re-run: it upserts by name, so running it again after editing
// src/data/clients.json syncs the database instead of creating duplicates.

import "dotenv/config";
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

import { pool } from "../config/db.js";
import { upsertClientByName } from "../models/Client.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// clients.json is plain JSON (not a .js module export), so it's read and
// parsed manually here instead of using a static import.
const clientsPath = path.join(__dirname, "../../src/data/clients.json");

try {
  const raw = await readFile(clientsPath, "utf-8");
  const clients = JSON.parse(raw);

  let created = 0;
  let updated = 0;

  for (let index = 0; index < clients.length; index += 1) {
    const item = clients[index];

    const inserted = await upsertClientByName({
      name: item.name,
      logo: item.logo,
      order: index,
    });

    if (inserted) {
      created += 1;
      console.log(`Created client: ${item.name}`);
    } else {
      updated += 1;
      console.log(`Updated client: ${item.name}`);
    }
  }

  console.log("\nSeed summary:");
  console.log(`  Clients -> created: ${created}, updated: ${updated}`);
} catch (error) {
  console.error("Error seeding clients:", error.message);
  process.exitCode = 1;
} finally {
  await pool.end();
}