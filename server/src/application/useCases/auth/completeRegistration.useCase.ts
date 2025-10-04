import { injectable } from "inversify";
import { ICompleteRegistrationUseCase } from "../../interface/useCases/auth/ICompleteRegistration.useCase";
import { inject } from "inversify";
import { IUserRepository } from "../../interface/repositories/IUser.repository";
import { TYPES } from "../../../infrastructure/container/types";
import { CompleteRegistrationDTO } from "../../DTO/user.dto";
import { IRegisterOTPRepository } from "../../interface/repositories/IRegisterOTP.repository";
import errorCreator from "../../../shared/utils/errorCreator";
import { AuthResponseMessage } from "../../../shared/constants/responseMessages";
import { StatusCodes } from "../../../shared/constants/statusCodes";
import UserEntity from "../../../domain/entities/user.entity";
import Username from "../../../domain/valueObjects/username.vo";
import Email from "../../../domain/valueObjects/email.vo";
import Password from "../../../domain/valueObjects/password.vo";

@injectable()
class CompleteRegistrationUseCase implements ICompleteRegistrationUseCase {
  constructor(
    @inject(TYPES.IUserRepository) private readonly _userRepository: IUserRepository,
    @inject(TYPES.IRegisterOTPRepository)
    private readonly _registerOTPRepository: IRegisterOTPRepository,
  ) {}

  /**
   * method to complete registration
   * - Checks if the OTP is verified
   * - Creates the user
   * @param completeRegistrationDTO
   */
  public async execute(completeRegistrationDTO: CompleteRegistrationDTO): Promise<void> {
    const savedOTP = await this._registerOTPRepository.getRegisterOTPByEmail(
      completeRegistrationDTO.email,
    );

    if (!savedOTP || !savedOTP.isVerified) {
      throw errorCreator(AuthResponseMessage.OtpNotVerified, StatusCodes.BAD_REQUEST);
    }

    const { email, password, username } = savedOTP;

    const userEntity = new UserEntity(
      "",
      new Username(username.value),
      new Email(email.value),
      new Password(password.value),
    );

    await this._userRepository.createUser(userEntity);
  }
}

export default CompleteRegistrationUseCase;
