import { VerifyOtpDTO } from "../../../DTO/otp.dto";

export interface IOTPVerificationUseCase {
  execute(verifyOtpDTO: VerifyOtpDTO): Promise<void>;
}
