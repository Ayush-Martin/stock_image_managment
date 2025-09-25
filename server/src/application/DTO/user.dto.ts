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

export const LoginSchema = z.object({
  email: userValidationRules.Email,
  password: userValidationRules.Password,
});

export type LoginDTO = z.infer<typeof LoginSchema>;
