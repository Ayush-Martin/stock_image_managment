import { injectable } from "inversify";
import { IResetOTPUseCase } from "../../interface/useCases/auth/IResetOTP.useCase";
import { inject } from "inversify";
import { TYPES } from "../../../infrastructure/container/types";
import { IOTPRepository } from "../../interface/repositories/IOTP.repository";
import { ResetOtpDTO } from "../../DTO/otp.dto";
import errorCreator from "../../../shared/utils/errorCreator";
import { AuthResponseMessage } from "../../../shared/constants/responseMessages";
import { StatusCodes } from "../../../shared/constants/statusCodes";
import { generateOTP } from "../../../shared/utils/OTP";
import { IEmailService } from "../../interface/services/IEmail.service";
import { generateOTPEmail } from "../../../shared/utils/email";

@injectable()
class ResetOTPUseCase implements IResetOTPUseCase {
  constructor(
    @inject(TYPES.IOTPRepository) private readonly _otpRepository: IOTPRepository,
    @inject(TYPES.IEmailService) private _emailService: IEmailService,
  ) {}

  public async execute(resetOtpDTO: ResetOtpDTO): Promise<void> {
    const { email } = resetOtpDTO;

    const storedOTP = await this._otpRepository.getOTPByEmail(email);

    if (!storedOTP) {
      throw errorCreator(AuthResponseMessage.OtpNotFound, StatusCodes.NOT_FOUND);
    }

    const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

    const newOTP = generateOTP();

    await this._otpRepository.updateOTP(email, newOTP, expiresAt);

    const { subject, text, html } = generateOTPEmail(newOTP);

    await this._emailService.sendEmail(email, subject, text, html);
  }
}

export default ResetOTPUseCase;
