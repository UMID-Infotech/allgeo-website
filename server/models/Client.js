// server/models/Client.js
import { randomUUID } from "node:crypto";
import { pool } from "../config/db.js";

// Column aliases keep the API response shape identical to the old MongoDB
// version (_id, order, isActive, createdAt, updatedAt) so the React frontend
// does not need any changes.
const columns = `id AS "_id", name, logo, order_index AS "order",
  is_active AS "isActive", created_at AS "createdAt", updated_at AS "updatedAt"`;

export async function findActiveClients() {
  const result = await pool.query(
    `SELECT ${columns} FROM clients WHERE is_active = TRUE
     ORDER BY order_index ASC, created_at ASC`,
  );
  return result.rows;
}

export async function findAllClients() {
  const result = await pool.query(
    `SELECT ${columns} FROM clients ORDER BY order_index ASC, created_at ASC`,
  );
  return result.rows;
}

export async function getNextClientOrder() {
  const result = await pool.query(
    "SELECT COALESCE(MAX(order_index) + 1, 0) AS next FROM clients",
  );
  return Number(result.rows[0].next);
}

export async function createClientRecord({ name, logo, order, isActive }) {
  const result = await pool.query(
    `INSERT INTO clients (id, name, logo, order_index, is_active)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING ${columns}`,
    [randomUUID(), name, logo, order, isActive],
  );
  return result.rows[0];
}

// Used by the seed script: insert, or update logo/order if the name exists.
export async function upsertClientByName({ name, logo, order }) {
  const result = await pool.query(
    `INSERT INTO clients (id, name, logo, order_index, is_active)
     VALUES ($1, $2, $3, $4, TRUE)
     ON CONFLICT (name) DO UPDATE
       SET logo = EXCLUDED.logo,
           order_index = EXCLUDED.order_index,
           updated_at = NOW()
     RETURNING (xmax = 0) AS inserted`,
    [randomUUID(), name, logo, order],
  );
  return result.rows[0].inserted;
}