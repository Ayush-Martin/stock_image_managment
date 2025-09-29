import { Router } from "express";
import { authMiddleware, imageController } from "../../../../infrastructure/container/DI";
import upload from "../../../../shared/configs/multer";

const userRouter = Router();

userRouter.use(authMiddleware.accessTokenValidator);

userRouter
  .route("/images")
  .get(imageController.getImages)
  .post(upload.array("images"), imageController.uploadImages);

userRouter
  .route("/images/:imageId")
  .delete(imageController.deleteImage)
  .patch(upload.single("image"), imageController.editImage);

userRouter.route("/images/:imageId/title").patch(imageController.editImageTitle);

export default userRouter;
