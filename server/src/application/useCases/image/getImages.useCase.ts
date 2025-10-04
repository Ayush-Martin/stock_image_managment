import { inject, injectable } from "inversify";
import { IGetImagesUseCase } from "../../interface/useCases/image/IGetImages.useCase";
import { TYPES } from "../../../infrastructure/container/types";
import { IImageRepository } from "../../interface/repositories/IImage.repository";
import ImageEntity from "../../../domain/entities/image.entity";

@injectable()
class GetImagesUseCase implements IGetImagesUseCase {
  constructor(
    @inject(TYPES.IImageRepository) private readonly _imageRepository: IImageRepository,
  ) {}

  /**
   * method to get images
   * @param userId 
   * @returns 
   */
  public async execute(userId: string): Promise<ImageEntity[]> {
    return await this._imageRepository.findImagesByUserId(userId);
  }
}

export default GetImagesUseCase;
