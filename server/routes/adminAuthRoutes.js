import express from "express";

import {
  getAdminProfile,
  loginAdmin,
  logoutAdmin,
} from "../controllers/adminAuthController.js";

import protectAdmin from "../middleware/adminAuthMiddleware.js";

const router = express.Router();

router.post("/login", loginAdmin);

router.get("/me", protectAdmin, getAdminProfile);

router.post("/logout", protectAdmin, logoutAdmin);

export default router;