import { inject, injectable } from "inversify";
import { IOTPVerificationUseCase } from "../../interface/useCases/auth/IOTPVerification.useCase";
import { IOTPRepository } from "../../interface/repositories/IOTP.repository";
import { TYPES } from "../../../infrastructure/container/types";
import errorCreator from "../../../shared/utils/errorCreator";
import { AuthResponseMessage } from "../../../shared/constants/responseMessages";
import { StatusCodes } from "../../../shared/constants/statusCodes";
import { VerifyOtpDTO } from "../../DTO/otp.dto";

@injectable()
class OTPVerificationUseCase implements IOTPVerificationUseCase {
  constructor(@inject(TYPES.IOTPRepository) private readonly _OTPRepository: IOTPRepository) {}

  public async execute(verifyOtpDTO: VerifyOtpDTO): Promise<void> {
    const storedOTP = await this._OTPRepository.getOTPByEmail(verifyOtpDTO.email);

    if (!storedOTP || storedOTP.isExpired()) {
      throw errorCreator(AuthResponseMessage.OtpExpired, StatusCodes.GONE);
    }

    if (storedOTP?.OTP.value !== verifyOtpDTO.OTP) {
      throw errorCreator(AuthResponseMessage.InvalidOtp, StatusCodes.BAD_REQUEST);
    }

    await this._OTPRepository.verifyOTP(verifyOtpDTO.email);
  }
}

export default OTPVerificationUseCase;
