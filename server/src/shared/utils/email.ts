export const generateOTPEmail = (otp: string) => {
  const subject = "Your One-Time Password (OTP)";

  const text = `
Hello,

Your OTP code is: ${otp}

This code will expire in 5 minutes. 
If you did not request this, please ignore this email.

Thanks,
The Support Team
  `.trim();

  const html = `
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eee; border-radius: 8px;">
    <h2 style="color: #333; text-align: center;">🔐 Your OTP Code</h2>
    <p style="font-size: 16px; color: #555;">Hello,</p>
    <p style="font-size: 16px; color: #555;">Use the OTP code below to continue:</p>
    <div style="text-align: center; margin: 20px 0;">
      <span style="display: inline-block; padding: 12px 24px; font-size: 24px; letter-spacing: 4px; color: #fff; background: #007BFF; border-radius: 6px; font-weight: bold;">
        ${otp}
      </span>
    </div>
    <p style="font-size: 14px; color: #777;">⏳ This code will expire in <strong>5 minutes</strong>.</p>
    <p style="font-size: 14px; color: #777;">⚠️ If you did not request this OTP, please ignore this email.</p>
    <p style="margin-top: 30px; font-size: 14px; color: #555;">Thanks,<br>The Support Team</p>
  </div>
  `;

  return { subject, text, html };
};
