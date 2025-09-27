import ImageEntity from "../../../../domain/entities/image.entity";
import { EditImageTitleDTO } from "../../../DTO/image.dto";

export interface IEditImageTitleUseCase {
  execute(id: string, editImageTitleDTO: EditImageTitleDTO): Promise<ImageEntity | void>;
}
