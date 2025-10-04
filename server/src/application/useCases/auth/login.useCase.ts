import { inject, injectable } from "inversify";
import { ILoginUseCase } from "../../interface/useCases/auth/ILogin.useCase";
import { TYPES } from "../../../infrastructure/container/types";
import { IUserRepository } from "../../interface/repositories/IUser.repository";
import { LoginDTO } from "../../DTO/user.dto";
import { AuthResponseMessage } from "../../../shared/constants/responseMessages";
import { StatusCodes } from "../../../shared/constants/statusCodes";
import errorCreator from "../../../shared/utils/errorCreator";
import { IHashingService } from "../../interface/services/IHashing.service";
import { IJWTService } from "../../interface/services/IJWT.service";
import { IRefreshTokenRepository } from "../../interface/repositories/IRefreshToken.repository";
import RefreshTokenEntity from "../../../domain/entities/refreshToken.entity";

@injectable()
class LoginUseCase implements ILoginUseCase {
  constructor(
    @inject(TYPES.IUserRepository) private readonly _userRepository: IUserRepository,
    @inject(TYPES.IHashingService) private readonly _hashingService: IHashingService,
    @inject(TYPES.IJWTService) private readonly _jwtService: IJWTService,
    @inject(TYPES.IRefreshTokenRepository)
    private readonly _refreshTokenRepository: IRefreshTokenRepository,
  ) {}

  /**
   * method to handle login
   * - Checks if the user exists
   * - Checks if the password is valid
   * - Generates access and refresh tokens
   * @param loginDTO 
   * @returns 
   */
  public async execute(loginDTO: LoginDTO): Promise<{ accessToken: string; refreshToken: string }> {
    const { email, password } = loginDTO;

    const user = await this._userRepository.getUserByEmail(email);

    if (!user) {
      throw errorCreator(AuthResponseMessage.UserNotFound, StatusCodes.NOT_FOUND);
    }

    const isValidPassword = await this._hashingService.compare(user.password.value, password);

    if (!isValidPassword) {
      throw errorCreator(AuthResponseMessage.InvalidCredentials, StatusCodes.UNAUTHORIZED);
    }

    const accessToken = this._jwtService.generateAccessToken(user);
    const refreshToken = this._jwtService.generateRefreshToken(user);

    await this._refreshTokenRepository.createRefreshToken(new RefreshTokenEntity(refreshToken));

    return { accessToken, refreshToken };
  }
}

export default LoginUseCase;
