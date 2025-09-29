import { inject } from "inversify";
import { IEditImageTitleUseCase } from "../../interface/useCases/image/IEditImageTitle.useCase";
import { injectable } from "inversify";
import { TYPES } from "../../../infrastructure/container/types";
import { binder } from "../../../shared/utils/binder";
import ImageEntity from "../../../domain/entities/image.entity";
import { EditImageTitleDTO } from "../../DTO/image.dto";
import { IImageRepository } from "../../interface/repositories/IImage.repository";
import errorCreator from "../../../shared/utils/errorCreator";
import { ImageResponseMessage } from "../../../shared/constants/responseMessages";
import { StatusCodes } from "../../../shared/constants/statusCodes";

@injectable()
class EditImageTitleUseCase implements IEditImageTitleUseCase {
  constructor(@inject(TYPES.IImageRepository) private readonly _imageRepository: IImageRepository) {
    binder(this);
  }

  public async execute(
    id: string,
    editImageTitleDTO: EditImageTitleDTO,
  ): Promise<ImageEntity | void> {
    const result = await this._imageRepository.editImageTitle(id, editImageTitleDTO.title);

    if (!result) {
      throw errorCreator(ImageResponseMessage.ImageNotFound, StatusCodes.NOT_FOUND);
    }

    return result;
  }
}

export default EditImageTitleUseCase;
