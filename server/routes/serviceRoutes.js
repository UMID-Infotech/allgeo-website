// server/routes/serviceRoutes.js
import express from "express";

import {
  addServiceFaq,
  createService,
  deleteService,
  deleteServiceFaq,
  getAllServices,
  getServiceBySlug,
  updateService,
  updateServiceFaq,
} from "../controllers/serviceController.js";

import protectAdmin from "../middleware/adminAuthMiddleware.js";

const router = express.Router();

// Public
router.get("/", getAllServices);
router.get("/:slug", getServiceBySlug);

// Admin only (adds / edits / deletes from the admin dashboard)
router.post("/", protectAdmin, createService);
router.put("/:slug", protectAdmin, updateService);
router.delete("/:slug", protectAdmin, deleteService);

router.post("/:slug/faqs", protectAdmin, addServiceFaq);
router.put("/:slug/faqs/:faqId", protectAdmin, updateServiceFaq);
router.delete("/:slug/faqs/:faqId", protectAdmin, deleteServiceFaq);

export default router;