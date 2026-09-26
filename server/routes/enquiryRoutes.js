import express from "express";

<<<<<<< HEAD
import { listEnquiries, submitEnquiry } from "../controllers/enquiryController.js";
=======
import {
  getAllEnquiries,
  submitEnquiry,
  updateEnquiryFollowUp,
} from "../controllers/enquiryController.js";

>>>>>>> 6fb0d21 (enquiry form is connected to admin dashboard, email is integrated, clients page's json data removed, created the modle for client and imported in database and in admin dashboard admin can add these clients, and the image stores in imagekit)
import protectAdmin from "../middleware/adminAuthMiddleware.js";

const router = express.Router();

// Public — used by the CTASection enquiry form on the website.
router.post("/", submitEnquiry);
router.get("/", protectAdmin, listEnquiries);

// Admin only — used by the /admin/enquiries dashboard page.
router.get("/", protectAdmin, getAllEnquiries);

// Admin only — update follow-up type / connected status / remarks.
router.put("/:id/follow-up", protectAdmin, updateEnquiryFollowUp);

export default router;