// server/routes/blogCategoryRoutes.js
import express from "express";

import {
  createCategory,
  deleteCategory,
  getCategories,
  getCategory,
  updateCategory,
} from "../controllers/blogCategoryController.js";
import protectAdmin from "../middleware/adminAuthMiddleware.js";

const router = express.Router();

// Public (blog sidebar)
router.get("/", getCategories);

// Admin
router.get("/:id", protectAdmin, getCategory);
router.post("/", protectAdmin, createCategory);
router.put("/:id", protectAdmin, updateCategory);
router.delete("/:id", protectAdmin, deleteCategory);

export default router;