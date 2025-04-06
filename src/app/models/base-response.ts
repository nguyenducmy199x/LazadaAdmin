export interface BaseResponse<T> {
  code: string;
  status: string;
  data: T;
}
