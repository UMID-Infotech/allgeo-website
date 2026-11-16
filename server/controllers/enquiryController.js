/* server/controllers/enquiryController.js */

import mongoose from "mongoose";

import Enquiry from "../models/Enquiry.js";
import transporter from "../config/mailer.js";

// POST /api/enquiries
// Public — used by the website's contact/enquiry form.
export async function submitEnquiry(req, res) {
  try {
    const { name, email, contactNumber, message } = req.body;

    if (!name || !email || !contactNumber || !message) {
      return res.status(400).json({
        success: false,
        message: "All fields are required.",
      });
    }

    // 1. Save enquiry in MongoDB
    const enquiry = await Enquiry.create({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      contactNumber: contactNumber.trim(),
      message: message.trim(),
    });

    // 2. Send email notification to admin
    let emailSent = false;

    try {
      const mailOptions = {
        from: `"AllGeo Website" <${process.env.MAIL_FROM}>`,
        to: process.env.MAIL_TO,
        replyTo: email,
        subject: `${name} inquired for AllGeo Services`,

        text: `
New enquiry received from AllGeo Solutions website.

Name: ${name}
Email: ${email}
Contact Number: ${contactNumber}

Message:
${message}
        `.trim(),

        html: `
          <div style="font-family: Arial, sans-serif; color: #1f2937; line-height: 1.6;">
            <h2 style="color: #082d57;">New Website Enquiry</h2>

            <p>A new enquiry has been received from the AllGeo Solutions website.</p>

            <hr />

            <p><strong>Name:</strong> ${escapeHtml(name)}</p>
            <p><strong>Email:</strong> ${escapeHtml(email)}</p>
            <p><strong>Contact Number:</strong> ${escapeHtml(contactNumber)}</p>

            <p><strong>Message:</strong></p>
            <p>${escapeHtml(message).replace(/\n/g, "<br>")}</p>

            <hr />

            <p style="font-size: 12px; color: #6b7280;">
              Submitted through the AllGeo Solutions website.
            </p>
          </div>
        `,
      };

      await transporter.sendMail(mailOptions);
      emailSent = true;
    } catch (emailError) {
      console.error("Enquiry email error:", emailError);
    }

    // 3. Return success because enquiry is safely saved
    return res.status(201).json({
      success: true,
      message: "Enquiry submitted successfully.",
      emailSent,
      enquiryId: enquiry._id,
    });
  } catch (error) {
    console.error("Enquiry submission error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to submit enquiry. Please try again.",
    });
  }
}

// GET /api/enquiries
// Admin only — returns all enquiries (newest first) for /admin/enquiries.
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
// Admin only — saves follow-up type, connected status and remarks.
// body: { followUpType?, isConnected?, remarks? }
export async function updateEnquiryFollowUp(req, res) {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid enquiry id.",
      });
    }

    const { followUpType, isConnected, remarks } = req.body;
    const updates = {};

    if (followUpType !== undefined) {
      if (!["none", "call", "email"].includes(followUpType)) {
        return res.status(400).json({
          success: false,
          message: "Follow-up type must be none, call or email.",
        });
      }
      updates.followUpType = followUpType;
    }

    if (isConnected !== undefined) {
      updates.isConnected = Boolean(isConnected);
    }

    if (remarks !== undefined) {
      updates.remarks = String(remarks).trim();
    }

    const enquiry = await Enquiry.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });

    if (!enquiry) {
      return res.status(404).json({
        success: false,
        message: "Enquiry not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Follow-up saved.",
      enquiry,
    });
  } catch (error) {
    console.error("Update enquiry follow-up error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to save follow-up.",
    });
  }
}

// Escape HTML to prevent user-submitted content from injecting HTML.
function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (char) => {
    const entities = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    };

    return entities[char];
  });
}