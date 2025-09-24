import { config } from "dotenv";

config();
export const envConfig = {
  PORT: process.env.PORT || 5000,
  MONGODB_URI: process.env.MONGODB_URI!,
  CORS_DOMAINS: process.env.CORS_DOMAINS?.split(",") || ["http://localhost:3000"],
  PASSWORD_SALT_ROUNDS: Number(process.env.PASSWORD_SALT_ROUNDS) || 10,

  // Mailer
  NODEMAILER_USER: process.env.NODEMAILER_USER!,
  NODEMAILER_PASSWORD: process.env.NODEMAILER_PASSWORD!,
} as const;
