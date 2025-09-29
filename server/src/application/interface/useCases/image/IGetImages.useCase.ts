import ImageEntity from "../../../../domain/entities/image.entity";

export interface IGetImagesUseCase {
  execute(userId: string): Promise<ImageEntity[]>;
}
