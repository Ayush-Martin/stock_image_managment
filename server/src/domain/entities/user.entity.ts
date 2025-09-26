import Email from "../valueObjects/email.vo";
import Password from "../valueObjects/password.vo";
import Username from "../valueObjects/username.vo";

class UserEntity {
  constructor(
    public readonly id: string,
    public username: Username,
    public email: Email,
    public password: Password,
  ) {}
}

export default UserEntity;
