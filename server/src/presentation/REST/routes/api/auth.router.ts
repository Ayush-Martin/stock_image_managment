import { Router } from "express";
import {
  authController,
  authMiddleware,
  otpController,
} from "../../../../infrastructure/container/DI";

const authRouter = Router();

authRouter.post("/OTP/verify", otpController.verifyOTP);
authRouter.post("/OTP/resend", otpController.resetOTP);

authRouter.post("/register", authController.register);
authRouter.post("/register/complete", authController.completeRegistration);

authRouter.post("/refresh", authMiddleware.refreshTokenValidator, authController.refresh);

authRouter.post("/login", authController.login);

authRouter.post("/forgetPassword", authController.forgetPassword);
authRouter.post("/resetPassword", authController.resetPassword);
authRouter.post(
  "/changePassword",
  authMiddleware.accessTokenValidator,
  authController.changePassword,
);

export default authRouter;
