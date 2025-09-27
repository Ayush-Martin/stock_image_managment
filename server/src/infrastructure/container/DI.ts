import AuthController from "../../presentation/REST/controllers/auth.controller";
import { TYPES } from "./types";
import container from "./bindings";
import OTPController from "../../presentation/REST/controllers/otp.controller";
import ErrorHandlerMiddleware from "../../presentation/REST/middlewares/errorHandler.middleware";
import AuthMiddleware from "../../presentation/REST/middlewares/auth.middleware";
import ImageController from "../../presentation/REST/controllers/image.controller";

// Controllers
export const authController = container.get<AuthController>(TYPES.AuthController);
export const otpController = container.get<OTPController>(TYPES.OTPController);
export const imageController = container.get<ImageController>(TYPES.ImageController);

// Middlewares
export const errorHandlerMiddleware = container.get<ErrorHandlerMiddleware>(
  TYPES.IErrorHandlerMiddleware,
);
export const authMiddleware = container.get<AuthMiddleware>(TYPES.IAuthMiddleware);
