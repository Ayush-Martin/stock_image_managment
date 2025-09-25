import UserEntity from "../../../domain/entities/user.entity";

export interface IJWTService {
  generateAccessToken(useEntity: UserEntity): string;
  generateRefreshToken(useEntity: UserEntity): string;
  extractTokenFromAuthHeader(authHeader: string | undefined): string | null;
  verifyAccessToken(token: string): Promise<any>;
}
