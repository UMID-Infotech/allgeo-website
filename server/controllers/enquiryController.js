<<<<<<< HEAD
import { randomUUID } from "node:crypto";
import { pool } from "../config/db.js";
import transporter from "../config/mailer.js";

const escapeHtml = (value) => value.replace(/[&<>"']/g, (char) => ({
  "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
})[char]);

=======
import Enquiry from "../models/Enquiry.js";
import transporter from "../config/mailer.js";

// POST /api/enquiries
// Public — used by the CTASection enquiry form on the website.
// Saves the enquiry in the database AND emails the admin (MAIL_TO).
>>>>>>> 6fb0d21 (enquiry form is connected to admin dashboard, email is integrated, clients page's json data removed, created the modle for client and imported in database and in admin dashboard admin can add these clients, and the image stores in imagekit)
export async function submitEnquiry(req, res) {
  const { name, email, contactNumber, message } = req.body ?? {};
  const fields = [name, email, contactNumber, message];
  if (fields.some((field) => typeof field !== "string" || !field.trim())) {
    return res.status(400).json({ success: false, message: "All fields are required." });
  }

  const enquiry = {
    id: randomUUID(),
    name: name.trim(),
    email: email.trim(),
    contactNumber: contactNumber.trim(),
    message: message.trim(),
  };
  if (enquiry.name.length > 150 || enquiry.email.length > 254 ||
      enquiry.contactNumber.length > 50 || enquiry.message.length > 10000 ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(enquiry.email)) {
    return res.status(400).json({ success: false, message: "Please check your enquiry details." });
  }

  try {
    await pool.query(
      `INSERT INTO enquiries (id, name, email, contact_number, message)
       VALUES ($1, $2, $3, $4, $5)`,
      [enquiry.id, enquiry.name, enquiry.email, enquiry.contactNumber, enquiry.message],
    );
  } catch (error) {
    console.error("Enquiry save error:", error);
    return res.status(500).json({ success: false, message: "Unable to save enquiry. Please try again." });
  }

<<<<<<< HEAD
  // Email is best effort. A mail failure cannot reject or lose a saved enquiry.
  if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS &&
      process.env.MAIL_FROM && process.env.MAIL_TO) {
=======
    // 1. Save the enquiry to the database first, so it shows up in the
    // admin dashboard even if the email fails to send for some reason.
    const enquiry = await Enquiry.create({
      name,
      email,
      contactNumber,
      message,
    });

    // 2. Email the admin (process.env.MAIL_TO is the admin's email address).
>>>>>>> 6fb0d21 (enquiry form is connected to admin dashboard, email is integrated, clients page's json data removed, created the modle for client and imported in database and in admin dashboard admin can add these clients, and the image stores in imagekit)
    const mailOptions = {
      from: `"AllGeo Website" <${process.env.MAIL_FROM}>`,
      to: process.env.MAIL_TO,
      replyTo: enquiry.email,
      subject: `${enquiry.name.replace(/[\r\n]/g, " ")} inquired for AllGeo Services`,
      text: `New enquiry received from AllGeo Solutions website.\n\nName: ${enquiry.name}\nEmail: ${enquiry.email}\nContact Number: ${enquiry.contactNumber}\n\nMessage:\n${enquiry.message}`,
      html: `<div style="font-family:Arial,sans-serif;line-height:1.6"><h2>New Website Enquiry</h2><p><strong>Name:</strong> ${escapeHtml(enquiry.name)}</p><p><strong>Email:</strong> ${escapeHtml(enquiry.email)}</p><p><strong>Contact Number:</strong> ${escapeHtml(enquiry.contactNumber)}</p><p><strong>Message:</strong></p><p>${escapeHtml(enquiry.message).replace(/\n/g, "<br>")}</p></div>`,
    };
<<<<<<< HEAD
    void transporter.sendMail(mailOptions).then(async () => {
      await pool.query("UPDATE enquiries SET email_status = 'sent' WHERE id = $1", [enquiry.id]);
    }).catch(async (error) => {
      console.error("Enquiry email error:", error);
      try {
        await pool.query("UPDATE enquiries SET email_status = 'failed' WHERE id = $1", [enquiry.id]);
      } catch (updateError) {
        console.error("Enquiry email status error:", updateError);
      }
=======

    try {
      await transporter.sendMail(mailOptions);
    } catch (mailError) {
      // Don't fail the request if the enquiry was saved but the email
      // couldn't be sent — just log it so the admin can still see it
      // in the dashboard.
      console.error("Enquiry email error:", mailError);
    }

    return res.status(200).json({
      success: true,
      message: "Enquiry submitted successfully.",
      enquiry,
>>>>>>> 6fb0d21 (enquiry form is connected to admin dashboard, email is integrated, clients page's json data removed, created the modle for client and imported in database and in admin dashboard admin can add these clients, and the image stores in imagekit)
    });
  } else {
    void pool.query("UPDATE enquiries SET email_status = 'failed' WHERE id = $1", [enquiry.id])
      .catch((error) => console.error("Enquiry email status error:", error));
  }

  return res.status(201).json({ success: true, message: "Thank you. Your enquiry has been received." });
}

export async function listEnquiries(req, res) {
  try {
    const page = Math.max(1, Number.parseInt(req.query.page, 10) || 1);
    if (!Number.isSafeInteger(page)) {
      return res.status(400).json({ success: false, message: "Invalid page number." });
    }
    const limit = 20;
    const [{ rows }, count] = await Promise.all([
      pool.query(
        `SELECT id, name, email, contact_number AS "contactNumber", message,
                email_status AS "emailStatus", created_at AS "createdAt"
         FROM enquiries ORDER BY created_at DESC, id DESC LIMIT $1 OFFSET $2`,
        [limit, (page - 1) * limit],
      ),
      pool.query("SELECT COUNT(*)::int AS total FROM enquiries"),
    ]);
    return res.json({ success: true, enquiries: rows, total: count.rows[0].total, page, limit });
  } catch (error) {
<<<<<<< HEAD
    console.error("Enquiry list error:", error);
    return res.status(500).json({ success: false, message: "Unable to load enquiries." });
=======
    console.error("Submit enquiry error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to submit enquiry. Please try again.",
    });
>>>>>>> 6fb0d21 (enquiry form is connected to admin dashboard, email is integrated, clients page's json data removed, created the modle for client and imported in database and in admin dashboard admin can add these clients, and the image stores in imagekit)
  }
}

// GET /api/enquiries
// Admin only — list all enquiries for the admin dashboard, newest first.
export async function getAllEnquiries(req, res) {
  try {
    const enquiries = await Enquiry.find({}).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: enquiries.length,
      enquiries,
    });
  } catch (error) {
    console.error("Get all enquiries error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to fetch enquiries.",
    });
  }
}

// PUT /api/enquiries/:id/follow-up
// Admin only — update the follow-up type, connected status and remarks
// for a specific enquiry from the admin dashboard.
export async function updateEnquiryFollowUp(req, res) {
  try {
    const { id } = req.params;
    const { followUpType, isConnected, remarks } = req.body;

    if (followUpType && !["none", "call", "email"].includes(followUpType)) {
      return res.status(400).json({
        success: false,
        message: "followUpType must be one of: none, call, email.",
      });
    }

    const enquiry = await Enquiry.findById(id);

    if (!enquiry) {
      return res.status(404).json({
        success: false,
        message: "Enquiry not found.",
      });
    }

    if (followUpType !== undefined) {
      enquiry.followUpType = followUpType;
    }

    if (typeof isConnected === "boolean") {
      enquiry.isConnected = isConnected;
    }

    if (typeof remarks === "string") {
      enquiry.remarks = remarks;
    }

    await enquiry.save();

    return res.status(200).json({
      success: true,
      message: "Enquiry updated successfully.",
      enquiry,
    });
  } catch (error) {
    console.error("Update enquiry follow-up error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to update enquiry.",
    });
  }
}