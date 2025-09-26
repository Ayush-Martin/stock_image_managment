import userValidationRules from "../../shared/validation/validationRule/userValidationRules";

class Password {
  public readonly value: string;

  constructor(password: string) {
    this.value = userValidationRules.Password.parse(password);
  }
}

export default Password;
