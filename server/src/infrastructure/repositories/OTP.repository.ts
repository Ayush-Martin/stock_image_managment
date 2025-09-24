import { injectable, unmanaged } from "inversify";
import { IOTPRepository } from "../../application/interface/repositories/IOTP.repository";
import OTPEntity from "../../domain/entities/otp.entity";
import { Model } from "mongoose";
import { IOTPDocument } from "../DB/Mongodb/models/otp.model";

@injectable()
class OTPRepository implements IOTPRepository {
  constructor(@unmanaged() private readonly _OTPModel: Model<IOTPDocument>) {}

  public async deleteOTPByEmail(email: string): Promise<void> {
    await this._OTPModel.deleteOne({ email });
  }

  public async getOTPByEmail(email: string): Promise<OTPEntity | null> {
    const data = await this._OTPModel.findOne({ email });
    if (!data) return null;
    return new OTPEntity(data.id, { value: data.OTP }, { value: data.email }, data.isVerified);
  }

  public async verifyOTP(email: string): Promise<void> {
    await this._OTPModel.updateOne({ email }, { isVerified: true });
  }
}

export default OTPRepository;
