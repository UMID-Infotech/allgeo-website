// server/routes/projectRoutes.js
import express from "express";

import {
  createProject,
  deleteProject,
  getProjectBySlug,
  getProjects,
  getProjectsForAdmin,
} from "../controllers/projectController.js";
import protectAdmin from "../middleware/adminAuthMiddleware.js";

const router = express.Router();

// Public
router.get("/", getProjects);

// Admin (this MUST stay above "/:slug" so "admin" is not read as a slug)
router.get("/admin", protectAdmin, getProjectsForAdmin);
router.post("/", protectAdmin, createProject);
router.delete("/:id", protectAdmin, deleteProject);

// Public
router.get("/:slug", getProjectBySlug);

export default router;