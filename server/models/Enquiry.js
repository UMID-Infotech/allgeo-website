// server/models/Enquiry.js
import mongoose from "mongoose";

const enquirySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },

    contactNumber: {
      type: String,
      required: true,
      trim: true,
    },

    message: {
      type: String,
      required: true,
      trim: true,
    },

    // ---- Admin follow-up tracking ----

    // How the admin plans to / did follow up with this enquiry.
    followUpType: {
      type: String,
      enum: ["none", "call", "email"],
      default: "none",
    },

    // Whether the admin was able to connect with the person.
    isConnected: {
      type: Boolean,
      default: false,
    },

    // Free-text notes from the admin about the follow-up.
    remarks: {
      type: String,
      trim: true,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const Enquiry = mongoose.model("Enquiry", enquirySchema);

export default Enquiry;