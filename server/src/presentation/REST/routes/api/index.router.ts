import { Router } from "express";

const apiRouter = Router();

apiRouter.get("/", (req, res) => {
  res.send("API is running");
});

export default apiRouter;
