import { pool } from "../config/db.js";

export const faqColumns = `
  id AS "_id", service_id AS service, service_slug AS "serviceSlug",
  faq_id AS "faqId", title, description, images, order_index AS "order",
  created_at AS "createdAt", updated_at AS "updatedAt"`;

export async function listServiceFaqs(serviceId) {
  const result = await pool.query(
    `SELECT ${faqColumns} FROM service_faqs WHERE service_id=$1 ORDER BY order_index, created_at`,
    [serviceId],
  );
  return result.rows;
}

export async function findServiceFaq(serviceId, faqId) {
  const result = await pool.query(
    `SELECT ${faqColumns} FROM service_faqs WHERE service_id=$1 AND faq_id=$2 LIMIT 1`,
    [serviceId, faqId],
  );
  return result.rows[0] ?? null;
}

export async function countServiceFaqs(serviceId) {
  const result = await pool.query("SELECT count(*)::int AS total FROM service_faqs WHERE service_id=$1", [serviceId]);
  return result.rows[0].total;
}

export async function createServiceFaqRecord(data) {
  const result = await pool.query(
    `INSERT INTO service_faqs
     (id, service_id, service_slug, faq_id, title, description, images, order_index)
     VALUES ($1,$2,$3,$4,$5,$6,$7::jsonb,$8) RETURNING ${faqColumns}`,
    [data._id, data.service, data.serviceSlug, data.faqId, data.title,
      data.description, JSON.stringify(data.images), data.order],
  );
  return result.rows[0];
}

export async function updateServiceFaqRecord(id, data) {
  const result = await pool.query(
    `UPDATE service_faqs SET title=$2, description=$3, images=$4::jsonb,
     order_index=$5, updated_at=NOW() WHERE id=$1 RETURNING ${faqColumns}`,
    [id, data.title, data.description, JSON.stringify(data.images), data.order],
  );
  return result.rows[0] ?? null;
}

export async function deleteServiceFaqRecord(id) {
  await pool.query("DELETE FROM service_faqs WHERE id=$1", [id]);
}
