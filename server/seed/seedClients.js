// server/seed/seedClients.js
//
// Standalone script to load src/data/clients.json into the database
// (Client collection).
//
// This is NOT imported or run by server.js — run it manually.
//
// Usage (from project root, where package.json lives):
//   node server/seed/seedClients.js
//
// Safe to re-run: it upserts by name, so running it again after editing
// src/data/clients.json will sync the database with the latest content
// instead of creating duplicates.

import "dotenv/config";
import mongoose from "mongoose";
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

import connectDB from "../config/db.js";
import Client from "../models/Client.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// clients.json is plain JSON (not a .js module export), so it's read and
// parsed manually here instead of using a static import.
const clientsPath = path.join(
  __dirname,
  "../../src/data/clients.json"
);

const seedClients = async () => {
  try {
    await connectDB();

    const raw = await readFile(clientsPath, "utf-8");
    const clients = JSON.parse(raw);

    let created = 0;
    let updated = 0;

    for (let index = 0; index < clients.length; index += 1) {
      const item = clients[index];

      let clientDoc = await Client.findOne({ name: item.name });

      if (!clientDoc) {
        await Client.create({
          name: item.name,
          logo: item.logo,
          order: index,
          isActive: true,
        });

        created += 1;
        console.log(`Created client: ${item.name}`);
      } else {
        clientDoc.logo = item.logo;
        clientDoc.order = index;

        await clientDoc.save();

        updated += 1;
        console.log(`Updated client: ${item.name}`);
      }
    }

    console.log("\nSeed summary:");
    console.log(`  Clients -> created: ${created}, updated: ${updated}`);

    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error("Error seeding clients:", error.message);
    await mongoose.disconnect();
    process.exit(1);
  }
};

seedClients();