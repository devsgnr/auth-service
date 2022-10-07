export interface IResponse<T> {
  data?: T | null;
  message: string;
  success: boolean;
}

export interface IAuthResponse<T> extends IResponse<T> {
  token: string;
}
