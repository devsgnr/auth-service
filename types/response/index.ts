export interface WTResponse<T> {
  data?: T | null;
  message: string;
  success: boolean;
}

// WTAtuhResponse extends WTResponse default property
// and adds `token`
export interface WTAuthResponse<T> extends WTResponse<T> {
  token: string;
}
