export const TYPES = {
  // Repositories
  IUserRepository: Symbol.for("IUserRepository"),
  IOTPRepository: Symbol.for("IOTPRepository"),
  IRegisterOTPRepository: Symbol.for("IRegisterOTPRepository"),
  IRefreshTokenRepository: Symbol.for("IRefreshTokenRepository"),

  //Services
  IHashingService: Symbol.for("IHashingService"),
  IEmailService: Symbol.for("IEmailService"),
  IJWTService: Symbol.for("IJWTService"),

  //UseCases
  IRegisterUseCase: Symbol.for("IRegisterUseCase"),
  IOTPVerificationUseCase: Symbol.for("IOTPVerificationUseCase"),
  IResetOTPUseCase: Symbol.for("IResetOTPUseCase"),
  ILoginUseCase: Symbol.for("ILoginUseCase"),
  IRefreshUseCase: Symbol.for("IRefreshUseCase"),
  IForgetPasswordUseCase: Symbol.for("IForgotPasswordUseCase"),
  IResetPasswordUseCase: Symbol.for("IResetPasswordUseCase"),
  ICompleteRegistrationUseCase: Symbol.for("ICompleteRegistrationUseCase"),
  IChangePasswordUseCase: Symbol.for("IChangePasswordUseCase"),

  //Controllers
  AuthController: Symbol.for("AuthController"),
  OTPController: Symbol.for("OTPController"),

  //Middlewares
  IErrorHandlerMiddleware: Symbol.for("IErrorHandlerMiddleware"),
  IAuthMiddleware: Symbol.for("IAuthMiddleware"),
} as const;
