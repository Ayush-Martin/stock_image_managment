import { inject, injectable } from "inversify";
import { IRegisterUseCase } from "../../../application/interface/useCases/auth/IRegister.useCase";
import { TYPES } from "../../../infrastructure/container/types";
import {
  CompleteRegistrationSchema,
  LoginSchema,
  RegisterUserSchema,
} from "../../../application/DTO/user.dto";
import { StatusCodes } from "../../../shared/constants/statusCodes";
import { successResponse } from "../../../shared/utils/responseCreator";
import { AuthResponseMessage } from "../../../shared/constants/responseMessages";
import { binder } from "../../../shared/utils/binder";
import { NextFunction, Request, Response } from "express";
import { IOTPVerificationUseCase } from "../../../application/interface/useCases/auth/IOTPVerification.useCase";
import { ICompleteRegistrationUseCase } from "../../../application/interface/useCases/auth/ICompleteRegistration.useCase";
import { ILoginUseCase } from "../../../application/interface/useCases/auth/ILogin.useCase";
import { RefreshTokenCookieOptions } from "../../../shared/configs/cookie";
import { REFRESH_TOKEN_COOKIE_NAME } from "../../../shared/constants/general";

@injectable()
class AuthController {
  constructor(
    @inject(TYPES.IRegisterUseCase) private _registerUseCase: IRegisterUseCase,
    @inject(TYPES.IOTPVerificationUseCase) private _otpVerificationUseCase: IOTPVerificationUseCase,
    @inject(TYPES.ICompleteRegistrationUseCase)
    private _completeRegistrationUseCase: ICompleteRegistrationUseCase,
    @inject(TYPES.ILoginUseCase) private _loginUseCase: ILoginUseCase,
  ) {
    binder(this);
  }

  public async register(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const registerUserDTO = RegisterUserSchema.parse(req.body);

      await this._registerUseCase.execute(registerUserDTO);

      res.status(StatusCodes.CREATED).json(successResponse(AuthResponseMessage.RegisterOtpSent));
    } catch (err) {
      next(err);
    }
  }

  public async completeRegistration(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const completeRegistrationDTO = CompleteRegistrationSchema.parse(req.body);

      await this._completeRegistrationUseCase.execute(completeRegistrationDTO);

      res.status(StatusCodes.CREATED).json(successResponse(AuthResponseMessage.UserRegistered));
    } catch (err) {
      next(err);
    }
  }

  public async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const loginDTO = LoginSchema.parse(req.body);

      const { accessToken, refreshToken } = await this._loginUseCase.execute(loginDTO);

      res
        .cookie(REFRESH_TOKEN_COOKIE_NAME, refreshToken, RefreshTokenCookieOptions)
        .status(StatusCodes.OK)
        .json({ accessToken });
    } catch (err) {
      next(err);
    }
  }
}

export default AuthController;
