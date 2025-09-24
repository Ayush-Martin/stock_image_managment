import { Container } from "inversify";
import { TYPES } from "./types";

//Models
import UserModel from "../DB/Mongodb/models/user.model";
import OTPModel from "../DB/Mongodb/models/otp.model";

//Repository Interfaces
import { IUserRepository } from "../../application/interface/repositories/IUser.repository";
import { IOTPRepository } from "../../application/interface/repositories/IOTP.repository";
import { IRegisterOTPRepository } from "../../application/interface/repositories/IRegisterOTP.repository";

//Repository Implementations
import UserRepository from "../repositories/user.repository";
import OTPRepository from "../repositories/OTP.repository";
import RegisterOTPRepository from "../repositories/registerOTP.repository";

//Service Interfaces
import { IHashingService } from "../../application/interface/services/IHashing.service";
import { IEmailService } from "../../application/interface/services/IEmail.service";

//Service Implementations
import HashingService from "../services/hashing.service";
import EmailService from "../services/email.service";

//UseCase Interfaces
import { IRegisterUseCase } from "../../application/interface/useCases/auth/IRegister.useCase";
import { IOTPVerificationUseCase } from "../../application/interface/useCases/auth/IOTPVerification.useCase";
import { ICompleteRegistrationUseCase } from "../../application/interface/useCases/auth/ICompleteRegistration.useCase";

//UseCase Implementations
import RegisterUseCase from "../../application/useCases/auth/register.useCase";
import OTPVerificationUseCase from "../../application/useCases/auth/OTPVerification.useCase";
import CompleteRegistrationUseCase from "../../application/useCases/auth/completeRegistration.useCase";

//Controller Implementations
import AuthController from "../../presentation/REST/controllers/auth.controller";
import OTPController from "../../presentation/REST/controllers/otp.controller";

//Middleware Implementations
import ErrorHandlerMiddleware from "../../presentation/REST/middlewares/errorHandler.middleware";

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

// ----- Services ------
container.bind<IHashingService>(TYPES.IHashingService).to(HashingService);

container.bind<IEmailService>(TYPES.IEmailService).to(EmailService);

// ----- UseCases ------
container.bind<IRegisterUseCase>(TYPES.IRegisterUseCase).to(RegisterUseCase);

container.bind<IOTPVerificationUseCase>(TYPES.IOTPVerificationUseCase).to(OTPVerificationUseCase);

container
  .bind<ICompleteRegistrationUseCase>(TYPES.ICompleteRegistrationUseCase)
  .to(CompleteRegistrationUseCase);

//----- Controllers ------
container.bind<AuthController>(TYPES.AuthController).to(AuthController);
container.bind<OTPController>(TYPES.OTPController).to(OTPController);

//----- Middlewares ------
container.bind<ErrorHandlerMiddleware>(TYPES.IErrorHandlerMiddleware).to(ErrorHandlerMiddleware);

export default container;
