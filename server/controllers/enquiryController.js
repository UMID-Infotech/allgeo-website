import transporter from "../config/mailer.js";

export async function submitEnquiry(req, res) {
  try {
    const { name, email, contactNumber, message } = req.body;

    if (!name || !email || !contactNumber || !message) {
      return res.status(400).json({
        success: false,
        message: "All fields are required.",
      });
    }

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
          <h2 style="color: #082d57;">
            New Website Enquiry
          </h2>

          <p>
            A new enquiry has been received from the AllGeo Solutions website.
          </p>

          <hr style="border: 0; border-top: 1px solid #e5e7eb;" />

          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Contact Number:</strong> ${contactNumber}</p>

          <p><strong>Message:</strong></p>

          <p>${message}</p>

          <hr style="border: 0; border-top: 1px solid #e5e7eb;" />

          <p style="font-size: 12px; color: #6b7280;">
            Submitted through the AllGeo Solutions website.
          </p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    return res.status(200).json({
      success: true,
      message: "Enquiry submitted successfully.",
    });
  } catch (error) {
    console.error("Enquiry email error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to submit enquiry. Please try again.",
    });
  }
}
