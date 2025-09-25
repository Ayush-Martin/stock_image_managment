export const TYPES = {
  // Repositories
  IUserRepository: Symbol.for("IUserRepository"),
  IOTPRepository: Symbol.for("IOTPRepository"),
  IRegisterOTPRepository: Symbol.for("IRegisterOTPRepository"),

  //Services
  IHashingService: Symbol.for("IHashingService"),
  IEmailService: Symbol.for("IEmailService"),

  //UseCases
  IRegisterUseCase: Symbol.for("IRegisterUseCase"),
  IOTPVerificationUseCase: Symbol.for("IOTPVerificationUseCase"),
  IResetOTPUseCase: Symbol.for("IResetOTPUseCase"),

  ICompleteRegistrationUseCase: Symbol.for("ICompleteRegistrationUseCase"),

  //Controllers
  AuthController: Symbol.for("AuthController"),
  OTPController: Symbol.for("OTPController"),

  //Middlewares
  IErrorHandlerMiddleware: Symbol.for("IErrorHandlerMiddleware"),
} as const;
