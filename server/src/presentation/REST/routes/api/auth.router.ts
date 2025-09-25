import { Router } from "express";
import {
  authController,
  authMiddleware,
  otpController,
} from "../../../../infrastructure/container/DI";

const authRouter = Router();

authRouter.patch("/OTP/verify", otpController.verifyOTP);
authRouter.put("/OTP/resend", otpController.resetOTP);

authRouter.post("/register", authController.register);
authRouter.post("/register/complete", authController.completeRegistration);

authRouter.get("/refresh", authMiddleware.refreshTokenValidator, authController.refresh);

authRouter.post("/login", authController.login);

authRouter.post("/forgetPassword", authController.forgetPassword);
authRouter.post("/resetPassword", authController.resetPassword);
authRouter.patch(
  "/changePassword",
  authMiddleware.accessTokenValidator,
  authController.changePassword,
);

export default authRouter;
