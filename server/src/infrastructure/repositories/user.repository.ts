import { injectable } from "inversify";
import { IUserRepository } from "../../application/interface/repositories/IUser.repository";
import { unmanaged } from "inversify";
import { Model } from "mongoose";
import { IUserDocument } from "../DB/Mongodb/models/user.model";
import UserEntity from "../../domain/entities/user.entity";
import UserMapper from "../mappers/user.mapper";

@injectable()
class UserRepository implements IUserRepository {
  constructor(@unmanaged() private readonly _User: Model<IUserDocument>) {}

  public async createUser(user: UserEntity): Promise<UserEntity> {
    const doc = new this._User(UserMapper.toDocument(user));
    console.log(doc);
    await doc.save();
    return UserMapper.toEntity(doc);
  }

  public async getUserByEmail(email: string): Promise<UserEntity | null> {
    const user = await this._User.findOne({ email });
    if (!user) return null;
    return UserMapper.toEntity(user);
  }

  public async getUserById(id: string): Promise<UserEntity | null> {
    const user = await this._User.findById(id);
    if (!user) return null;
    return UserMapper.toEntity(user);
  }
}

export default UserRepository;
