import { injectable } from "inversify";
import { NextFunction, Request, Response } from "express";
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

  /**
   * method to handle errors
   * - if error is not zod error, return appropriate status code and message
   * - if error is zod error, return bad request status code and message
   * @param err 
   * @param req 
   * @param res 
   * @param _next 
   * @returns 
   */
  public handle(err: IAppError | z.ZodError, req: Request, res: Response, _next: NextFunction) {
    console.log(err);
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
