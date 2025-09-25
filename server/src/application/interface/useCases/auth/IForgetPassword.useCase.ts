import { ForgetPasswordDTO } from "../../../DTO/user.dto";

export interface IForgetPasswordUseCase {
  execute(forgetPasswordDTO: ForgetPasswordDTO): Promise<void>;
}
