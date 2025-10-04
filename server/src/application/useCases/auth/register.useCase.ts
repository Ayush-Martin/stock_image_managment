import { inject, injectable } from "inversify";
import { IRegisterUseCase } from "../../interface/useCases/auth/IRegister.useCase";
import { TYPES } from "../../../infrastructure/container/types";
import { IUserRepository } from "../../interface/repositories/IUser.repository";
import { IRegisterOTPRepository } from "../../interface/repositories/IRegisterOTP.repository";
import { RegisterUserDTO } from "../../DTO/user.dto";
import errorCreator from "../../../shared/utils/errorCreator";
import { AuthResponseMessage } from "../../../shared/constants/responseMessages";
import { StatusCodes } from "../../../shared/constants/statusCodes";
import { generateOTP } from "../../../shared/utils/OTP";
import RegisterOTPEntity from "../../../domain/entities/registerOTP.entity";
import Email from "../../../domain/valueObjects/email.vo";
import Username from "../../../domain/valueObjects/username.vo";
import Password from "../../../domain/valueObjects/password.vo";
import OTP from "../../../domain/valueObjects/otp.vo";
import { IHashingService } from "../../interface/services/IHashing.service";
import { IEmailService } from "../../interface/services/IEmail.service";
import { generateOTPEmail } from "../../../shared/utils/email";

@injectable()
class RegisterUseCase implements IRegisterUseCase {
  constructor(
    @inject(TYPES.IUserRepository) private userRepository: IUserRepository,
    @inject(TYPES.IRegisterOTPRepository) private registerOTPRepository: IRegisterOTPRepository,
    @inject(TYPES.IHashingService) private hashingService: IHashingService,
    @inject(TYPES.IEmailService) private emailService: IEmailService,
  ) {}

  /**
   * method to handle register
   * - Checks if the user exists
   * - Generates an OTP
   * - Sends the OTP via email
   * @param registerUserDTO 
   */
  public async execute(registerUserDTO: RegisterUserDTO): Promise<void> {
    const { username, email, password } = registerUserDTO;

    const emailExists = await this.userRepository.getUserByEmail(email);

    if (emailExists) {
      throw errorCreator(AuthResponseMessage.EmailExists, StatusCodes.CONFLICT);
    }

    const hashedPassword = await this.hashingService.hash(password);

    const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

    const registerOTPEntity = new RegisterOTPEntity(
      "",
      new OTP(generateOTP()),
      new Email(email),
      new Username(username),
      new Password(hashedPassword),
      false,
      expiresAt,
    );

    await this.registerOTPRepository.createOTP(registerOTPEntity);

    const { subject, text, html } = generateOTPEmail(registerOTPEntity.OTP.value);

    await this.emailService.sendEmail(email, subject, text, html);
  }
}

export default RegisterUseCase;
