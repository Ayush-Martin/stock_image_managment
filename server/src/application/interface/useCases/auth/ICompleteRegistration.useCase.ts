import { CompleteRegistrationDTO } from "../../../DTO/user.dto";

export interface ICompleteRegistrationUseCase {
  execute(completeRegistrationDTO: CompleteRegistrationDTO): Promise<void>;
}
