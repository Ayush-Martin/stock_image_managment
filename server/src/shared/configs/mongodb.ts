import mongoose from "mongoose";
import { envConfig } from "./env";

export const connectToMongodb = async () => {
  await mongoose.connect(envConfig.MONGODB_URI);

  console.log("[Database] connected to mongodb");
};
