import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transportemail = nodemailer.createTransport({
  host: process.env.SMTP,
  port: 465,
  secure: true, // true for port 465, false for other ports
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const emailProvider = async (email, otp) => {
  try {
    const info = await transportemail.sendMail({
      from: process.env.EMAIL_USER, // by whom email will be sent
      to: email, // to email send
      subject: "Your email verification OTP",
      text: `Your OTP is ${otp}. It will expire in 10 minutes.`,
      html: `
        <html>
          <head>
            <style>
              body {
                font-family: 'Arial', sans-serif;
                background-color: #f4f7fc;
                margin: 0;
                padding: 0;
              }
              .email-container {
                width: 100%;
                max-width: 600px;
                margin: 0 auto;
                background-color: #ffffff;
                padding: 20px;
                border-radius: 10px;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
              }
              .header {
                text-align: center;
                padding-bottom: 20px;
              }
              .otp-box {
                background-color: #e6f4ff;
                padding: 20px;
                border-radius: 10px;
                font-size: 30px;
                font-weight: bold;
                color: #007bff;
                text-align: center;
              }
              .cta-button {
                background-color: #007bff;
                color: white;
                padding: 15px 25px;
                border-radius: 50px;
                text-align: center;
                display: inline-block;
                margin-top: 30px;
                text-decoration: none;
                font-size: 16px;
              }
              .footer {
                text-align: center;
                font-size: 12px;
                color: #777;
                margin-top: 30px;
              }
              @media (max-width: 600px) {
                .email-container {
                  padding: 15px;
                }
                .cta-button {
                  width: 100%;
                  padding: 12px 20px;
                }
              }
            </style>
          </head>
          <body>
            <div class="email-container">
              <div class="header">
                <img src="https://your-brand-logo.com/logo.png" alt="Your Brand Logo" width="150" />
                <h2>Email Verification</h2>
                <p>Dear User,</p>
              </div>
              <div>
                <p>Thank you for registering! To complete your registration, please enter the OTP below:</p>
                <div class="otp-box">
                  <p>Your OTP is: <strong>${otp}</strong></p>
                </div>
                <p>This OTP will expire in 10 minutes.</p>
                <a href="#" class="cta-button">Verify Now</a>
              </div>
              <div class="footer">
                <p>If you did not request this, please ignore this email.</p>
                <p>&copy; 2025 Your Brand. All rights reserved.</p>
              </div>
            </div>
          </body>
        </html>
      `,
    });
    console.log("Message sent: %s", info.messageId);
  } catch (error) {
    console.error("Error handling email OTP:", error);
    throw new Error(error.message, "Failed to send email");
  }
};
