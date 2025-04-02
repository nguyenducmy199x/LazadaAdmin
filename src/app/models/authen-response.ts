export class AuthenResponse {
  token: string;
  code: string;
  status?: string;

  constructor(res: any) {  // Không cần private res
    this.code = res.code;
    this.token = res.token;
    this.status = res.status;
  }

  getJwtToken(): string {
    return this.token;  // Không cần ép kiểu <string>
  }
}

