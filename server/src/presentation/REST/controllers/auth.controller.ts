import { inject, injectable } from "inversify";
import { IRegisterUseCase } from "../../../application/interface/useCases/auth/IRegister.useCase";
import { TYPES } from "../../../infrastructure/container/types";
import { CompleteRegistrationSchema, RegisterUserSchema } from "../../../application/DTO/user.dto";
import { StatusCodes } from "../../../shared/constants/statusCodes";
import { successResponse } from "../../../shared/utils/responseCreator";
import { AuthResponseMessage } from "../../../shared/constants/responseMessages";
import { binder } from "../../../shared/utils/binder";
import { NextFunction, Request, Response } from "express";
import { IOTPVerificationUseCase } from "../../../application/interface/useCases/auth/IOTPVerification.useCase";
import { ICompleteRegistrationUseCase } from "../../../application/interface/useCases/auth/ICompleteRegistration.useCase";

@injectable()
class AuthController {
  constructor(
    @inject(TYPES.IRegisterUseCase) private _registerUseCase: IRegisterUseCase,
    @inject(TYPES.IOTPVerificationUseCase) private _otpVerificationUseCase: IOTPVerificationUseCase,
    @inject(TYPES.ICompleteRegistrationUseCase)
    private _completeRegistrationUseCase: ICompleteRegistrationUseCase,
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
}

export default AuthController;
