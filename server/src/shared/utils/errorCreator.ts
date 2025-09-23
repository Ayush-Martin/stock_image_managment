import { StatusCodes } from "../constants/statusCodes";
import { IAppError } from "../types/appError.type";

const errorCreator = (
  message: string,
  status: number = StatusCodes.INTERNAL_SERVER_ERROR,
): IAppError => {
  const err: IAppError = new Error(message) as IAppError;
  err.status = status;
  return err;
};

export default errorCreator;
