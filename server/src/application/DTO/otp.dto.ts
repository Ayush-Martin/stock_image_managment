import z from "zod";
import otpValidationRules from "../../shared/validation/validationRule/otpValidationRules";
import userValidationRules from "../../shared/validation/validationRule/userValidationRules";

export const OtpSchema = z.object({
  OTP: otpValidationRules.OTP,
});

export type OtpDTO = z.infer<typeof OtpSchema>;

export const verifyOTPSchema = z.object({
  email: userValidationRules.Email,
  OTP: otpValidationRules.OTP,
});

export type VerifyOtpDTO = z.infer<typeof verifyOTPSchema>;
