import UserEntity from "../../../domain/entities/user.entity";

export interface IUserRepository {
  createUser(user: UserEntity): Promise<UserEntity>;
  getUserByEmail(email: string): Promise<UserEntity | null>;
}
