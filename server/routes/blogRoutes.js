// server/routes/blogRoutes.js
import express from "express";

import {
  createBlog,
  deleteBlog,
  getBlogBySlug,
  getBlogImageKitAuth,
  getBlogs,
  getBlogsForAdmin,
} from "../controllers/blogController.js";
import protectAdmin from "../middleware/adminAuthMiddleware.js";

const router = express.Router();

// Public
router.get("/", getBlogs);

// Admin (these MUST stay above "/:slug" so they are not read as a slug)
router.get("/admin", protectAdmin, getBlogsForAdmin);
router.get("/imagekit-auth", protectAdmin, getBlogImageKitAuth);
router.post("/", protectAdmin, createBlog);
router.delete("/:id", protectAdmin, deleteBlog);

// Public
router.get("/:slug", getBlogBySlug);

export default router;