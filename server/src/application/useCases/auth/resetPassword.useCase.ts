import { inject, injectable } from "inversify";
import { IResetPasswordUseCase } from "../../interface/useCases/auth/IResetPassword.useCase";
import { IUserRepository } from "../../interface/repositories/IUser.repository";
import { TYPES } from "../../../infrastructure/container/types";
import { IHashingService } from "../../interface/services/IHashing.service";
import { IOTPRepository } from "../../interface/repositories/IOTP.repository";
import { ResetPasswordDTO } from "../../DTO/user.dto";
import { AuthResponseMessage } from "../../../shared/constants/responseMessages";
import { StatusCodes } from "../../../shared/constants/statusCodes";
import errorCreator from "../../../shared/utils/errorCreator";

@injectable()
class ResetPasswordUseCase implements IResetPasswordUseCase {
  constructor(
    @inject(TYPES.IOTPRepository) private readonly _otpRepository: IOTPRepository,
    @inject(TYPES.IUserRepository) private readonly _userRepository: IUserRepository,
    @inject(TYPES.IHashingService) private readonly _hashingService: IHashingService,
  ) {}

  /**
   * method to reset password
   * - Checks if the OTP is verified
   * - Updates the password
   * @param resetPasswordDTO 
   */
  public async execute(resetPasswordDTO: ResetPasswordDTO): Promise<void> {
    const { email, password } = resetPasswordDTO;

    const storedOTP = await this._otpRepository.getOTPByEmail(email);

    if (!storedOTP) {
      throw errorCreator(AuthResponseMessage.OtpNotFound, StatusCodes.NOT_FOUND);
    }

    const user = await this._userRepository.getUserByEmail(email);

    if (!user) {
      throw errorCreator(AuthResponseMessage.UserNotFound, StatusCodes.NOT_FOUND);
    }

    const hashedPassword = await this._hashingService.hash(password);

    await this._userRepository.updatePassword(user.id, hashedPassword);
  }
}

export default ResetPasswordUseCase;
