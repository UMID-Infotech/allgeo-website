import { pool } from "../config/db.js";

export const serviceColumns = `
  id AS "_id", slug, title, short_description AS "shortDescription",
  long_description AS "longDescription", image, order_index AS "order",
  is_active AS "isActive", created_at AS "createdAt", updated_at AS "updatedAt"`;

export async function listActiveServices() {
  const result = await pool.query(
    `SELECT ${serviceColumns} FROM services WHERE is_active = TRUE ORDER BY order_index, created_at`,
  );
  return result.rows;
}

export async function findServiceBySlug(slug, activeOnly = false) {
  const result = await pool.query(
    `SELECT ${serviceColumns} FROM services WHERE slug = $1 ${activeOnly ? "AND is_active = TRUE" : ""} LIMIT 1`,
    [slug],
  );
  return result.rows[0] ?? null;
}

export async function createServiceRecord(data) {
  const result = await pool.query(
    `INSERT INTO services (id, slug, title, short_description, long_description, image, order_index, is_active)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING ${serviceColumns}`,
    [data._id, data.slug, data.title, data.shortDescription, data.longDescription,
      data.image, data.order, data.isActive],
  );
  return result.rows[0];
}

export async function updateServiceRecord(id, data) {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    const result = await client.query(
      `UPDATE services SET slug=$2, title=$3, short_description=$4, long_description=$5,
       image=$6, order_index=$7, is_active=$8, updated_at=NOW()
       WHERE id=$1 RETURNING ${serviceColumns}`,
      [id, data.slug, data.title, data.shortDescription, data.longDescription,
        data.image, data.order, data.isActive],
    );
    if (result.rowCount) {
      await client.query("UPDATE service_faqs SET service_slug=$2, updated_at=NOW() WHERE service_id=$1 AND service_slug<>$2", [id, data.slug]);
    }
    await client.query("COMMIT");
    return result.rows[0] ?? null;
  } catch (error) {
    await client.query("ROLLBACK").catch(() => {});
    throw error;
  } finally {
    client.release();
  }
}

export async function deleteServiceRecord(id) {
  // service_faqs.service_id has ON DELETE CASCADE.
  await pool.query("DELETE FROM services WHERE id=$1", [id]);
}
