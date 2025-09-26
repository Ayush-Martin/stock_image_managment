import { injectable } from "inversify";
import { IChangePasswordUseCase } from "../../interface/useCases/auth/IChangePassword.useChase";
import { inject } from "inversify";
import { IUserRepository } from "../../interface/repositories/IUser.repository";
import { TYPES } from "../../../infrastructure/container/types";
import { IHashingService } from "../../interface/services/IHashing.service";
import { ChangePasswordDTO } from "../../DTO/user.dto";
import errorCreator from "../../../shared/utils/errorCreator";
import { AuthResponseMessage } from "../../../shared/constants/responseMessages";
import { StatusCodes } from "../../../shared/constants/statusCodes";

injectable();
class ChangePasswordUseCase implements IChangePasswordUseCase {
  constructor(
    @inject(TYPES.IUserRepository) private readonly _userRepository: IUserRepository,
    @inject(TYPES.IHashingService) private readonly _hashingService: IHashingService,
  ) {}

  public async execute(id: string, changePasswordDTO: ChangePasswordDTO): Promise<void> {
    const { newPassword, oldPassword } = changePasswordDTO;

    const user = await this._userRepository.getUserById(id);

    if (!user) {
      throw errorCreator(AuthResponseMessage.UserNotFound, StatusCodes.NOT_FOUND);
    }

    const isValidPassword = await this._hashingService.compare(user.password.value, oldPassword);

    if (!isValidPassword) {
      throw errorCreator(AuthResponseMessage.InvalidCurrentPassword, StatusCodes.UNAUTHORIZED);
    }

    const hashedPassword = await this._hashingService.hash(newPassword);

    await this._userRepository.updatePassword(user.id, hashedPassword);
  }
}

export default ChangePasswordUseCase;
