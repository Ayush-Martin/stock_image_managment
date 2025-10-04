import { unmanaged } from "inversify";
import { injectable } from "inversify";
import { Model } from "mongoose";
import { IImageDocument } from "../DB/Mongodb/models/image.model";
import { IImageRepository } from "../../application/interface/repositories/IImage.repository";
import ImageEntity from "../../domain/entities/image.entity";
import ImageMapper from "../mappers/image.mapper";

@injectable()
class ImageRepository implements IImageRepository {
  constructor(@unmanaged() private readonly _Image: Model<IImageDocument>) {}

  /**
   * method to add images
   * @param imageEntities
   * @returns
   */
  public async addImages(imageEntities: Array<ImageEntity>): Promise<Array<ImageEntity>> {
    const docs = imageEntities.map((imageEntity) => ImageMapper.toDoc(imageEntity));
    const result = await this._Image.insertMany(docs);
    return result.map((doc) => ImageMapper.toEntity(doc as unknown as IImageDocument));
  }

  /**
   * method to get last image
   * @returns
   */
  public async getLastImage(): Promise<ImageEntity | null> {
    const doc = await this._Image.findOne().sort({ order: -1 });
    if (!doc) return null;
    return ImageMapper.toEntity(doc);
  }

  /**
   * method to edit image title
   * @param id 
   * @param title new title
   * @returns
   */
  public async editImageTitle(id: string, title: string): Promise<ImageEntity | null> {
    const doc = await this._Image.findOneAndUpdate({ _id: id }, { title }, { new: true });
    if (!doc) return null;
    return ImageMapper.toEntity(doc);
  }

  /**
   * method to edit image url
   * @param id
   * @param url new url
   * @returns
   */
  public async editImageUrl(id: string, url: string): Promise<ImageEntity | null> {
    const doc = await this._Image.findOneAndUpdate({ _id: id }, { url }, { new: true });
    if (!doc) return null;
    return ImageMapper.toEntity(doc);
  }

  /**
   * method to rearrange images
   * @param imageEntities
   */
  public async rearrangeImages(imageEntities: Array<ImageEntity>): Promise<void> {
    await this._Image.bulkWrite(
      imageEntities.map((image) => ({
        updateOne: { filter: { _id: image.id }, update: { order: image.order } },
      })),
    );
  }

  /**
   * method to delete image
   * @param id
   */
  public async deleteImage(id: string): Promise<void> {
    await this._Image.deleteOne({ _id: id });
  }

  /**
   * method to find images by userId
   * @param userId
   * @returns
   */
  public async findImagesByUserId(userId: string): Promise<Array<ImageEntity>> {
    const docs = await this._Image.find({ userId });
    return docs.map((doc) => ImageMapper.toEntity(doc));
  }
}

export default ImageRepository;
