// server/controllers/blogCategoryController.js
import {
  createCategoryRecord,
  deleteCategoryRecord,
  findCategoryById,
  listCategories,
  updateCategoryRecord,
} from "../models/BlogCategory.js";

const cleanName = (value) =>
  typeof value === "string" ? value.trim().replace(/\s+/g, " ") : "";

const validateName = (name) => {
  if (!name) return "Category name is required.";
  if (name.length > 80) return "Category name must be 80 characters or less.";
  return null;
};

// GET /api/blog-categories  (public — blog detail sidebar + admin list)
export const getCategories = async (req, res) => {
  try {
    const categories = await listCategories();
    return res
      .status(200)
      .json({ success: true, count: categories.length, categories });
  } catch (error) {
    console.error("Get categories error:", error);
    return res
      .status(500)
      .json({ success: false, message: "Unable to fetch categories." });
  }
};

// GET /api/blog-categories/:id  (admin — used by the Edit page)
export const getCategory = async (req, res) => {
  try {
    const category = await findCategoryById(req.params.id);
    if (!category) {
      return res
        .status(404)
        .json({ success: false, message: "Category not found." });
    }
    return res.status(200).json({ success: true, category });
  } catch (error) {
    console.error("Get category error:", error);
    return res
      .status(500)
      .json({ success: false, message: "Unable to fetch category." });
  }
};

// POST /api/blog-categories  (admin)
export const createCategory = async (req, res) => {
  try {
    const name = cleanName(req.body?.name);
    const problem = validateName(name);
    if (problem) {
      return res.status(400).json({ success: false, message: problem });
    }

    const category = await createCategoryRecord(name);
    return res.status(201).json({
      success: true,
      message: "Category created successfully.",
      category,
    });
  } catch (error) {
    if (error.code === "23505") {
      return res.status(409).json({
        success: false,
        message: "A category with this name already exists.",
      });
    }
    console.error("Create category error:", error);
    return res
      .status(500)
      .json({ success: false, message: "Unable to create category." });
  }
};

// PUT /api/blog-categories/:id  (admin)
export const updateCategory = async (req, res) => {
  try {
    const name = cleanName(req.body?.name);
    const problem = validateName(name);
    if (problem) {
      return res.status(400).json({ success: false, message: problem });
    }

    const category = await updateCategoryRecord(req.params.id, name);
    if (!category) {
      return res
        .status(404)
        .json({ success: false, message: "Category not found." });
    }

    return res.status(200).json({
      success: true,
      message: "Category updated successfully.",
      category,
    });
  } catch (error) {
    if (error.code === "23505") {
      return res.status(409).json({
        success: false,
        message: "A category with this name already exists.",
      });
    }
    console.error("Update category error:", error);
    return res
      .status(500)
      .json({ success: false, message: "Unable to update category." });
  }
};

// DELETE /api/blog-categories/:id  (admin)
// Blogs are NOT deleted — they just lose this category.
export const deleteCategory = async (req, res) => {
  try {
    const deleted = await deleteCategoryRecord(req.params.id);
    if (!deleted) {
      return res
        .status(404)
        .json({ success: false, message: "Category not found." });
    }
    return res
      .status(200)
      .json({ success: true, message: "Category deleted successfully." });
  } catch (error) {
    console.error("Delete category error:", error);
    return res
      .status(500)
      .json({ success: false, message: "Unable to delete category." });
  }
};