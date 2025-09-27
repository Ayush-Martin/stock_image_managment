import ImageEntity from "../../../../domain/entities/image.entity";
import { EditImageDTO } from "../../../DTO/image.dto";

export interface IEditImageUseCase {
  execute(id: string, editImageDTO: EditImageDTO): Promise<ImageEntity>;
}
