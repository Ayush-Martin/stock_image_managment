import { ResetPasswordDTO } from "../../../DTO/user.dto";

export interface IResetPasswordUseCase {
  execute(resetPasswordDTO: ResetPasswordDTO): Promise<void>;
}
