import otpValidationRules from "../../shared/validation/validationRule/otpValidationRules";

class OTP {
  public readonly value: string;

  constructor(otp: string) {
    this.value = otpValidationRules.OTP.parse(otp);
  }
}

export default OTP;
