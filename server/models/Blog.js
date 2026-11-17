// server/models/Blog.js
import { randomUUID } from "node:crypto";
import { pool } from "../config/db.js";
import { slugify } from "../utils/slugify.js";

// Aggregates the categories of each blog into a JSON array.
const categoriesSubquery = `
  COALESCE((
    SELECT json_agg(json_build_object('_id', c.id, 'name', c.name, 'slug', c.slug)
                    ORDER BY c.name)
    FROM blog_category_map m
    JOIN blog_categories c ON c.id = m.category_id
    WHERE m.blog_id = b.id
  ), '[]'::json) AS categories`;

const listColumns = `b.id AS "_id", b.title, b.slug, b.excerpt,
  b.cover_image AS "coverImage", b.is_published AS "isPublished",
  b.created_at AS "createdAt", b.updated_at AS "updatedAt",
  ${categoriesSubquery}`;

const detailColumns = `${listColumns}, b.content`;

async function uniqueSlug(title) {
  const base = slugify(title) || "blog";
  let candidate = base;
  let counter = 2;

  while (true) {
    const existing = await pool.query("SELECT 1 FROM blogs WHERE slug = $1", [
      candidate,
    ]);
    if (!existing.rowCount) return candidate;
    candidate = `${base}-${counter++}`;
  }
}

// Public list: published blogs only, optionally filtered by category slug.
export async function listPublishedBlogs({ categorySlug, limit } = {}) {
  const params = [];
  const where = ["b.is_published = TRUE"];

  if (categorySlug) {
    params.push(categorySlug);
    where.push(`EXISTS (
      SELECT 1 FROM blog_category_map m
      JOIN blog_categories c ON c.id = m.category_id
      WHERE m.blog_id = b.id AND c.slug = $${params.length}
    )`);
  }

  let limitSql = "";
  if (Number.isInteger(limit) && limit > 0) {
    params.push(limit);
    limitSql = `LIMIT $${params.length}`;
  }

  const result = await pool.query(
    `SELECT ${listColumns} FROM blogs b
     WHERE ${where.join(" AND ")}
     ORDER BY b.created_at DESC ${limitSql}`,
    params,
  );
  return result.rows;
}

// Admin list: every blog (published + draft).
export async function listAllBlogs() {
  const result = await pool.query(
    `SELECT ${listColumns} FROM blogs b ORDER BY b.created_at DESC`,
  );
  return result.rows;
}

export async function findPublishedBlogBySlug(slug) {
  const result = await pool.query(
    `SELECT ${detailColumns} FROM blogs b
     WHERE b.slug = $1 AND b.is_published = TRUE LIMIT 1`,
    [slug],
  );
  return result.rows[0] ?? null;
}

export async function findBlogById(id) {
  const result = await pool.query(
    `SELECT ${detailColumns} FROM blogs b WHERE b.id = $1 LIMIT 1`,
    [id],
  );
  return result.rows[0] ?? null;
}

export async function createBlogRecord({
  title,
  excerpt,
  content,
  coverImage,
  isPublished,
  categoryIds,
}) {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    const id = randomUUID();
    const slug = await uniqueSlug(title);

    await client.query(
      `INSERT INTO blogs (id, title, slug, excerpt, content, cover_image, is_published)
       VALUES ($1, $2, $3, $4, $5, $6, $7)`,
      [id, title, slug, excerpt, content, coverImage, isPublished],
    );

    if (categoryIds.length) {
      await client.query(
        `INSERT INTO blog_category_map (blog_id, category_id)
         SELECT $1, UNNEST($2::text[]) ON CONFLICT DO NOTHING`,
        [id, categoryIds],
      );
    }

    await client.query("COMMIT");
    return id;
  } catch (error) {
    await client.query("ROLLBACK").catch(() => {});
    throw error;
  } finally {
    client.release();
  }
}

export async function deleteBlogRecord(id) {
  const result = await pool.query("DELETE FROM blogs WHERE id = $1", [id]);
  return result.rowCount > 0;
}

// Returns only the ids that really exist (guards against bad category ids).
export async function filterExistingCategoryIds(ids) {
  if (!ids.length) return [];
  const result = await pool.query(
    "SELECT id FROM blog_categories WHERE id = ANY($1::text[])",
    [ids],
  );
  return result.rows.map((row) => row.id);
}