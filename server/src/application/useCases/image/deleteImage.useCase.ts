import { injectable } from "inversify";
import { IDeleteImageUseCase } from "../../interface/useCases/image/IDeleteImage.useCase";
import { inject } from "inversify";
import { IImageRepository } from "../../interface/repositories/IImage.repository";
import { TYPES } from "../../../infrastructure/container/types";

@injectable()
class DeleteImageUseCase implements IDeleteImageUseCase {
  constructor(
    @inject(TYPES.IImageRepository) private readonly _imageRepository: IImageRepository,
  ) {}

  /**
   * method to delete image
   * @param id 
   * @returns 
   */
  execute(id: string): Promise<void> {
    return this._imageRepository.deleteImage(id);
  }
}

export default DeleteImageUseCase;
