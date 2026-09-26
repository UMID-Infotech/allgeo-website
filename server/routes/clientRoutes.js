// server/routes/clientRoutes.js
import express from "express";

import {
  createClient,
  getAllClients,
  getAllClientsForAdmin,
  getClientImageKitAuth,
} from "../controllers/clientController.js";

import protectAdmin from "../middleware/adminAuthMiddleware.js";

const router = express.Router();

// Public — used by ClientsSection.jsx on the website.
router.get("/", getAllClients);

// Admin only — used by the admin dashboard to view all clients
// (including inactive ones) before we add edit/delete later.
router.get("/admin", protectAdmin, getAllClientsForAdmin);

// Admin only — used by the admin dashboard "Add Client" form to get
// short-lived credentials for uploading the logo directly to ImageKit.
router.get("/imagekit-auth", protectAdmin, getClientImageKitAuth);

// Admin only — used by the admin dashboard "Add Client" form.
router.post("/", protectAdmin, createClient);

export default router;