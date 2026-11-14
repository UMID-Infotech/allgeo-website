import { pool } from "../config/db.js";

const columns = `id AS "_id", name, email, password_hash AS password,
                 role, is_active AS "isActive", last_login AS "lastLogin"`;

export async function findAdminByEmail(email) {
  const result = await pool.query(
    `SELECT ${columns} FROM admins WHERE email = $1 LIMIT 1`,
    [email],
  );
  return result.rows[0] ?? null;
}

export async function findAdminById(id) {
  const result = await pool.query(
    `SELECT ${columns} FROM admins WHERE id = $1 LIMIT 1`,
    [id],
  );
  return result.rows[0] ?? null;
}

export async function updateAdminLastLogin(id) {
  await pool.query(
    "UPDATE admins SET last_login = NOW(), updated_at = NOW() WHERE id = $1",
    [id],
  );
}
