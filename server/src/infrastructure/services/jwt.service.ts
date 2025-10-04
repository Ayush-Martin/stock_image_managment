import { injectable } from "inversify";
import { IJWTService } from "../../application/interface/services/IJWT.service";
import UserEntity from "../../domain/entities/user.entity";
import { sign, verify } from "jsonwebtoken";
import { envConfig } from "../../shared/configs/env";
import errorCreator from "../../shared/utils/errorCreator";
import { StatusCodes } from "../../shared/constants/statusCodes";

@injectable()
class JWTService implements IJWTService {
  /**
   * method to generate access token
   * @param useEntity 
   * @returns 
   */
  generateAccessToken(useEntity: UserEntity): string {
    return sign(
      {
        sub: useEntity.id,
        id: useEntity.id,
        username: useEntity.username.value,
        email: useEntity.email.value,
      },
      envConfig.ACCESS_TOKEN_SECRET,
      { expiresIn: `${envConfig.ACCESS_TOKEN_EXPIRY_MIN}m` },
    );
  }

  /**
   * method to generate refresh token
   * @param useEntity 
   * @returns 
   */
  generateRefreshToken(useEntity: UserEntity): string {
    return sign(
      {
        sub: useEntity.id,
        id: useEntity.id,
        email: useEntity.email.value,
      },
      envConfig.REFRESH_TOKEN_SECRET,
      { expiresIn: `${envConfig.REFRESH_TOKEN_EXPIRY_DAY}d` },
    );
  }

  /**
   * method to extract token from auth header
   * @param authHeader 
   * @returns 
   */
  extractTokenFromAuthHeader(authHeader: string | undefined): string | null {
    if (!authHeader) return null;
    const parts = authHeader.split(" ");
    if (parts.length !== 2) return null;
    if (parts[0] !== "Bearer") return null;
    return parts[1];
  }

  /**
   * method to verify access token
   * @param token 
   * @returns 
   */
  public async verifyAccessToken(token: string): Promise<any> {
    return new Promise((resolve, reject) => {
      verify(token, envConfig.ACCESS_TOKEN_SECRET, (err, payload) => {
        if (err) {
          return reject(errorCreator("Invalid token", StatusCodes.UNAUTHORIZED));
        }

        resolve(payload);
      });
    });
  }
}

export default JWTService;
