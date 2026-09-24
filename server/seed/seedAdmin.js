// server/seed/seedAdmin.js
//
// Standalone script to seed the initial admin user.
// This is NOT imported or run by server.js — run it manually, once,
// before starting the server (see command below).
//
// Usage (from project root, where package.json lives):
//   node server/seed/seedAdmin.js
//
// It safely no-ops if an admin with this email already exists.

import "dotenv/config";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";

import connectDB from "../config/db.js";
import Admin from "../models/Admin.js";

const ADMIN_NAME = "Admin";
const ADMIN_EMAIL = "admin@allgeosolutions.com";
const ADMIN_PASSWORD = "Allgeos@123";

const seedAdmin = async () => {
  try {
    await connectDB();

    const existingAdmin = await Admin.findOne({
      email: ADMIN_EMAIL.toLowerCase().trim(),
    });

    if (existingAdmin) {
      console.log(
        `Admin with email "${ADMIN_EMAIL}" already exists. Skipping seed.`
      );
      await mongoose.disconnect();
      process.exit(0);
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(ADMIN_PASSWORD, salt);

    const admin = new Admin({
      name: ADMIN_NAME,
      email: ADMIN_EMAIL,
      password: hashedPassword,
      role: "admin",
      isActive: true,
    });

    await admin.save();

    console.log("Admin seeded successfully:");
    console.log(`  Email: ${ADMIN_EMAIL}`);
    console.log(`  Password: ${ADMIN_PASSWORD}`);
    console.log("Please log in and change the password if needed.");

    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error("Error seeding admin:", error.message);
    await mongoose.disconnect();
    process.exit(1);
  }
};

seedAdmin();