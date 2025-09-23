export interface IAppError extends Error {
  status?: number | string;
}
