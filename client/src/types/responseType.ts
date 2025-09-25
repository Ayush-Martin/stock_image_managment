/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosError } from "axios";
import type { AxiosResponse } from "axios";

export interface IResponse {
  success: boolean;
  message: string;
  data?: any;
  error?: string;
}

export interface IApiResponseError extends AxiosError {
  response: AxiosResponse<IResponse>;
}
