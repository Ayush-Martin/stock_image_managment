import RefreshTokenEntity from "../../domain/entities/refreshToken.entity";
import { IRefreshTokenDocument } from "../DB/Mongodb/models/refreshToken.model";

class RefreshTokenMapper {
  /**
   * method to map RefreshTokenDocument to RefreshTokenEntity
   * @param doc 
   * @returns 
   */
  static toEntity(doc: IRefreshTokenDocument) {
    return new RefreshTokenEntity(doc.refreshToken);
  }

  /**
   * method to map RefreshTokenEntity to RefreshTokenDocument
   * @param entity 
   * @returns 
   */
  static toDocument(entity: RefreshTokenEntity) {
    return {
      refreshToken: entity.refreshToken,
    };
  }
}

export default RefreshTokenMapper;
