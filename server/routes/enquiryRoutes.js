// server/routes/enquiryRoutes.js

import express from "express";

import {
  getAllEnquiries,
  submitEnquiry,
  updateEnquiryFollowUp,
} from "../controllers/enquiryController.js";
import protectAdmin from "../middleware/adminAuthMiddleware.js";

const router = express.Router();

// Public — website enquiry form.
router.post("/", submitEnquiry);

// Admin only — /admin/enquiries list.
router.get("/", protectAdmin, getAllEnquiries);

// Admin only — save follow-up type, connected status and remarks.
router.put("/:id/follow-up", protectAdmin, updateEnquiryFollowUp);

export default router;