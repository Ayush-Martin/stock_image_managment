import { inject, injectable } from "inversify";
import { IRegisterUseCase } from "../../../application/interface/useCases/auth/IRegister.useCase";
import { TYPES } from "../../../infrastructure/container/types";
import {
  ChangePasswordSchema,
  CompleteRegistrationSchema,
  ForgetPasswordSchema,
  LoginSchema,
  RegisterUserSchema,
  ResetPasswordSchema,
} from "../../../application/DTO/user.dto";
import { StatusCodes } from "../../../shared/constants/statusCodes";
import { successResponse } from "../../../shared/utils/responseCreator";
import { AuthResponseMessage } from "../../../shared/constants/responseMessages";
import { binder } from "../../../shared/utils/binder";
import { NextFunction, Request, Response } from "express";
import { ICompleteRegistrationUseCase } from "../../../application/interface/useCases/auth/ICompleteRegistration.useCase";
import { ILoginUseCase } from "../../../application/interface/useCases/auth/ILogin.useCase";
import { RefreshTokenCookieOptions } from "../../../shared/configs/cookie";
import { REFRESH_TOKEN_COOKIE_NAME } from "../../../shared/constants/general";
import { IRefreshUseCase } from "../../../application/interface/useCases/auth/IRefresh.useCase";
import { IResetPasswordUseCase } from "../../../application/interface/useCases/auth/IResetPassword.useCase";
import { IChangePasswordUseCase } from "../../../application/interface/useCases/auth/IChangePassword.useCase";
import { IForgetPasswordUseCase } from "../../../application/interface/useCases/auth/IForgetPassword.useCase";

@injectable()
class AuthController {
  constructor(
    @inject(TYPES.IRegisterUseCase) private _registerUseCase: IRegisterUseCase,
    @inject(TYPES.ICompleteRegistrationUseCase)
    private _completeRegistrationUseCase: ICompleteRegistrationUseCase,
    @inject(TYPES.ILoginUseCase) private _loginUseCase: ILoginUseCase,
    @inject(TYPES.IRefreshUseCase) private _refreshUseCase: IRefreshUseCase,
    @inject(TYPES.IForgetPasswordUseCase) private _forgetPasswordUseCase: IForgetPasswordUseCase,
    @inject(TYPES.IResetPasswordUseCase) private _resetPasswordUseCase: IResetPasswordUseCase,
    @inject(TYPES.IChangePasswordUseCase) private _changePasswordUseCase: IChangePasswordUseCase,
  ) {
    binder(this);
  }

  /**
   * method to register user
   * @param req
   * @param res
   * @param next
   */
  public async register(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const registerUserDTO = RegisterUserSchema.parse(req.body);

      await this._registerUseCase.execute(registerUserDTO);

      res.status(StatusCodes.CREATED).json(successResponse(AuthResponseMessage.RegisterOtpSent));
    } catch (err) {
      next(err);
    }
  }

  /**
   * method to complete user registration
   * @param req
   * @param res
   * @param next
   */
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

  /**
   * method to login user
   * @param req
   * @param res
   * @param next
   */
  public async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const loginDTO = LoginSchema.parse(req.body);

      const { accessToken, refreshToken } = await this._loginUseCase.execute(loginDTO);

      res
        .cookie(REFRESH_TOKEN_COOKIE_NAME, refreshToken, RefreshTokenCookieOptions)
        .status(StatusCodes.OK)
        .json(successResponse(AuthResponseMessage.UserLoggedIn, accessToken));
    } catch (err) {
      next(err);
    }
  }

  /**
   * method to refresh token
   * @param req
   * @param res
   * @param next
   */
  public async refresh(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = req.userId!;

      const { accessToken, refreshToken } = await this._refreshUseCase.execute(userId);

      res
        .cookie(REFRESH_TOKEN_COOKIE_NAME, refreshToken, RefreshTokenCookieOptions)
        .status(StatusCodes.OK)
        .json(successResponse(AuthResponseMessage.TokenRefreshed, accessToken));
    } catch (err) {
      next(err);
    }
  }

  /**
   * method to forget password
   * @param req
   * @param res
   * @param next
   */
  public async forgetPassword(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const resetOtpDTO = ForgetPasswordSchema.parse(req.body);

      await this._forgetPasswordUseCase.execute(resetOtpDTO);

      res
        .status(StatusCodes.CREATED)
        .json(successResponse(AuthResponseMessage.ForgetPasswordOtpSent));
    } catch (err) {
      next(err);
    }
  }

  /**
   * method to reset password
   * @param req
   * @param res
   * @param next
   */
  public async resetPassword(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const resetOtpDTO = ResetPasswordSchema.parse(req.body);

      await this._resetPasswordUseCase.execute(resetOtpDTO);

      res.status(StatusCodes.OK).json(successResponse(AuthResponseMessage.PasswordReset));
    } catch (err) {
      next(err);
    }
  }

  /**
   * method to change password
   * @param req
   * @param res
   * @param next
   */
  public async changePassword(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const changePasswordDTO = ChangePasswordSchema.parse(req.body);

      await this._changePasswordUseCase.execute(req.userId!, changePasswordDTO);

      res.status(StatusCodes.OK).json(successResponse(AuthResponseMessage.PasswordReset));
    } catch (err) {
      next(err);
    }
  }

  /**
   * method to logout user
   * @param req
   * @param res
   * @param next
   */
  public async logout(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      res
        .clearCookie(REFRESH_TOKEN_COOKIE_NAME, RefreshTokenCookieOptions)
        .status(StatusCodes.OK)
        .json(successResponse(AuthResponseMessage.UserLoggedOut));
    } catch (err) {
      next(err);
    }
  }
}

export default AuthController;
