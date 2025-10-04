import { Request, Response, NextFunction } from "express";
import { binder } from "../../../shared/utils/binder";
import { inject } from "inversify";
import { TYPES } from "../../../infrastructure/container/types";
import { injectable } from "inversify";
import { IJWTService } from "../../../application/interface/services/IJWT.service";
import { IRefreshTokenRepository } from "../../../application/interface/repositories/IRefreshToken.repository";
import errorCreator from "../../../shared/utils/errorCreator";
import { AuthResponseMessage } from "../../../shared/constants/responseMessages";
import { StatusCodes } from "../../../shared/constants/statusCodes";
import RefreshTokenEntity from "../../../domain/entities/refreshToken.entity";
import jwt from "jsonwebtoken";
import { envConfig } from "../../../shared/configs/env";

injectable();
class AuthMiddleware {
  constructor(
    @inject(TYPES.IJWTService) private readonly _jwtService: IJWTService,
    @inject(TYPES.IRefreshTokenRepository)
    private readonly _refreshTokenRepository: IRefreshTokenRepository,
  ) {
    binder(this);
  }

  /**
   * method to validate access token
   * @param req
   * @param res
   * @param next
   */
  public async accessTokenValidator(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const token = this._jwtService.extractTokenFromAuthHeader(req.get("authorization"));

      if (!token) {
        throw errorCreator(AuthResponseMessage.InvalidAccessToken, StatusCodes.UNAUTHORIZED);
      }

      const payload = await this._jwtService.verifyAccessToken(token); //getting payload from the access token

      const jwtPayload = payload as { id: string };

      req.userId = jwtPayload.id;

      next();
    } catch (err) {
      next(err);
    }
  }

  /**
   * method to validate refresh token
   * @param req
   * @param res
   * @param next
   */
  public async refreshTokenValidator(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const refreshToken = req.cookies.refreshToken as string | undefined;
      if (!refreshToken) {
        throw errorCreator(AuthResponseMessage.InvalidAccessToken, StatusCodes.UNAUTHORIZED);
      }

      const storedToken = await this._refreshTokenRepository.getRefreshToken(
        new RefreshTokenEntity(refreshToken),
      );

      if (!storedToken) {
        throw errorCreator(AuthResponseMessage.InvalidAccessToken, StatusCodes.UNAUTHORIZED);
      }

      jwt.verify(refreshToken, envConfig.REFRESH_TOKEN_SECRET, async (err, payload) => {
        try {
          if (err) {
            req.cookies.remove();
            errorCreator(AuthResponseMessage.InvalidRefreshToken, StatusCodes.UNAUTHORIZED);
          } else {
            req.userId = payload?.sub as string;
            next();
          }
        } catch (err) {
          next(err);
        }
      });
    } catch (err) {
      next(err);
    }
  }
}

export default AuthMiddleware;
