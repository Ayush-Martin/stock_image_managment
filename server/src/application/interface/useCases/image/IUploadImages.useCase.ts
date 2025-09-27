import ImageEntity from "../../../../domain/entities/image.entity";
import { UploadImageDTO } from "../../../DTO/image.dto";

export interface IUploadImagesUseCase {
  execute(userId: string, uploadImageDTO: UploadImageDTO): Promise<Array<ImageEntity>>;
}
