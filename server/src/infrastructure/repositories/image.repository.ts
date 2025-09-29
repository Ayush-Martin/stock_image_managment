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

  public async addImages(imageEntities: Array<ImageEntity>): Promise<Array<ImageEntity>> {
    const docs = imageEntities.map((imageEntity) => ImageMapper.toDoc(imageEntity));
    const result = await this._Image.insertMany(docs);
    return result.map((doc) => ImageMapper.toEntity(doc as unknown as IImageDocument));
  }

  public async getLastImage(): Promise<ImageEntity | null> {
    const doc = await this._Image.findOne().sort({ order: -1 });
    if (!doc) return null;
    return ImageMapper.toEntity(doc);
  }

  public async editImageTitle(id: string, title: string): Promise<ImageEntity | null> {
    const doc = await this._Image.findOneAndUpdate({ _id: id }, { title }, { new: true });
    if (!doc) return null;
    return ImageMapper.toEntity(doc);
  }

  public async editImageUrl(id: string, url: string): Promise<ImageEntity | null> {
    const doc = await this._Image.findOneAndUpdate({ _id: id }, { url }, { new: true });
    if (!doc) return null;
    return ImageMapper.toEntity(doc);
  }

  public async rearrangeImages(imageEntities: Array<ImageEntity>): Promise<void> {
    await this._Image.bulkWrite(
      imageEntities.map((image) => ({
        updateOne: { filter: { _id: image.id }, update: { order: image.order } },
      })),
    );
  }

  public async deleteImage(id: string): Promise<void> {
    await this._Image.deleteOne({ _id: id });
  }

  public async findImagesByUserId(userId: string): Promise<Array<ImageEntity>> {
    const docs = await this._Image.find({ userId });
    return docs.map((doc) => ImageMapper.toEntity(doc));
  }
}

export default ImageRepository;
