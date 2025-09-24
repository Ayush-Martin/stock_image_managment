import userValidationRules from "../../shared/validation/validationRule/userValidationRules";

class Email {
  public readonly value: string;

  constructor(email: string) {
    this.value = userValidationRules.Email.parse(email);
  }
}

export default Email;
