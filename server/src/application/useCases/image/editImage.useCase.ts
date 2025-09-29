import { inject, injectable } from "inversify";
import { TYPES } from "../../../infrastructure/container/types";
import { IImageRepository } from "../../interface/repositories/IImage.repository";
import { IEditImageUseCase } from "../../interface/useCases/image/IEditImage.useCase";
import ImageEntity from "../../../domain/entities/image.entity";
import { EditImageDTO } from "../../DTO/image.dto";
import errorCreator from "../../../shared/utils/errorCreator";
import { ImageResponseMessage } from "../../../shared/constants/responseMessages";
import { StatusCodes } from "../../../shared/constants/statusCodes";

@injectable()
class EditImageUseCase implements IEditImageUseCase {
  constructor(
    @inject(TYPES.IImageRepository) private readonly _imageRepository: IImageRepository,
  ) {}

  public async execute(id: string, editImageDTO: EditImageDTO): Promise<ImageEntity> {
    const result = await this._imageRepository.editImageUrl(id, editImageDTO.url);
    if (!result) {
      throw errorCreator(ImageResponseMessage.ImageNotFound, StatusCodes.NOT_FOUND);
    }

    return result;
  }
}

export default EditImageUseCase;
