const nodemailer = require("nodemailer")

// Create transporter based on environment
const createTransporter = () => {
  if (process.env.EMAIL_SERVICE === "gmail") {
    return nodemailer.createTransporter({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    })
  }

  // Default SMTP configuration
  return nodemailer.createTransporter({
    host: process.env.SMTP_HOST || "localhost",
    port: process.env.SMTP_PORT || 587,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  })
}

// Email templates
const templates = {
  welcome: (data) => ({
    subject: "Welcome to PetCare!",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #2563eb;">Welcome to PetCare, ${data.firstName}!</h1>
        <p>Thank you for joining our community of pet lovers. We're excited to help you find your perfect companion.</p>
        <p>To get started, please verify your email address by clicking the button below:</p>
        <a href="${data.verificationLink}" style="background-color: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block; margin: 20px 0;">
          Verify Email Address
        </a>
        <p>If you didn't create this account, please ignore this email.</p>
        <p>Best regards,<br>The PetCare Team</p>
      </div>
    `,
  }),

  "password-reset": (data) => ({
    subject: "Password Reset Request",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #2563eb;">Password Reset Request</h1>
        <p>Hi ${data.firstName},</p>
        <p>We received a request to reset your password. Click the button below to create a new password:</p>
        <a href="${data.resetLink}" style="background-color: #dc2626; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block; margin: 20px 0;">
          Reset Password
        </a>
        <p>This link will expire in 1 hour for security reasons.</p>
        <p>If you didn't request this password reset, please ignore this email.</p>
        <p>Best regards,<br>The PetCare Team</p>
      </div>
    `,
  }),

  "new-application": (data) => ({
    subject: `New Adoption Application for ${data.petName}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #2563eb;">New Adoption Application</h1>
        <p>You have received a new adoption application for <strong>${data.petName}</strong>.</p>
        <p><strong>Applicant:</strong> ${data.applicantName}</p>
        <p><strong>Application ID:</strong> ${data.applicationId}</p>
        <p>Please review the application in your dashboard:</p>
        <a href="${data.dashboardLink}" style="background-color: #16a34a; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block; margin: 20px 0;">
          Review Application
        </a>
        <p>Best regards,<br>The PetCare Team</p>
      </div>
    `,
  }),

  "application-status-update": (data) => ({
    subject: `Application Update for ${data.petName}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #2563eb;">Application Status Update</h1>
        <p>Hi ${data.applicantName},</p>
        <p>Your adoption application for <strong>${data.petName}</strong> has been updated.</p>
        <p><strong>New Status:</strong> ${data.status.charAt(0).toUpperCase() + data.status.slice(1)}</p>
        ${data.rejectionReason ? `<p><strong>Reason:</strong> ${data.rejectionReason}</p>` : ""}
        <p>You can view the full details of your application here:</p>
        <a href="${data.applicationLink}" style="background-color: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block; margin: 20px 0;">
          View Application
        </a>
        <p>If you have any questions, please contact ${data.shelterName} directly.</p>
        <p>Best regards,<br>The PetCare Team</p>
      </div>
    `,
  }),
}

// Send email function
const sendEmail = async ({ to, subject, template, data, html, text }) => {
  try {
    const transporter = createTransporter()

    let emailContent = {}

    if (template && templates[template]) {
      const templateContent = templates[template](data)
      emailContent = {
        subject: templateContent.subject,
        html: templateContent.html,
      }
    } else {
      emailContent = { subject, html, text }
    }

    const mailOptions = {
      from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
      to,
      ...emailContent,
    }

    const result = await transporter.sendMail(mailOptions)
    console.log("Email sent successfully:", result.messageId)
    return result
  } catch (error) {
    console.error("Email sending failed:", error)
    throw error
  }
}

module.exports = { sendEmail }
