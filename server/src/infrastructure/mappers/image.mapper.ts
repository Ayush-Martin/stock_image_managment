import ImageEntity from "../../domain/entities/image.entity";
import { IImageDocument } from "../DB/Mongodb/models/image.model";

class ImageMapper {
  static toEntity(doc: IImageDocument): ImageEntity {
    return new ImageEntity(String(doc.userId), doc.id, doc.url, doc.title, doc.order);
  }

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
