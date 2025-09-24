import { inject } from "inversify";
import { injectable } from "inversify";
import { TYPES } from "../../../infrastructure/container/types";
import { IOTPVerificationUseCase } from "../../../application/interface/useCases/auth/IOTPVerification.useCase";
import { NextFunction, Request, Response } from "express";
import { verifyOTPSchema } from "../../../application/DTO/otp.dto";
import { StatusCodes } from "../../../shared/constants/statusCodes";
import { successResponse } from "../../../shared/utils/responseCreator";
import { AuthResponseMessage } from "../../../shared/constants/responseMessages";
import { binder } from "../../../shared/utils/binder";

@injectable()
class OTPController {
  constructor(
    @inject(TYPES.IOTPVerificationUseCase)
    private readonly _otpVerificationUseCase: IOTPVerificationUseCase,
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
}

export default OTPController;
