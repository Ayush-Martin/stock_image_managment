import { config } from "dotenv";

config();
export const envConfig = {
  PORT: process.env.PORT || 5000,
  MONGODB_URI: process.env.MONGODB_URI!,
  CORS_DOMAINS: process.env.CORS_DOMAINS?.split(",") || ["http://localhost:3000"],
  PASSWORD_SALT_ROUNDS: Number(process.env.PASSWORD_SALT_ROUNDS) || 10,
  NODE_ENV: process.env.NODE_ENV || "development",

  // Mailer
  NODEMAILER_USER: process.env.NODEMAILER_USER!,
  NODEMAILER_PASSWORD: process.env.NODEMAILER_PASSWORD!,

  // JWT
  ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET!,
  REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET!,
  ACCESS_TOKEN_EXPIRY_MIN: Number(process.env.ACCESS_TOKEN_EXPIRY_MIN) || 15,
  REFRESH_TOKEN_EXPIRY_DAY: Number(process.env.REFRESH_TOKEN_EXPIRY_DAY) || 7,

  //Cloudinary
  CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME!,
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY!,
  CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET!,
} as const;
