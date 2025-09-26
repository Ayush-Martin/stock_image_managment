import { Schema, model, Document } from "mongoose";

export interface IRefreshTokenDocument extends Document {
  refreshToken: string;
}

const RefreshTokenSchema = new Schema<IRefreshTokenDocument>(
  {
    refreshToken: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

export default model<IRefreshTokenDocument>("refreshToken", RefreshTokenSchema);
