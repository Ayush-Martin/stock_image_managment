import { Document, Schema, model } from "mongoose";

export interface IOTPDocument extends Document {
  email: string;
  OTP: string;
  isVerified: boolean;
  username?: string;
  password?: string;
}

const OTPSchema = new Schema<IOTPDocument>(
  {
    isVerified: { type: Boolean, default: false },
    email: { type: String, required: true },
    OTP: { type: String, required: true },
    username: { type: String, required: false },
    password: { type: String, required: false },
  },
  { timestamps: true },
);

OTPSchema.index({ expires: 1 }, { expireAfterSeconds: 0 });

export default model<IOTPDocument>("OTP", OTPSchema);
