// server/models/BlogCategory.js
import { randomUUID } from "node:crypto";
import { pool } from "../config/db.js";
import { slugify } from "../utils/slugify.js";

const columns = `c.id AS "_id", c.name, c.slug,
  c.created_at AS "createdAt", c.updated_at AS "updatedAt"`;

// Lists every category together with the number of PUBLISHED blogs in it.
export async function listCategories() {
  const result = await pool.query(
    `SELECT ${columns},
       COUNT(b.id) FILTER (WHERE b.is_published = TRUE)::int AS "blogCount"
     FROM blog_categories c
     LEFT JOIN blog_category_map m ON m.category_id = c.id
     LEFT JOIN blogs b ON b.id = m.blog_id
     GROUP BY c.id
     ORDER BY c.name ASC`,
  );
  return result.rows;
}

export async function findCategoryById(id) {
  const result = await pool.query(
    `SELECT ${columns} FROM blog_categories c WHERE c.id = $1 LIMIT 1`,
    [id],
  );
  return result.rows[0] ?? null;
}

// Makes sure the slug is unique (adds -2, -3 ... when needed).
async function uniqueSlug(name, excludeId = null) {
  const base = slugify(name) || "category";
  let candidate = base;
  let counter = 2;

  while (true) {
    const existing = await pool.query(
      "SELECT id FROM blog_categories WHERE slug = $1 AND id <> COALESCE($2, '')",
      [candidate, excludeId],
    );
    if (!existing.rowCount) return candidate;
    candidate = `${base}-${counter++}`;
  }
}

export async function createCategoryRecord(name) {
  const slug = await uniqueSlug(name);
  const result = await pool.query(
    `INSERT INTO blog_categories (id, name, slug) VALUES ($1, $2, $3)
     RETURNING id AS "_id", name, slug,
       created_at AS "createdAt", updated_at AS "updatedAt"`,
    [randomUUID(), name, slug],
  );
  return { ...result.rows[0], blogCount: 0 };
}

export async function updateCategoryRecord(id, name) {
  const slug = await uniqueSlug(name, id);
  const result = await pool.query(
    `UPDATE blog_categories SET name = $2, slug = $3, updated_at = NOW()
     WHERE id = $1
     RETURNING id AS "_id", name, slug,
       created_at AS "createdAt", updated_at AS "updatedAt"`,
    [id, name, slug],
  );
  return result.rows[0] ?? null;
}

export async function deleteCategoryRecord(id) {
  const result = await pool.query("DELETE FROM blog_categories WHERE id = $1", [
    id,
  ]);
  return result.rowCount > 0;
}