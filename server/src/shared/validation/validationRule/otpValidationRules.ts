import z from "zod";

const otpValidationRules = {
  OTP: z
    .string()
    .length(6, "OTP must be exactly 6 characters long")
    .regex(/^\d+$/, "OTP must contain only digits"),
} as const;

export default otpValidationRules;
