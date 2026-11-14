import express from "express";

import { listEnquiries, submitEnquiry } from "../controllers/enquiryController.js";
import protectAdmin from "../middleware/adminAuthMiddleware.js";

const router = express.Router();

router.post("/", submitEnquiry);
router.get("/", protectAdmin, listEnquiries);

export default router;
