import { injectable } from "inversify";
import { Request, Response } from "express";
import z from "zod";
import { StatusCodes } from "../../../shared/constants/statusCodes";
import { IAppError } from "../../../shared/types/appError.type";
import { binder } from "../../../shared/utils/binder";
import { errorResponse } from "../../../shared/utils/responseCreator";

@injectable()
class ErrorHandlerMiddleware {
  constructor() {
    binder(this);
  }

  public handle(err: IAppError | z.ZodError, req: Request, res: Response) {
    if (!(err instanceof z.ZodError)) {
      res
        .status(Number(err.status) || StatusCodes.INTERNAL_SERVER_ERROR)
        .json(errorResponse(err.message));
      return;
    }

    const zodErrors = err.issues.map((e) => e.message).join(", ");
    res.status(StatusCodes.BAD_REQUEST).json(errorResponse(`Validation failed: ${zodErrors}`));
  }
}

export default ErrorHandlerMiddleware;
