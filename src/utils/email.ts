import nodemailer, { type SentMessageInfo } from 'nodemailer'
import type { MailOptions } from '../types/types.js'
import { config } from '../config.ts';


if (!config.SMTP_USER || !config.SMTP_PASS) {
  throw new Error("SMTP credentials are missing in environment variables.");
}

const transporter = nodemailer.createTransport({
  host: config.SMTP_HOST || 'smtp.gmail.com',
  port: Number(config.SMTP_PORT) || 587,
  secure: false,
  auth: {
    user: config.SMTP_USER,
    pass: config.SMTP_PASS,
  },

})

export const sendMail = async (options: MailOptions) => {
  if (!options.html && !options.text) {
    throw new Error("You must provide email body in text or html.");
  }

  try {
    const mailOptions = {
      from: options.from || config.SMTP_USER,
      to: options.to,
      subject: options.subject,
      html: options.html,
      text: options.text,
    };

    const response:SentMessageInfo = await transporter.sendMail(mailOptions);

    if (!response?.success) {
      console.warn('Some recipients were rejected:', response.rejected);
    }

    return response;
  } catch (error) {
    console.error('Failed to send email:', error);
    throw error;
  }
};
