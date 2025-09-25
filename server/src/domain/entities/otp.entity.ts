import Email from "../valueObjects/email.vo";
import OTP from "../valueObjects/otp.vo";

class OTPEntity {
  constructor(
    public readonly id: string,
    public readonly OTP: OTP,
    public readonly email: Email,
    public readonly isVerified: boolean,
    public readonly expiresAt: Date,
  ) {}

  public isExpired(): boolean {
    return this.expiresAt.getTime() <= Date.now();
  }
}

export default OTPEntity;
