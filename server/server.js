import "dotenv/config";

import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";

import connectDB from "./config/db.js";
import adminAuthRoutes from "./routes/adminAuthRoutes.js";
import blogCategoryRoutes from "./routes/blogCategoryRoutes.js";
import blogRoutes from "./routes/blogRoutes.js";
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

app.use(express.json({ limit: "2mb" }));
app.use(cookieParser());

app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "AllGeo API is running.",
  });
});

app.use("/api/admin/auth", adminAuthRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/blog-categories", blogCategoryRoutes);
app.use("/api/clients", clientRoutes);
app.use("/api/enquiries", enquiryRoutes);
app.use("/api/services", serviceRoutes);

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

  app.listen(PORT, () => {
    console.log(`AllGeo app running on port ${PORT}`);
  });
};

startServer();