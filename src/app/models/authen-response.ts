export class AuthenResponse {
  token: string;
  code: string;
  status: string | undefined

  constructor(private res: any) {
    this.code = res.code;
    this.token = res.token;
    this.status = res.status;
  }

  get getJwtToken():string{
    return <string>this.token;
  }

}
