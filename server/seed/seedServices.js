// server/seed/seedServices.js
//
// Standalone script to load src/data/services.js and src/data/serviceFaqs.js
// into the database (Service and ServiceFaq collections).
//
// This is NOT imported or run by server.js — run it manually.
//
// Usage (from project root, where package.json lives):
//   node server/seed/seedServices.js
//
// Safe to re-run: it upserts by slug / faqId, so running it again after
// editing src/data/services.js or src/data/serviceFaqs.js will sync the
// database with the latest content instead of creating duplicates.

import "dotenv/config";
import mongoose from "mongoose";

import connectDB from "../config/db.js";
import Service from "../models/Service.js";
import ServiceFaq from "../models/ServiceFaq.js";

import services from "../../src/data/services.js";
import serviceFaqs from "../../src/data/serviceFaqs.js";

const seedServices = async () => {
  try {
    await connectDB();

    let servicesCreated = 0;
    let servicesUpdated = 0;
    let faqsCreated = 0;
    let faqsUpdated = 0;

    // Keep track of slug -> Service document for linking FAQs afterwards.
    const serviceBySlug = new Map();

    // ---- 1. Upsert services (explicit find, then create or update) ----
    for (let index = 0; index < services.length; index += 1) {
      const item = services[index];

      let serviceDoc = await Service.findOne({ slug: item.slug });

      if (!serviceDoc) {
        serviceDoc = await Service.create({
          slug: item.slug,
          title: item.title,
          shortDescription: item.shortDescription,
          longDescription: item.longDescription,
          image: item.image,
          order: index,
          isActive: true,
        });

        servicesCreated += 1;
        console.log(`Created service: ${item.slug}`);
      } else {
        serviceDoc.title = item.title;
        serviceDoc.shortDescription = item.shortDescription;
        serviceDoc.longDescription = item.longDescription;
        serviceDoc.image = item.image;
        serviceDoc.order = index;

        await serviceDoc.save();

        servicesUpdated += 1;
        console.log(`Updated service: ${item.slug}`);
      }

      serviceBySlug.set(item.slug, serviceDoc);
    }

    // ---- 2. Upsert service FAQs (accordion items) ----
    const faqSlugs = Object.keys(serviceFaqs);

    for (const slug of faqSlugs) {
      const serviceDoc = serviceBySlug.get(slug);

      if (!serviceDoc) {
        console.warn(
          `Skipping FAQs for "${slug}" — no matching service found in services.js.`
        );
        continue;
      }

      const items = serviceFaqs[slug] ?? [];

      for (let index = 0; index < items.length; index += 1) {
        const item = items[index];

        let faqDoc = await ServiceFaq.findOne({
          service: serviceDoc._id,
          faqId: item.id,
        });

        if (!faqDoc) {
          await ServiceFaq.create({
            service: serviceDoc._id,
            serviceSlug: slug,
            faqId: item.id,
            title: item.title,
            description: item.description,
            images: item.images ?? [],
            order: index,
          });

          faqsCreated += 1;
        } else {
          faqDoc.serviceSlug = slug;
          faqDoc.title = item.title;
          faqDoc.description = item.description;
          faqDoc.images = item.images ?? [];
          faqDoc.order = index;

          await faqDoc.save();

          faqsUpdated += 1;
        }
      }

      console.log(`Synced ${items.length} FAQ item(s) for: ${slug}`);
    }

    console.log("\nSeed summary:");
    console.log(
      `  Services -> created: ${servicesCreated}, updated: ${servicesUpdated}`
    );
    console.log(
      `  Service FAQs -> created: ${faqsCreated}, updated: ${faqsUpdated}`
    );

    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error("Error seeding services:", error.message);
    await mongoose.disconnect();
    process.exit(1);
  }
};

seedServices();