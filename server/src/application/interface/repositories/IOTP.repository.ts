import OTPEntity from "../../../domain/entities/otp.entity";

export interface IOTPRepository {
  deleteOTPByEmail(email: string): Promise<void>;
  getOTPByEmail(email: string): Promise<OTPEntity | null>;
  verifyOTP(email: string): Promise<void>;
  updateOTP(email: string, otp: string, expiresAt: Date): Promise<OTPEntity | null>;
}
