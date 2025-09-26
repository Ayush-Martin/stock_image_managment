import { injectable, unmanaged } from "inversify";
import { IOTPRepository } from "../../application/interface/repositories/IOTP.repository";
import OTPEntity from "../../domain/entities/otp.entity";
import { Model } from "mongoose";
import { IOTPDocument } from "../DB/Mongodb/models/otp.model";
import OTPMapper from "../mappers/OTP.mapper";

@injectable()
class OTPRepository implements IOTPRepository {
  constructor(@unmanaged() private readonly _OTPModel: Model<IOTPDocument>) {}

  public async deleteOTPByEmail(email: string): Promise<void> {
    await this._OTPModel.deleteOne({ email });
  }

  public async getOTPByEmail(email: string): Promise<OTPEntity | null> {
    const data = await this._OTPModel.findOne({ email }).sort({ createdAt: -1 });
    if (!data) return null;
    return OTPMapper.toEntity(data);
  }

  public async verifyOTP(email: string): Promise<void> {
    await this._OTPModel.updateOne({ email }, { isVerified: true });
  }

  public async updateOTP(email: string, otp: string, expiresAt: Date): Promise<OTPEntity | null> {
    const data = await this._OTPModel.findOneAndUpdate(
      { email: email },
      { OTP: otp, expiresAt },
      { new: true },
    );
    if (!data) return null;
    return OTPMapper.toEntity(data);
  }

  public async createOTP(entity: OTPEntity): Promise<OTPEntity> {
    const doc = new this._OTPModel(OTPMapper.toDocument(entity));
    await doc.save();
    return OTPMapper.toEntity(doc);
  }
}

export default OTPRepository;
