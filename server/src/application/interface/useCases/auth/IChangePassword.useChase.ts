import { ChangePasswordDTO } from "../../../DTO/user.dto";

export interface IChangePasswordUseCase {
  execute(id: string, changePasswordDTO: ChangePasswordDTO): Promise<void>;
}
