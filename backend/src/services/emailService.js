// const nodemailer = require('nodemailer');
// require('dotenv').config();

// TODO: Re-enable email service once EMAIL_USER and EMAIL_PASSWORD are set in .env
// Error was: Missing credentials for "PLAIN" (EAUTH)

// // Create transporter using Gmail
// const transporter = nodemailer.createTransport({
//   host: "smtp.gmail.com",
//   port: 465,
//   secure: true,
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASSWORD
//   },
//   tls: {
//     rejectUnauthorized: false,
//   }
// });

// // Verify transporter connection
// transporter.verify((error, success) => {
//   if (error) {
//     console.error('Email service error:', error);
//   } else {
//     console.log('✅ Email service ready');
//   }
// });

/**
 * Send email verification link
 * TODO: Re-enable when email credentials are configured
 */
const sendVerificationEmail = async (email, verificationToken, frontendUrl) => {
  console.log('⚠️  [Email Disabled] sendVerificationEmail called for:', email);
  // const verificationLink = `${frontendUrl}/verify-email?token=${verificationToken}`;
  // ...
  return true;
};

/**
 * Send welcome email after verification
 * TODO: Re-enable when email credentials are configured
 */
const sendWelcomeEmail = async (email, userName) => {
  console.log('⚠️  [Email Disabled] sendWelcomeEmail called for:', email);
  // ...
  return true;
};

module.exports = {
  sendVerificationEmail,
  sendWelcomeEmail,
};
