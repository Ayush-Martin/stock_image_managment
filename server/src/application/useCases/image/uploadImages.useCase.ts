import { inject, injectable } from "inversify";
import { TYPES } from "../../../infrastructure/container/types";
import { IImageRepository } from "../../interface/repositories/IImage.repository";
import ImageEntity from "../../../domain/entities/image.entity";
import { UploadImageDTO } from "../../DTO/image.dto";
import { IUploadImagesUseCase } from "../../interface/useCases/image/IUploadImages.useCase";

@injectable()
class UploadImagesUseCase implements IUploadImagesUseCase {
  constructor(
    @inject(TYPES.IImageRepository) private readonly _imageRepository: IImageRepository,
  ) {}

  public async execute(
    userId: string,
    uploadImageDTO: UploadImageDTO,
  ): Promise<Array<ImageEntity>> {
    const lastImage = await this._imageRepository.getLastImage();

    let startOrder = 0;

    if (lastImage) startOrder = lastImage.order + 1;

    const images = uploadImageDTO.images.map((imageEntity) => {
      return new ImageEntity(userId, "", imageEntity.url, imageEntity.title, startOrder++);
    });

    const result = await this._imageRepository.addImages(images);
    return result;
  }
}

export default UploadImagesUseCase;
