import { model, Document, Schema } from "mongoose";

export interface IUserDocument extends Document {
  username: string;
  email: string;
  password: string;
}

const userSchema = new Schema<IUserDocument>(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  { timestamps: true },
);

export default model<IUserDocument>("User", userSchema);
