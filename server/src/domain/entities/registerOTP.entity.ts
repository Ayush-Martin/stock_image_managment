import Email from "../valueObjects/email.vo";
import OTP from "../valueObjects/otp.vo";
import Password from "../valueObjects/password.vo";
import Username from "../valueObjects/username.vo";
import OTPEntity from "./otp.entity";

class RegisterOTPEntity extends OTPEntity {
  constructor(
    public readonly id: string,
    public readonly OTP: OTP,
    public readonly email: Email,
    public readonly username: Username,
    public readonly password: Password,
    public readonly isVerified: boolean,
  ) {
    super(id, OTP, email, isVerified);
  }
}

export default RegisterOTPEntity;
