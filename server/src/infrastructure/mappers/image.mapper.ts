import ImageEntity from "../../domain/entities/image.entity";
import { IImageDocument } from "../DB/Mongodb/models/image.model";

class ImageMapper {
  /**
   * method to map ImageDocument to ImageEntity
   * @param doc 
   * @returns 
   */
  static toEntity(doc: IImageDocument): ImageEntity {
    return new ImageEntity(String(doc.userId), doc.id, doc.url, doc.title, doc.order);
  }

  /**
   * method to map ImageEntity to ImageDocument
   * @param entity 
   * @returns 
   */
  static toDoc(entity: ImageEntity) {
    return {
      userId: entity.userId,
      url: entity.url,
      title: entity.title,
      order: entity.order,
    };
  }
}

export default ImageMapper;
