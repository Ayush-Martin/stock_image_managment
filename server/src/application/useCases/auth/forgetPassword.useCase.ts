import { inject } from "inversify";
import { IForgetPasswordUseCase } from "../../interface/useCases/auth/IForgetPassword.useCase";
import { injectable } from "inversify";
import { TYPES } from "../../../infrastructure/container/types";
import { IUserRepository } from "../../interface/repositories/IUser.repository";
import { IEmailService } from "../../interface/services/IEmail.service";
import { ForgetPasswordDTO } from "../../DTO/user.dto";
import { AuthResponseMessage } from "../../../shared/constants/responseMessages";
import { StatusCodes } from "../../../shared/constants/statusCodes";
import errorCreator from "../../../shared/utils/errorCreator";
import { generateOTPEmail } from "../../../shared/utils/email";
import { generateOTP } from "../../../shared/utils/OTP";
import { IOTPRepository } from "../../interface/repositories/IOTP.repository";
import OTPEntity from "../../../domain/entities/otp.entity";
import Email from "../../../domain/valueObjects/email.vo";
import OTP from "../../../domain/valueObjects/otp.vo";

@injectable()
class ForgetPasswordUseCase implements IForgetPasswordUseCase {
  constructor(
    @inject(TYPES.IUserRepository) private readonly _userRepository: IUserRepository,
    @inject(TYPES.IOTPRepository) private readonly _otpRepository: IOTPRepository,
    @inject(TYPES.IEmailService) private readonly _emailService: IEmailService,
  ) {}
  
  /**
   * method to handle forget password
   * - Checks if the user exists
   * - Generates an OTP
   * - Sends the OTP via email
   * @param forgetPasswordDTO 
   */
  public async execute(forgetPasswordDTO: ForgetPasswordDTO): Promise<void> {
    const { email } = forgetPasswordDTO;

    const user = await this._userRepository.getUserByEmail(email);

    if (!user) {
      throw errorCreator(AuthResponseMessage.UserNotFound, StatusCodes.NOT_FOUND);
    }

    const otp = generateOTP();

    const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes

    await this._otpRepository.createOTP(
      new OTPEntity("", new OTP(otp), new Email(email), false, expiresAt),
    );

    const { subject, text, html } = generateOTPEmail(otp);

    await this._emailService.sendEmail(email, subject, text, html);
  }
}

export default ForgetPasswordUseCase;
