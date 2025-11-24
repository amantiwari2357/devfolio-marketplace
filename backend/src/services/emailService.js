const nodemailer = require('nodemailer');
require('dotenv').config();

// Create transporter using Gmail
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  },
  tls: {
    rejectUnauthorized: false,
  }
});

// Verify transporter connection
transporter.verify((error, success) => {
  if (error) {
    console.error('Email service error:', error);
  } else {
    console.log('✅ Email service ready');
  }
});

/**
 * Send email verification link
 */
const sendVerificationEmail = async (email, verificationToken, frontendUrl) => {
  try {
    const verificationLink = `${frontendUrl}/verify-email?token=${verificationToken}`;

    const mailOptions = {
      from: process.env.EMAIL_USER || 'devfoliomarketplace@gmail.com',
      to: email,
      subject: 'Verify Your Email - DevFolio Marketplace',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 20px; text-align: center; border-radius: 8px 8px 0 0;">
            <h1 style="color: white; margin: 0;">DevFolio Marketplace</h1>
          </div>
          
          <div style="padding: 30px; background-color: #f9f9f9; border: 1px solid #ddd; border-radius: 0 0 8px 8px;">
            <h2 style="color: #333; margin-top: 0;">Welcome to DevFolio Marketplace!</h2>
            
            <p style="color: #666; line-height: 1.6;">
              Thank you for signing up. Please verify your email address to complete your registration and start using DevFolio Marketplace.
            </p>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="${verificationLink}" style="
                display: inline-block;
                padding: 12px 30px;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                text-decoration: none;
                border-radius: 5px;
                font-weight: bold;
                font-size: 16px;
              ">
                Verify Email
              </a>
            </div>
            
            <p style="color: #999; font-size: 14px;">
              Or copy and paste this link in your browser:
            </p>
            <p style="color: #667eea; word-break: break-all; font-size: 12px;">
              ${verificationLink}
            </p>
            
            <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
            
            <p style="color: #999; font-size: 12px;">
              This verification link will expire in 24 hours.
            </p>
            
            <p style="color: #999; font-size: 12px;">
              If you didn't sign up for this account, please ignore this email.
            </p>
          </div>
          
          <div style="text-align: center; padding: 20px; color: #999; font-size: 12px;">
            <p>© 2024 DevFolio Marketplace. All rights reserved.</p>
          </div>
        </div>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Verification email sent:', info.messageId);
    return true;
  } catch (error) {
    console.error('❌ Error sending verification email:', error);
    throw error;
  }
};

/**
 * Send welcome email after verification
 */
const sendWelcomeEmail = async (email, userName) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER || 'devfoliomarketplace@gmail.com',
      to: email,
      subject: 'Welcome to DevFolio Marketplace!',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 20px; text-align: center; border-radius: 8px 8px 0 0;">
            <h1 style="color: white; margin: 0;">DevFolio Marketplace</h1>
          </div>
          
          <div style="padding: 30px; background-color: #f9f9f9; border: 1px solid #ddd; border-radius: 0 0 8px 8px;">
            <h2 style="color: #333; margin-top: 0;">Welcome, ${userName || 'User'}! 🎉</h2>
            
            <p style="color: #666; line-height: 1.6;">
              Your email has been verified successfully. You can now log in and start exploring DevFolio Marketplace.
            </p>
            
            <div style="background-color: #e8f4f8; padding: 15px; border-left: 4px solid #667eea; margin: 20px 0;">
              <p style="color: #333; margin: 0;">
                <strong>Next Steps:</strong>
              </p>
              <ul style="color: #666; margin: 10px 0 0 0; padding-left: 20px;">
                <li>Complete your profile</li>
                <li>Set your availability</li>
                <li>Add your services</li>
                <li>Start connecting with clients</li>
              </ul>
            </div>
            
            <p style="color: #666; line-height: 1.6;">
              If you have any questions, feel free to reach out to our support team.
            </p>
            
            <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
            
            <p style="color: #999; font-size: 12px;">
              © 2024 DevFolio Marketplace. All rights reserved.
            </p>
          </div>
        </div>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Welcome email sent:', info.messageId);
    return true;
  } catch (error) {
    console.error('❌ Error sending welcome email:', error);
    throw error;
  }
};

module.exports = {
  sendVerificationEmail,
  sendWelcomeEmail,
};
