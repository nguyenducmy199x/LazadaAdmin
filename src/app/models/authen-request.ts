export class AuthenRequest {
  constructor(
    public username: string | undefined,
    public password: string | undefined
  ) {}
}
