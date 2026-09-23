import "dotenv/config";

import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";

import connectDB from "./config/db.js";
import adminAuthRoutes from "./routes/adminAuthRoutes.js";
import enquiryRoutes from "./routes/enquiryRoutes.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "AllGeo API is running.",
  });
});

app.use("/api/admin/auth", adminAuthRoutes);
app.use("/api/enquiries", enquiryRoutes);

const startServer = async () => {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`AllGeo API running on port ${PORT}`);
  });
};

startServer();

// import "dotenv/config";
// import "dotenv/config";
// import cors from "cors";
// import express from "express";

// import connectDB from "./config/db.js";
// import enquiryRoutes from "./routes/enquiryRoutes.js";

// const app = express();
// const PORT = process.env.PORT || 5000;

// app.use(cors());
// app.use(express.json());

// app.get("/api/health", (req, res) => {
//   res.status(200).json({
//     success: true,
//     message: "AllGeo API is running.",
//   });
// });

// app.use("/api/enquiries", enquiryRoutes);

// const startServer = async () => {
//   await connectDB();

//   app.listen(PORT, () => {
//     console.log(`AllGeo API running on port ${PORT}`);
//   });
// };

// startServer();
