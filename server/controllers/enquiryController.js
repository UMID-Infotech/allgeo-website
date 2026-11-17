import { randomUUID } from "node:crypto";
import { pool } from "../config/db.js";
import transporter from "../config/mailer.js";

const escapeHtml = (value) => value.replace(/[&<>"']/g, (char) => ({
  "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
})[char]);

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

  // Email is best effort. A mail failure cannot reject or lose a saved enquiry.
  if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS &&
      process.env.MAIL_FROM && process.env.MAIL_TO) {
    const mailOptions = {
      from: `"AllGeo Website" <${process.env.MAIL_FROM}>`,
      to: process.env.MAIL_TO,
      replyTo: enquiry.email,
      subject: `${enquiry.name.replace(/[\r\n]/g, " ")} inquired for AllGeo Services`,
      text: `New enquiry received from AllGeo Solutions website.\n\nName: ${enquiry.name}\nEmail: ${enquiry.email}\nContact Number: ${enquiry.contactNumber}\n\nMessage:\n${enquiry.message}`,
      html: `<div style="font-family:Arial,sans-serif;line-height:1.6"><h2>New Website Enquiry</h2><p><strong>Name:</strong> ${escapeHtml(enquiry.name)}</p><p><strong>Email:</strong> ${escapeHtml(enquiry.email)}</p><p><strong>Contact Number:</strong> ${escapeHtml(enquiry.contactNumber)}</p><p><strong>Message:</strong></p><p>${escapeHtml(enquiry.message).replace(/\n/g, "<br>")}</p></div>`,
    };
    void transporter.sendMail(mailOptions).then(async () => {
      await pool.query("UPDATE enquiries SET email_status = 'sent' WHERE id = $1", [enquiry.id]);
    }).catch(async (error) => {
      console.error("Enquiry email error:", error);
      try {
        await pool.query("UPDATE enquiries SET email_status = 'failed' WHERE id = $1", [enquiry.id]);
      } catch (updateError) {
        console.error("Enquiry email status error:", updateError);
      }
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
    console.error("Enquiry list error:", error);
    return res.status(500).json({ success: false, message: "Unable to load enquiries." });
  }
}