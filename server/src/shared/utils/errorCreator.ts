import { StatusCodes } from "../constants/statusCodes";
import { IAppError } from "../types/appError.type";

/**
 * Creates an instance of IAppError with the given message and status code.
 *
 * @param {string} message - The error message.
 * @param {number} [status=StatusCodes.INTERNAL_SERVER_ERROR] - The status code of the error.
 * @returns {IApError} - The created IAppError instance.
 */
const errorCreator = (
  message: string,
  status: number = StatusCodes.INTERNAL_SERVER_ERROR,
): IAppError => {
  const err: IAppError = new Error(message) as IAppError;
  err.status = status;
  return err;
};

export default errorCreator;
