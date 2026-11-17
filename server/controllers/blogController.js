// server/controllers/blogController.js
import { getImageKitAuthParams } from "../config/imagekit.js";
import {
  createBlogRecord,
  deleteBlogRecord,
  filterExistingCategoryIds,
  findBlogById,
  findPublishedBlogBySlug,
  listAllBlogs,
  listPublishedBlogs,
} from "../models/Blog.js";
import { htmlToText, sanitizeBlogHtml } from "../utils/sanitizeBlogHtml.js";

// GET /api/blogs?category=<slug>&limit=<n>   (public)
export const getBlogs = async (req, res) => {
  try {
    const categorySlug =
      typeof req.query.category === "string" ? req.query.category : undefined;
    const limit = Number.parseInt(req.query.limit, 10);

    const blogs = await listPublishedBlogs({
      categorySlug,
      limit: Number.isInteger(limit) ? limit : undefined,
    });

    return res.status(200).json({ success: true, count: blogs.length, blogs });
  } catch (error) {
    console.error("Get blogs error:", error);
    return res
      .status(500)
      .json({ success: false, message: "Unable to fetch blogs." });
  }
};

// GET /api/blogs/admin   (admin — includes drafts)
export const getBlogsForAdmin = async (req, res) => {
  try {
    const blogs = await listAllBlogs();
    return res.status(200).json({ success: true, count: blogs.length, blogs });
  } catch (error) {
    console.error("Get blogs (admin) error:", error);
    return res
      .status(500)
      .json({ success: false, message: "Unable to fetch blogs." });
  }
};

// GET /api/blogs/imagekit-auth   (admin)
// Upload credentials for the featured image AND for images inserted
// inside the CKEditor content.
export const getBlogImageKitAuth = async (req, res) => {
  try {
    return res
      .status(200)
      .json({ success: true, ...getImageKitAuthParams() });
  } catch (error) {
    console.error("Get ImageKit auth params error:", error);
    return res
      .status(500)
      .json({ success: false, message: "Unable to generate upload credentials." });
  }
};

// GET /api/blogs/:slug   (public)
export const getBlogBySlug = async (req, res) => {
  try {
    const blog = await findPublishedBlogBySlug(req.params.slug);
    if (!blog) {
      return res
        .status(404)
        .json({ success: false, message: "Blog not found." });
    }
    return res.status(200).json({ success: true, blog });
  } catch (error) {
    console.error("Get blog error:", error);
    return res
      .status(500)
      .json({ success: false, message: "Unable to fetch blog." });
  }
};

// POST /api/blogs   (admin)
// body: { title, excerpt?, content, coverImage, categoryIds: string[], isPublished? }
export const createBlog = async (req, res) => {
  try {
    const { title, excerpt, content, coverImage, categoryIds, isPublished } =
      req.body ?? {};

    if (typeof title !== "string" || !title.trim()) {
      return res
        .status(400)
        .json({ success: false, message: "Blog title is required." });
    }

    if (typeof coverImage !== "string" || !coverImage.trim()) {
      return res
        .status(400)
        .json({ success: false, message: "Featured image is required." });
    }

    const cleanContent = sanitizeBlogHtml(content);
    if (!htmlToText(cleanContent) && !/<img\b/i.test(cleanContent)) {
      return res
        .status(400)
        .json({ success: false, message: "Blog content is required." });
    }

    const requestedIds = Array.isArray(categoryIds)
      ? [...new Set(categoryIds.filter((id) => typeof id === "string"))]
      : [];
    const validCategoryIds = await filterExistingCategoryIds(requestedIds);

    // Use the supplied excerpt, otherwise build one from the content.
    const manualExcerpt = typeof excerpt === "string" ? excerpt.trim() : "";
    const finalExcerpt = (
      manualExcerpt || htmlToText(cleanContent).slice(0, 180)
    ).slice(0, 300);

    const id = await createBlogRecord({
      title: title.trim().slice(0, 200),
      excerpt: finalExcerpt,
      content: cleanContent,
      coverImage: coverImage.trim(),
      isPublished: typeof isPublished === "boolean" ? isPublished : true,
      categoryIds: validCategoryIds,
    });

    const blog = await findBlogById(id);

    return res
      .status(201)
      .json({ success: true, message: "Blog created successfully.", blog });
  } catch (error) {
    console.error("Create blog error:", error);
    return res
      .status(500)
      .json({ success: false, message: "Unable to create blog." });
  }
};

// DELETE /api/blogs/:id   (admin)
export const deleteBlog = async (req, res) => {
  try {
    const deleted = await deleteBlogRecord(req.params.id);
    if (!deleted) {
      return res
        .status(404)
        .json({ success: false, message: "Blog not found." });
    }
    return res
      .status(200)
      .json({ success: true, message: "Blog deleted successfully." });
  } catch (error) {
    console.error("Delete blog error:", error);
    return res
      .status(500)
      .json({ success: false, message: "Unable to delete blog." });
  }
};