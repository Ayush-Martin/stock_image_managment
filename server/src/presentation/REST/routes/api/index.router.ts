import { Router } from "express";
import authRouter from "./auth.router";
import { authMiddleware } from "../../../../infrastructure/container/DI";

const apiRouter = Router();

apiRouter.use("/auth", authRouter);

apiRouter.get("/home", authMiddleware.accessTokenValidator, (req, res) => {
  res.send("home");
});

export default apiRouter;
