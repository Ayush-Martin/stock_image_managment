import { Router } from "express";
import authRouter from "./auth.router";
import { authMiddleware } from "../../../../infrastructure/container/DI";
import userRouter from "./user.router";

const apiRouter = Router();

apiRouter.use("/auth", authRouter);
apiRouter.use("/", userRouter);

apiRouter.get("/home", authMiddleware.accessTokenValidator, (req, res) => {
  res.send("home");
});

export default apiRouter;
