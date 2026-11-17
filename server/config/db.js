import pg from "pg";

// Connection settings can be given either as one connection string
// (DATABASE_URL, e.g. Supabase / Neon / Render) or as separate PG* variables.
export function getPgConfig() {
  const url = process.env.DATABASE_URL;

  if (url) {
    return {
      connectionString: url,
      // Hosted databases (Supabase etc.) require SSL. Set PGSSL=false to turn it off.
      ssl: process.env.PGSSL === "false" ? false : { rejectUnauthorized: false },
      connectionTimeoutMillis: 10000,
    };
  }

  const required = ["PGHOST", "PGPORT", "PGDATABASE", "PGUSER", "PGPASSWORD"];
  const missing = required.filter((key) => !process.env[key]);
  if (missing.length) {
    throw new Error(
      `Missing PostgreSQL settings. Set DATABASE_URL, or all of: ${missing.join(", ")}`,
    );
  }

  const isLocal = ["localhost", "127.0.0.1"].includes(process.env.PGHOST);
  const useSsl = process.env.PGSSL ? process.env.PGSSL === "true" : !isLocal;

  return {
    host: process.env.PGHOST,
    port: Number(process.env.PGPORT),
    database: process.env.PGDATABASE,
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    ssl: useSsl ? { rejectUnauthorized: false } : false,
    connectionTimeoutMillis: 10000,
  };
}

export const pool = new pg.Pool({ ...getPgConfig(), max: 10 });

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