import { unmanaged } from "inversify";
import { IRefreshTokenRepository } from "../../application/interface/repositories/IRefreshToken.repository";
import { Model } from "mongoose";
import { IRefreshTokenDocument } from "../DB/Mongodb/models/refreshToken.model";
import RefreshTokenEntity from "../../domain/entities/refreshToken.entity";
import RefreshTokenMapper from "../mappers/refreshToken.mapper";

class RefreshTokenRepository implements IRefreshTokenRepository {
  constructor(@unmanaged() private readonly _RefreshToken: Model<IRefreshTokenDocument>) {}

  public async createRefreshToken(refreshTokenEntity: RefreshTokenEntity): Promise<void> {
    const doc = new this._RefreshToken(RefreshTokenMapper.toDocument(refreshTokenEntity));
    await doc.save();
  }

  public async deleteRefreshToken(refreshTokenEntity: RefreshTokenEntity): Promise<void> {
    await this._RefreshToken.deleteOne({ refreshToken: refreshTokenEntity.refreshToken });
  }

  public async getRefreshToken(
    refreshTokenEntity: RefreshTokenEntity,
  ): Promise<RefreshTokenEntity | null> {
    return await this._RefreshToken.findOne({ refreshToken: refreshTokenEntity.refreshToken });
  }
}

export default RefreshTokenRepository;
