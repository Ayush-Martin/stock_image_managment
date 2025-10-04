import OTPEntity from "../../domain/entities/otp.entity";
import Email from "../../domain/valueObjects/email.vo";
import OTP from "../../domain/valueObjects/otp.vo";
import { IOTPDocument } from "../DB/Mongodb/models/otp.model";

class OTPMapper {
  /**
   * method to map OTPDocument to OTPEntity
   * @param doc 
   * @returns 
   */
  static toEntity(doc: IOTPDocument) {
    return new OTPEntity(
      doc.id,
      new OTP(doc.OTP),
      new Email(doc.email),
      doc.isVerified,
      doc.expiresAt,
    );
  }

  /**
   * method to map OTPEntity to OTPDocument
   * @param entity 
   * @returns 
   */
  static toDocument(entity: OTPEntity) {
    return {
      id: entity.id,
      OTP: entity.OTP.value,
      email: entity.email.value,
      isVerified: entity.isVerified,
      expiresAt: entity.expiresAt,
    };
  }
}

export default OTPMapper;
