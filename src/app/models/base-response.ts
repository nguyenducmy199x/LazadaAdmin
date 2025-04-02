export class BaseResponse<T> {
  code: string;
  status: string;
  data: T;

  constructor(code: string, status: string, data: T) {
    this.code = code;
    this.status = status;
    this.data = data;
  }
}
