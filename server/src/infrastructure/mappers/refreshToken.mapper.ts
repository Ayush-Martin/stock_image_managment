import RefreshTokenEntity from "../../domain/entities/refreshToken.entity";
import { IRefreshTokenDocument } from "../DB/Mongodb/models/refreshToken.model";

class RefreshTokenMapper {
  static toEntity(doc: IRefreshTokenDocument) {
    return new RefreshTokenEntity(doc.refreshToken);
  }

  static toDocument(entity: RefreshTokenEntity) {
    return {
      refreshToken: entity.refreshToken,
    };
  }
}

export default RefreshTokenMapper;
