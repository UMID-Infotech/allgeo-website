// server/models/Project.js
import { randomUUID } from "node:crypto";
import { pool } from "../config/db.js";
import { slugify } from "../utils/slugify.js";

const listColumns = `id AS "_id", title, slug, excerpt,
  cover_image AS "coverImage", is_published AS "isPublished",
  created_at AS "createdAt", updated_at AS "updatedAt"`;

const detailColumns = `${listColumns}, content`;

// Makes sure the slug is unique (adds -2, -3 ... when needed).
async function uniqueSlug(title) {
  const base = slugify(title) || "project";
  let candidate = base;
  let counter = 2;

  while (true) {
    const existing = await pool.query("SELECT 1 FROM projects WHERE slug = $1", [
      candidate,
    ]);
    if (!existing.rowCount) return candidate;
    candidate = `${base}-${counter++}`;
  }
}

// Public list: published projects only, newest first.
export async function listPublishedProjects({ limit } = {}) {
  const params = [];
  let limitSql = "";

  if (Number.isInteger(limit) && limit > 0) {
    params.push(limit);
    limitSql = `LIMIT $${params.length}`;
  }

  const result = await pool.query(
    `SELECT ${listColumns} FROM projects
     WHERE is_published = TRUE
     ORDER BY created_at DESC ${limitSql}`,
    params,
  );
  return result.rows;
}

// Admin list: every project (published + draft).
export async function listAllProjects() {
  const result = await pool.query(
    `SELECT ${listColumns} FROM projects ORDER BY created_at DESC`,
  );
  return result.rows;
}

export async function findPublishedProjectBySlug(slug) {
  const result = await pool.query(
    `SELECT ${detailColumns} FROM projects
     WHERE slug = $1 AND is_published = TRUE LIMIT 1`,
    [slug],
  );
  return result.rows[0] ?? null;
}

export async function createProjectRecord({
  title,
  excerpt,
  content,
  coverImage,
  isPublished,
}) {
  const id = randomUUID();
  const slug = await uniqueSlug(title);

  const result = await pool.query(
    `INSERT INTO projects (id, title, slug, excerpt, content, cover_image, is_published)
     VALUES ($1, $2, $3, $4, $5, $6, $7)
     RETURNING ${detailColumns}`,
    [id, title, slug, excerpt, content, coverImage, isPublished],
  );
  return result.rows[0];
}

export async function deleteProjectRecord(id) {
  const result = await pool.query("DELETE FROM projects WHERE id = $1", [id]);
  return result.rowCount > 0;
}