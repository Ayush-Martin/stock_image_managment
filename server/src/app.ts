import { Application } from "express";
import express from "express";
import dotenv from "dotenv";
import cors from "./shared/configs/cors";
import morgan from "morgan";
import apiRouter from "./presentation/REST/routes/api/index.router";

class App {
  public app: Application;

  constructor() {
    dotenv.config();
    this.app = express();
    this.app.use(express.json());
    this.app.use(cors);
    this.app.use(morgan("dev"));
    this.app.use("/api", apiRouter);
  }
}

export default App;
