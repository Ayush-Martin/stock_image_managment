import { ResetOtpDTO } from "../../../DTO/otp.dto";

export interface IResetOTPUseCase {
  execute(resetOtpDTO: ResetOtpDTO): Promise<void>;
}
