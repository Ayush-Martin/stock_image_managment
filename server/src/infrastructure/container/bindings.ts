import { Container } from "inversify";
import { TYPES } from "./types";

//Models
import UserModel from "../DB/Mongodb/models/user.model";
import OTPModel from "../DB/Mongodb/models/otp.model";
import RefreshTokenModel from "../DB/Mongodb/models/refreshToken.model";

//Repository Interfaces
import { IUserRepository } from "../../application/interface/repositories/IUser.repository";
import { IOTPRepository } from "../../application/interface/repositories/IOTP.repository";
import { IRegisterOTPRepository } from "../../application/interface/repositories/IRegisterOTP.repository";
import { IRefreshTokenRepository } from "../../application/interface/repositories/IRefreshToken.repository";

//Repository Implementations
import UserRepository from "../repositories/user.repository";
import OTPRepository from "../repositories/OTP.repository";
import RegisterOTPRepository from "../repositories/registerOTP.repository";
import RefreshTokenRepository from "../repositories/refreshToken.repository";

//Service Interfaces
import { IHashingService } from "../../application/interface/services/IHashing.service";
import { IEmailService } from "../../application/interface/services/IEmail.service";
import { IJWTService } from "../../application/interface/services/IJWT.service";

//Service Implementations
import HashingService from "../services/hashing.service";
import EmailService from "../services/email.service";
import JWTService from "../services/jwt.service";

//UseCase Interfaces
import { IRegisterUseCase } from "../../application/interface/useCases/auth/IRegister.useCase";
import { IOTPVerificationUseCase } from "../../application/interface/useCases/auth/IOTPVerification.useCase";
import { ICompleteRegistrationUseCase } from "../../application/interface/useCases/auth/ICompleteRegistration.useCase";
import { IResetOTPUseCase } from "../../application/interface/useCases/auth/IResetOTP.useCase";
import { ILoginUseCase } from "../../application/interface/useCases/auth/ILogin.useCase";
import { IRefreshUseCase } from "../../application/interface/useCases/auth/IRefresh.useCase";

//UseCase Implementations
import RegisterUseCase from "../../application/useCases/auth/register.useCase";
import OTPVerificationUseCase from "../../application/useCases/auth/OTPVerification.useCase";
import CompleteRegistrationUseCase from "../../application/useCases/auth/completeRegistration.useCase";
import ResetOTPUseCase from "../../application/useCases/auth/resetOTP.useCase";
import LoginUseCase from "../../application/useCases/auth/login.useCase";
import RefreshUseCase from "../../application/useCases/auth/refresh.useCase";

//Controller Implementations
import AuthController from "../../presentation/REST/controllers/auth.controller";
import OTPController from "../../presentation/REST/controllers/otp.controller";

//Middleware Implementations
import ErrorHandlerMiddleware from "../../presentation/REST/middlewares/errorHandler.middleware";
import AuthMiddleware from "../../presentation/REST/middlewares/auth.middleware";

const container = new Container();

// ----- Repository ------
container
  .bind<IUserRepository>(TYPES.IUserRepository)
  .toDynamicValue(() => {
    return new UserRepository(UserModel);
  })
  .inSingletonScope();

container
  .bind<IOTPRepository>(TYPES.IOTPRepository)
  .toDynamicValue(() => {
    return new OTPRepository(OTPModel);
  })
  .inSingletonScope();

container
  .bind<IRegisterOTPRepository>(TYPES.IRegisterOTPRepository)
  .toDynamicValue(() => {
    return new RegisterOTPRepository(OTPModel);
  })
  .inSingletonScope();

container
  .bind<IRefreshTokenRepository>(TYPES.IRefreshTokenRepository)
  .toDynamicValue(() => {
    return new RefreshTokenRepository(RefreshTokenModel);
  })
  .inSingletonScope();

// ----- Services ------
container.bind<IHashingService>(TYPES.IHashingService).to(HashingService);

container.bind<IEmailService>(TYPES.IEmailService).to(EmailService);

container.bind<IJWTService>(TYPES.IJWTService).to(JWTService);

// ----- UseCases ------
container.bind<IRegisterUseCase>(TYPES.IRegisterUseCase).to(RegisterUseCase);

container.bind<IOTPVerificationUseCase>(TYPES.IOTPVerificationUseCase).to(OTPVerificationUseCase);

container.bind<IResetOTPUseCase>(TYPES.IResetOTPUseCase).to(ResetOTPUseCase);

container
  .bind<ICompleteRegistrationUseCase>(TYPES.ICompleteRegistrationUseCase)
  .to(CompleteRegistrationUseCase);

container.bind<ILoginUseCase>(TYPES.ILoginUseCase).to(LoginUseCase);

container.bind<IRefreshUseCase>(TYPES.IRefreshUseCase).to(RefreshUseCase);

//----- Controllers ------
container.bind<AuthController>(TYPES.AuthController).to(AuthController);
container.bind<OTPController>(TYPES.OTPController).to(OTPController);

//----- Middlewares ------
container.bind<ErrorHandlerMiddleware>(TYPES.IErrorHandlerMiddleware).to(ErrorHandlerMiddleware);

container.bind<AuthMiddleware>(TYPES.IAuthMiddleware).to(AuthMiddleware);

export default container;
