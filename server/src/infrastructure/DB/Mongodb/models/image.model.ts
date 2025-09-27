import mongoose, { Document, model, Schema, ObjectId } from "mongoose";

export interface IImageDocument extends Document {
  userId: ObjectId;
  url: string;
  title: string;
  order: number;
}

const ImageSchema = new Schema<IImageDocument>(
  {
    userId: { type: mongoose.Types.ObjectId, required: true, ref: "user" },
    url: { type: String, required: true },
    title: { type: String, required: true },
    order: { type: Number, required: true },
  },
  { timestamps: true },
);

export default model<IImageDocument>("Image", ImageSchema);
