import { Router } from "express";
import { authController, otpController } from "../../../../infrastructure/container/DI";

const authRouter = Router();

authRouter.post("/OTP/verify", otpController.verifyOTP);

authRouter.post("/register", authController.register);
authRouter.post("/register/complete", authController.completeRegistration);

export default authRouter;
