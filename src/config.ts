import dotenv from 'dotenv'

dotenv.config();

export const config = {
  SMTP_USER: process.env.SMTP_USER!,
  SMTP_PASS: process.env.SMTP_PASS!,
  SMTP_HOST: process.env.SMTP_HOST!,
  SMTP_PORT: Number(process.env.SMTP_PORT) || 587,
  PORT: Number(process.env.PORT) || 3000,
  URI: process.env.URI,
}