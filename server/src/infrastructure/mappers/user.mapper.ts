import UserEntity from "../../domain/entities/user.entity";
import Email from "../../domain/valueObjects/email.vo";
import Password from "../../domain/valueObjects/password.vo";
import Username from "../../domain/valueObjects/username.vo";
import { IUserDocument } from "../DB/Mongodb/models/user.model";

abstract class UserMapper {
  /**
   * method to map UserDocument to UserEntity
   * @param doc
   * @returns
   */
  static toEntity(doc: IUserDocument): UserEntity {
    return new UserEntity(
      doc.id,
      new Username(doc.username),
      new Email(doc.email),
      new Password(doc.password),
    );
  }

  /**
   * method to map UserEntity to UserDocument
   * @param entity
   * @returns
   */
  static toDocument(entity: UserEntity): Partial<IUserDocument> {
    return {
      username: entity.username.value,
      email: entity.email.value,
      password: entity.password.value,
    };
  }
}

export default UserMapper;
