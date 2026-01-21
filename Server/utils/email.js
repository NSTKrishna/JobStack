const nodemailer = require("nodemailer");

// Verify environment variables
if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
  console.warn(
    "⚠️  Warning: EMAIL_USER or EMAIL_PASS not set in environment variables",
  );
}

const transport = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Verify transport configuration
transport.verify((error, success) => {
  if (error) {
    console.error("❌ Email transport configuration error:", error.message);
  } else {
    console.log("✅ Email server is ready to send emails");
  }
});

module.exports = { transport };
