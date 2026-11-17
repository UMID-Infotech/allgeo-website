// src/services/blogService.js
import api from "./api";

/* ---------------------------- Blogs ---------------------------- */

// GET /api/blogs?category=<slug>&limit=<n>   (public)
export async function getBlogs({ category, limit } = {}) {
  const params = {};
  if (category) params.category = category;
  if (limit) params.limit = limit;

  const { data } = await api.get("/api/blogs", { params });
  return data.blogs;
}

// GET /api/blogs/admin   (admin — includes drafts)
export async function getBlogsForAdmin() {
  const { data } = await api.get("/api/blogs/admin");
  return data.blogs;
}

// GET /api/blogs/:slug   (public)
export async function getBlogBySlug(slug) {
  const { data } = await api.get(`/api/blogs/${encodeURIComponent(slug)}`);
  return data.blog;
}

// GET /api/blogs/imagekit-auth   (admin)
export async function getBlogImageKitAuth() {
  const { data } = await api.get("/api/blogs/imagekit-auth");
  return data;
}

// POST /api/blogs   (admin)
// payload: { title, excerpt?, content, coverImage, categoryIds, isPublished }
export async function createBlog(payload) {
  const { data } = await api.post("/api/blogs", payload);
  return data.blog;
}

// DELETE /api/blogs/:id   (admin)
export async function deleteBlog(id) {
  const { data } = await api.delete(`/api/blogs/${id}`);
  return data;
}

/* -------------------------- Categories -------------------------- */

// GET /api/blog-categories   (public)
export async function getBlogCategories() {
  const { data } = await api.get("/api/blog-categories");
  return data.categories;
}

// GET /api/blog-categories/:id   (admin)
export async function getBlogCategory(id) {
  const { data } = await api.get(`/api/blog-categories/${id}`);
  return data.category;
}

// POST /api/blog-categories   (admin)
export async function createBlogCategory(name) {
  const { data } = await api.post("/api/blog-categories", { name });
  return data.category;
}

// PUT /api/blog-categories/:id   (admin)
export async function updateBlogCategory(id, name) {
  const { data } = await api.put(`/api/blog-categories/${id}`, { name });
  return data.category;
}

// DELETE /api/blog-categories/:id   (admin)
export async function deleteBlogCategory(id) {
  const { data } = await api.delete(`/api/blog-categories/${id}`);
  return data;
}