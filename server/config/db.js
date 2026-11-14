import pg from "pg";

const required = ["PGHOST", "PGPORT", "PGDATABASE", "PGUSER", "PGPASSWORD"];
const missing = required.filter((key) => !process.env[key]);
if (missing.length) {
  throw new Error(`Missing PostgreSQL environment settings: ${missing.join(", ")}`);
}

export const pool = new pg.Pool({
  host: process.env.PGHOST,
  port: Number(process.env.PGPORT),
  database: process.env.PGDATABASE,
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  max: 10,
  connectionTimeoutMillis: 10000,
});

pool.on("error", (error) => console.error("Idle PostgreSQL connection error:", error));

export default async function connectDB() {
  try {
    const result = await pool.query("SELECT current_database() AS name");
    console.log(`PostgreSQL connected: ${result.rows[0].name}`);
  } catch (error) {
    console.error("PostgreSQL connection failed:", error.message);
    process.exit(1);
  }
}
