// server/models/ServiceFaq.js
//
// Represents one accordion/expertise item belonging to a Service
// (matches the objects nested under each slug in src/data/serviceFaqs.js).

import mongoose from "mongoose";

const serviceFaqSchema = new mongoose.Schema(
  {
    service: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Service",
      required: true,
      index: true,
    },

    // Denormalized for fast lookups / matches the key used in serviceFaqs.js
    serviceSlug: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      index: true,
    },

    // Original item.id from serviceFaqs.js (e.g. "electrical-resistivity-tomography")
    faqId: {
      type: String,
      required: true,
      trim: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    images: {
      type: [String],
      default: [],
    },

    // Preserves the original array order for rendering the accordion
    order: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

// A given service cannot have two accordion items with the same faqId
serviceFaqSchema.index({ service: 1, faqId: 1 }, { unique: true });

const ServiceFaq = mongoose.model("ServiceFaq", serviceFaqSchema);

export default ServiceFaq;