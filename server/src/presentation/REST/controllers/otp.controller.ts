import { inject } from "inversify";
import { injectable } from "inversify";
import { TYPES } from "../../../infrastructure/container/types";
import { IOTPVerificationUseCase } from "../../../application/interface/useCases/auth/IOTPVerification.useCase";
import { NextFunction, Request, Response } from "express";
import { ResetOTPSchema, verifyOTPSchema } from "../../../application/DTO/otp.dto";
import { StatusCodes } from "../../../shared/constants/statusCodes";
import { successResponse } from "../../../shared/utils/responseCreator";
import { AuthResponseMessage } from "../../../shared/constants/responseMessages";
import { binder } from "../../../shared/utils/binder";
import { IResetOTPUseCase } from "../../../application/interface/useCases/auth/IResetOTP.useCase";

@injectable()
class OTPController {
  constructor(
    @inject(TYPES.IOTPVerificationUseCase)
    private readonly _otpVerificationUseCase: IOTPVerificationUseCase,
    @inject(TYPES.IResetOTPUseCase) private _resetOTPUseCase: IResetOTPUseCase,
  ) {
    binder(this);
  }

  public async verifyOTP(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const verifyOtpDTO = verifyOTPSchema.parse(req.body);

      await this._otpVerificationUseCase.execute(verifyOtpDTO);

      res.status(StatusCodes.OK).json(successResponse(AuthResponseMessage.OtpVerified));
    } catch (err) {
      next(err);
    }
  }

  public async resetOTP(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const resetOtpDTO = ResetOTPSchema.parse(req.body);

      await this._resetOTPUseCase.execute(resetOtpDTO);

      res.status(StatusCodes.CREATED).json(successResponse(AuthResponseMessage.OTPResent));
    } catch (err) {
      next(err);
    }
  }
}

export default OTPController;
