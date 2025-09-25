import z from "zod";
import userValidationRules from "../../shared/validation/validationRule/userValidationRules";

export const RegisterUserSchema = z.object({
  username: userValidationRules.Username,
  email: userValidationRules.Email,
  password: userValidationRules.Password,
});

export type RegisterUserDTO = z.infer<typeof RegisterUserSchema>;

export const CompleteRegistrationSchema = z.object({
  email: userValidationRules.Email,
});

export type CompleteRegistrationDTO = z.infer<typeof CompleteRegistrationSchema>;

export const ForgetPasswordSchema = CompleteRegistrationSchema;

export type ForgetPasswordDTO = z.infer<typeof ForgetPasswordSchema>;

export const LoginSchema = z.object({
  email: userValidationRules.Email,
  password: userValidationRules.Password,
});

export type LoginDTO = z.infer<typeof LoginSchema>;

export const ResetPasswordSchema = z.object({
  email: userValidationRules.Email,
  password: userValidationRules.Password,
});

export type ResetPasswordDTO = z.infer<typeof ResetPasswordSchema>;

export const ChangePasswordSchema = z.object({
  oldPassword: userValidationRules.Password,
  newPassword: userValidationRules.Password,
});

export type ChangePasswordDTO = z.infer<typeof ChangePasswordSchema>;
