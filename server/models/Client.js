// server/models/Client.js
import mongoose from "mongoose";

const clientSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    // Logo image URL shown in the ClientsSection slider.
    logo: {
      type: String,
      required: true,
      trim: true,
    },

    // Controls sort position in the slider (ascending).
    order: {
      type: Number,
      default: 0,
    },

    // Only isActive clients are returned by the public endpoint.
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const Client = mongoose.model("Client", clientSchema);

export default Client;