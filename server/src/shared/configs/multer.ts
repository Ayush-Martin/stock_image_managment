import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import path from "path";
import { envConfig } from "./env";

cloudinary.config({
  cloud_name: envConfig.CLOUDINARY_CLOUD_NAME,
  api_key: envConfig.CLOUDINARY_API_KEY,
  api_secret: envConfig.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    let folder = "stock_image_management/images";
    let resourceType = "image";

    return {
      folder,
      resource_type: resourceType,
      public_id: `${Date.now()}-${Math.round(
        Math.random() * 1e9,
      )}${path.extname(file.originalname)}`,
      allowed_formats: ["jpg", "jpeg", "png"],
    };
  },
});

const upload = multer({ storage });

export default upload;
