import jwt from "jsonwebtoken";
import { findAdminById } from "../models/Admin.js";

const protectAdmin = async (req, res, next) => {
  try {
    const token = req.cookies.adminToken;
    if (!token) {
      return res.status(401).json({ success: false, message: "Authentication required." });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const admin = await findAdminById(decoded.adminId);
    if (!admin || !admin.isActive) {
      return res.status(401).json({ success: false, message: "Admin account not available." });
    }
    req.admin = admin;
    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: "Invalid or expired session." });
  }
};

export default protectAdmin;
