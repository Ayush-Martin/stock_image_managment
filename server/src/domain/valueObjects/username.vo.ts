import userValidationRules from "../../shared/validation/validationRule/userValidationRules";

class Username {
  public readonly value: string;

  constructor(username: string) {
    this.value = userValidationRules.Username.parse(username);
  }
}

export default Username;
