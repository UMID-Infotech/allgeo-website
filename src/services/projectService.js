// src/services/projectService.js
import api from "./api";

// GET /api/projects?limit=<n>   (public)
export async function getProjects({ limit } = {}) {
  const params = {};
  if (limit) params.limit = limit;

  const { data } = await api.get("/api/projects", { params });
  return data.projects;
}

// GET /api/projects/admin   (admin — includes drafts)
export async function getProjectsForAdmin() {
  const { data } = await api.get("/api/projects/admin");
  return data.projects;
}

// GET /api/projects/:slug   (public)
export async function getProjectBySlug(slug) {
  const { data } = await api.get(`/api/projects/${encodeURIComponent(slug)}`);
  return data.project;
}

// POST /api/projects   (admin)
// payload: { title, excerpt?, content, coverImage, isPublished }
export async function createProject(payload) {
  const { data } = await api.post("/api/projects", payload);
  return data.project;
}

// DELETE /api/projects/:id   (admin)
export async function deleteProject(id) {
  const { data } = await api.delete(`/api/projects/${id}`);
  return data;
}