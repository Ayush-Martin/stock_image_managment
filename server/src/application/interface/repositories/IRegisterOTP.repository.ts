import RegisterOTPEntity from "../../../domain/entities/registerOTP.entity";
import { IOTPRepository } from "./IOTP.repository";

export interface IRegisterOTPRepository extends IOTPRepository {
  createOTP(entity: RegisterOTPEntity): Promise<RegisterOTPEntity>;
  getRegisterOTPByEmail(email: string): Promise<RegisterOTPEntity | null>;
}
