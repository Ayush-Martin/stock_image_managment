import { inject } from "inversify";
import { injectable } from "inversify";
import { TYPES } from "../../../infrastructure/container/types";
import { Request, Response, NextFunction, Express } from "express";
import { IUploadImagesUseCase } from "../../../application/interface/useCases/image/IUploadImages.useCase";
import { ImageResponseMessage } from "../../../shared/constants/responseMessages";
import { StatusCodes } from "../../../shared/constants/statusCodes";
import { successResponse } from "../../../shared/utils/responseCreator";
import errorCreator from "../../../shared/utils/errorCreator";
import { binder } from "../../../shared/utils/binder";
import { IEditImageUseCase } from "../../../application/interface/useCases/image/IEditImage.useCase";
import { IEditImageTitleUseCase } from "../../../application/interface/useCases/image/IEditImageTitle.useCase";
import { IDeleteImageUseCase } from "../../../application/interface/useCases/image/IDeleteImage.useCase";
import { EditImageTitleSchema, RearrangeImagesSchema } from "../../../application/DTO/image.dto";
import { IRearrangeImageUseCase } from "../../../application/interface/useCases/image/IRearrangeImage.useCase";
import { IGetImagesUseCase } from "../../../application/interface/useCases/image/IGetImages.useCase";

@injectable()
class ImageController {
  constructor(
    @inject(TYPES.IUploadImagesUseCase) private _uploadImageUseCase: IUploadImagesUseCase,
    @inject(TYPES.IEditImageUseCase) private _editImageUseCase: IEditImageUseCase,
    @inject(TYPES.IEditImageTitleUseCase) private _editImageTitleUseCase: IEditImageTitleUseCase,
    @inject(TYPES.IRearrangeImageUseCase) private _rearrangeImageUseCase: IRearrangeImageUseCase,
    @inject(TYPES.IDeleteImageUseCase) private _deleteImageUseCase: IDeleteImageUseCase,
    @inject(TYPES.IGEtImagesUseCase) private _getImagesUseCase: IGetImagesUseCase,
  ) {
    binder(this);
  }

  /**
   * method to bulk upload images
   * @param req 
   * @param res 
   * @param next 
   */
  public async uploadImages(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const files = req.files as Express.Multer.File[] | undefined;
      const userId = req.userId!;

      if (!files) {
        throw errorCreator(ImageResponseMessage.NoImagesUploaded, StatusCodes.BAD_REQUEST);
      }

      const uploadImagesDTO = {
        images: files?.map((file) => ({ url: file.path, title: file.originalname })),
      };

      const images = await this._uploadImageUseCase.execute(userId, uploadImagesDTO);

      res
        .status(StatusCodes.CREATED)
        .json(
          successResponse(
            files.length > 1
              ? ImageResponseMessage.ImagesUploaded
              : ImageResponseMessage.ImageUploaded,
            images,
          ),
        );
    } catch (err) {
      next(err);
    }
  }

  /**
   * method to edit image title
   * @param req 
   * @param res 
   * @param next 
   */
  public async editImageTitle(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const editImageTitleDTO = EditImageTitleSchema.parse(req.body);
      const { imageId } = req.params;

      const result = await this._editImageTitleUseCase.execute(imageId, editImageTitleDTO);

      if (!result) {
        throw errorCreator(ImageResponseMessage.ImageNotFound, StatusCodes.NOT_FOUND);
      }

      res
        .status(StatusCodes.OK)
        .json(successResponse(ImageResponseMessage.ImageTitleUpdated, result));
    } catch (err) {
      next(err);
    }
  }

  /**
   * method to edit image file
   * @param req 
   * @param res 
   * @param next 
   */
  public async editImage(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const file = req.file as Express.Multer.File | undefined;
      const { imageId } = req.params;

      if (!file) {
        throw errorCreator(ImageResponseMessage.NoImagesUploaded, StatusCodes.BAD_REQUEST);
      }

      const result = await this._editImageUseCase.execute(imageId, { url: file.path });

      res.status(StatusCodes.OK).json(successResponse(ImageResponseMessage.ImageUpdated, result));
    } catch (err) {
      next(err);
    }
  }

  /**
   * method to rearrange images / change image order
   * @param req 
   * @param res 
   * @param next 
   */
  public async rearrangeImage(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const rearrangeImageDTO = RearrangeImagesSchema.parse(req.body);

      const result = await this._rearrangeImageUseCase.execute(rearrangeImageDTO);

      res
        .status(StatusCodes.OK)
        .json(successResponse(ImageResponseMessage.ImageRearranged, result));
    } catch (err) {
      next(err);
    }
  }

  /**
   * method to delete image
   * @param req 
   * @param res 
   * @param next 
   */
  public async deleteImage(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { imageId } = req.params;
      const result = await this._deleteImageUseCase.execute(imageId);

      res.status(StatusCodes.OK).json(successResponse(ImageResponseMessage.ImageDeleted, result));
    } catch (err) {
      next(err);
    }
  }

  /**
   * method to get images
   * @param req 
   * @param res 
   * @param next 
   */
  public async getImages(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = req.userId!;

      const result = await this._getImagesUseCase.execute(userId);

      res.status(StatusCodes.OK).json(successResponse(ImageResponseMessage.ImagesFetched, result));
    } catch (err) {
      next(err);
    }
  }
}

export default ImageController;
