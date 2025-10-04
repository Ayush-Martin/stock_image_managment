import { inject } from "inversify";
import { TYPES } from "../../../infrastructure/container/types";
import { IImageRepository } from "../../interface/repositories/IImage.repository";
import { IRearrangeImageUseCase } from "../../interface/useCases/image/IRearrangeImage.useCase";
import { RearrangeImagesDTO } from "../../DTO/image.dto";
import ImageEntity from "../../../domain/entities/image.entity";
import { injectable } from "inversify";

@injectable()
class RearrangeImageUseCase implements IRearrangeImageUseCase {
  constructor(
    @inject(TYPES.IImageRepository) private readonly _imageRepository: IImageRepository,
  ) {}

  /**
   * method to rearrange images
   * @param rearrangeImageDTO 
   */
  public async execute(rearrangeImageDTO: RearrangeImagesDTO): Promise<void> {
    const imageEntities = rearrangeImageDTO.images.map(
      (image) => new ImageEntity("", image.id, "", "", image.order),
    );
    await this._imageRepository.rearrangeImages(imageEntities);
  }
}

export default RearrangeImageUseCase;
