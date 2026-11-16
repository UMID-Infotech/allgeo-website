import "dotenv/config";

import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";

import connectDB from "./config/db.js";
import adminAuthRoutes from "./routes/adminAuthRoutes.js";
import clientRoutes from "./routes/clientRoutes.js";
import enquiryRoutes from "./routes/enquiryRoutes.js";
import serviceRoutes from "./routes/serviceRoutes.js";

const app = express();
const PORT = process.env.PORT || 5000;

const serverDir = path.dirname(fileURLToPath(import.meta.url));
const distPath = path.resolve(serverDir, "../dist");
const indexPath = path.join(distPath, "index.html");

if (process.env.NODE_ENV !== "production") {
  app.use(
    cors({
      origin: "http://localhost:5173",
      credentials: true,
    }),
  );
}

app.use(express.json());
app.use(cookieParser());

app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "AllGeo API is running.",
  });
});

app.use("/api/admin/auth", adminAuthRoutes);
app.use("/api/clients", clientRoutes);
app.use("/api/enquiries", enquiryRoutes);
app.use("/api/services", serviceRoutes);

// Unknown /api routes return a clear JSON 404 (helps spot missing routes).
app.use("/api", (req, res) => {
  res.status(404).json({
    success: false,
    message: `API route not found: ${req.method} ${req.originalUrl}`,
  });
});

if (existsSync(indexPath)) {
  app.use(express.static(distPath));

  app.use((req, res, next) => {
    if (req.method !== "GET" || req.path.startsWith("/api/")) {
      return next();
    }

    return res.sendFile(indexPath);
  });
}

const startServer = async () => {
  await connectDB();

  const server = app.listen(PORT, () => {
    console.log(`AllGeo app running on port ${PORT}`);
  });

  // If an old server process is still holding the port, say so clearly
  // instead of silently serving stale routes.
  server.on("error", (error) => {
    if (error.code === "EADDRINUSE") {
      console.error(
        `Port ${PORT} is already in use by another process. Stop the old server and start again.`,
      );
    } else {
      console.error("Server error:", error);
    }
    process.exit(1);
  });
};

startServer();