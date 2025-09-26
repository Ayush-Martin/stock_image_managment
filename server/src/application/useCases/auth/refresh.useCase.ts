import { inject, injectable } from "inversify";
import { IRefreshUseCase } from "../../interface/useCases/auth/IRefresh.useCase";
import { TYPES } from "../../../infrastructure/container/types";
import { IRefreshTokenRepository } from "../../interface/repositories/IRefreshToken.repository";
import { IUserRepository } from "../../interface/repositories/IUser.repository";
import { IJWTService } from "../../interface/services/IJWT.service";
import RefreshTokenEntity from "../../../domain/entities/refreshToken.entity";
import { AuthResponseMessage } from "../../../shared/constants/responseMessages";
import { StatusCodes } from "../../../shared/constants/statusCodes";
import errorCreator from "../../../shared/utils/errorCreator";

injectable();
class RefreshUseCase implements IRefreshUseCase {
  constructor(
    @inject(TYPES.IUserRepository) private readonly _userRepository: IUserRepository,
    @inject(TYPES.IJWTService) private readonly _jwtService: IJWTService,
    @inject(TYPES.IRefreshTokenRepository)
    private readonly _refreshTokenRepository: IRefreshTokenRepository,
  ) {}

  public async execute(userId: string): Promise<{ accessToken: string; refreshToken: string }> {
    const user = await this._userRepository.getUserById(userId);

    if (!user) {
      throw errorCreator(AuthResponseMessage.UserNotFound, StatusCodes.NOT_FOUND);
    }

    const accessToken = this._jwtService.generateAccessToken(user);
    const refreshToken = this._jwtService.generateRefreshToken(user);

    await this._refreshTokenRepository.createRefreshToken(new RefreshTokenEntity(refreshToken));

    return { accessToken, refreshToken };
  }
}

export default RefreshUseCase;
