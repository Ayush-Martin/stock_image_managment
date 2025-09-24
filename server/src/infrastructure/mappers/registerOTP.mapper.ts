import RegisterOTPEntity from "../../domain/entities/registerOTP.entity";
import Email from "../../domain/valueObjects/email.vo";
import OTP from "../../domain/valueObjects/otp.vo";
import Password from "../../domain/valueObjects/password.vo";
import Username from "../../domain/valueObjects/username.vo";
import { IOTPDocument } from "../DB/Mongodb/models/otp.model";

class RegisterOTPMapper {
  static toEntity(doc: IOTPDocument): RegisterOTPEntity {
    return new RegisterOTPEntity(
      doc.id,
      new OTP(doc.OTP),
      new Email(doc.email),
      new Username(doc.username || ""),
      new Password(doc.password || ""),
      doc.isVerified,
    );
  }

  static toDocument(entity: RegisterOTPEntity): Partial<IOTPDocument> {
    return {
      OTP: entity.OTP.value,
      email: entity.email.value,
      username: entity.username.value,
      password: entity.password.value,
      isVerified: entity.isVerified,
    };
  }
}

export default RegisterOTPMapper;
