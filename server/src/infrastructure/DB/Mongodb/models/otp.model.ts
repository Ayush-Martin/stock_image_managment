import { Document, Schema, model } from "mongoose";

export interface IOTPDocument extends Document {
  email: string;
  OTP: string;
  isVerified: boolean;
  username?: string;
  password?: string;
  expiresAt: Date;
}

const OTPSchema = new Schema<IOTPDocument>(
  {
    isVerified: { type: Boolean, default: false },
    email: { type: String, required: true },
    OTP: { type: String, required: true },
    username: { type: String, required: false },
    password: { type: String, required: false },
    expiresAt: { type: Date, required: true },
  },
  { timestamps: true },
);

export default model<IOTPDocument>("OTP", OTPSchema);
