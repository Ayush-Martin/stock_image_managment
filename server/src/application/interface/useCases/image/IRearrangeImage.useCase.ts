import { RearrangeImagesDTO } from "../../../DTO/image.dto";

export interface IRearrangeImageUseCase {
  execute(rearrangeImageDTO: RearrangeImagesDTO): Promise<void>;
}
