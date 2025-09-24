import { RegisterUserDTO } from "../../../DTO/user.dto";

export interface IRegisterUseCase {
  execute(registerUserDTO: RegisterUserDTO): Promise<void>;
}
