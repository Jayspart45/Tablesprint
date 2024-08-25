import nodemailer from "nodemailer";
import { ApiError } from "./ApiError.js";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.NODE_MAILER_EMAIL,
    pass: process.env.NODE_MAILER_PASSWORD,
  },
});


export const sendEmail = async (email, subject, parameters) => {
  if (!process.env.NODE_MAILER_EMAIL || !process.env.NODE_MAILER_PASSWORD) {
    throw new ApiError(
      500,
      "Email credentials are not set in environment variables"
    );
  }

  try {
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>${subject}</title>
      </head>
      <body>
        <h1>Hello, ${parameters.email}</h1>
        <p>Here is your reset password link: <a href="${parameters.resetPasswordLink}">Reset Password</a></p>
      </body>
      </html>
    `;

    const mailOptions = {
      from: process.env.NODE_MAILER_EMAIL,
      to: email,
      subject: subject,
      html: htmlContent,
    };

    await transporter.sendMail(mailOptions);
    return "Email sent successfully";
  } catch (error) {
    console.error("Error sending email:", error);
    throw new ApiError(500, "Failed to send email");
  }
};
