// server/controllers/projectController.js
import {
  createProjectRecord,
  deleteProjectRecord,
  findPublishedProjectBySlug,
  listAllProjects,
  listPublishedProjects,
} from "../models/Project.js";
import { htmlToText, sanitizeBlogHtml } from "../utils/sanitizeBlogHtml.js";

// GET /api/projects?limit=<n>   (public)
export const getProjects = async (req, res) => {
  try {
    const limit = Number.parseInt(req.query.limit, 10);
    const projects = await listPublishedProjects({
      limit: Number.isInteger(limit) ? limit : undefined,
    });

    return res
      .status(200)
      .json({ success: true, count: projects.length, projects });
  } catch (error) {
    console.error("Get projects error:", error);
    return res
      .status(500)
      .json({ success: false, message: "Unable to fetch projects." });
  }
};

// GET /api/projects/admin   (admin — includes drafts)
export const getProjectsForAdmin = async (req, res) => {
  try {
    const projects = await listAllProjects();
    return res
      .status(200)
      .json({ success: true, count: projects.length, projects });
  } catch (error) {
    console.error("Get projects (admin) error:", error);
    return res
      .status(500)
      .json({ success: false, message: "Unable to fetch projects." });
  }
};

// GET /api/projects/:slug   (public)
export const getProjectBySlug = async (req, res) => {
  try {
    const project = await findPublishedProjectBySlug(req.params.slug);
    if (!project) {
      return res
        .status(404)
        .json({ success: false, message: "Project not found." });
    }
    return res.status(200).json({ success: true, project });
  } catch (error) {
    console.error("Get project error:", error);
    return res
      .status(500)
      .json({ success: false, message: "Unable to fetch project." });
  }
};

// POST /api/projects   (admin)
// body: { title, excerpt?, content, coverImage, isPublished? }
export const createProject = async (req, res) => {
  try {
    const { title, excerpt, content, coverImage, isPublished } = req.body ?? {};

    if (typeof title !== "string" || !title.trim()) {
      return res
        .status(400)
        .json({ success: false, message: "Project title is required." });
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
        .json({ success: false, message: "Project content is required." });
    }

    // Use the supplied summary, otherwise build one from the content.
    const manualExcerpt = typeof excerpt === "string" ? excerpt.trim() : "";
    const finalExcerpt = (
      manualExcerpt || htmlToText(cleanContent).slice(0, 180)
    ).slice(0, 300);

    const project = await createProjectRecord({
      title: title.trim().slice(0, 200),
      excerpt: finalExcerpt,
      content: cleanContent,
      coverImage: coverImage.trim(),
      isPublished: typeof isPublished === "boolean" ? isPublished : true,
    });

    return res.status(201).json({
      success: true,
      message: "Project created successfully.",
      project,
    });
  } catch (error) {
    console.error("Create project error:", error);
    return res
      .status(500)
      .json({ success: false, message: "Unable to create project." });
  }
};

// DELETE /api/projects/:id   (admin)
export const deleteProject = async (req, res) => {
  try {
    const deleted = await deleteProjectRecord(req.params.id);
    if (!deleted) {
      return res
        .status(404)
        .json({ success: false, message: "Project not found." });
    }
    return res
      .status(200)
      .json({ success: true, message: "Project deleted successfully." });
  } catch (error) {
    console.error("Delete project error:", error);
    return res
      .status(500)
      .json({ success: false, message: "Unable to delete project." });
  }
};