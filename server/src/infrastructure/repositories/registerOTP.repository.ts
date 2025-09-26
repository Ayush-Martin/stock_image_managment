import { unmanaged } from "inversify";
import { IRegisterOTPRepository } from "../../application/interface/repositories/IRegisterOTP.repository";
import RegisterOTPEntity from "../../domain/entities/registerOTP.entity";
import OTPRepository from "./OTP.repository";
import { Model } from "mongoose";
import { IOTPDocument } from "../DB/Mongodb/models/otp.model";
import RegisterOTPMapper from "../mappers/registerOTP.mapper";

class RegisterOTPRepository extends OTPRepository implements IRegisterOTPRepository {
  constructor(@unmanaged() private readonly _OTP: Model<IOTPDocument>) {
    super(_OTP);
  }

  public async createOTP(entity: RegisterOTPEntity): Promise<RegisterOTPEntity> {
    const doc = new this._OTP(RegisterOTPMapper.toDocument(entity));
    await doc.save();
    return RegisterOTPMapper.toEntity(doc);
  }

  public async getRegisterOTPByEmail(email: string): Promise<RegisterOTPEntity | null> {
    const data = await this._OTP.findOne({ email });
    if (!data) return null;
    return RegisterOTPMapper.toEntity(data);
  }
}

export default RegisterOTPRepository;
