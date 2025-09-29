import ImageEntity from "../../../domain/entities/image.entity";

export interface IImageRepository {
  addImages(imageEntities: Array<ImageEntity>): Promise<Array<ImageEntity>>;
  getLastImage(): Promise<ImageEntity | null>;
  editImageTitle(id: string, title: string): Promise<ImageEntity | null>;
  editImageUrl(id: string, url: string): Promise<ImageEntity | null>;
  rearrangeImages(imageEntities: Array<ImageEntity>): Promise<void>;
  deleteImage(id: string): Promise<void>;
  findImagesByUserId(userId: string): Promise<Array<ImageEntity>>;
}
