export class Authen {
  constructor(
    public username: string | undefined,
    public password: string | undefined
  ) {}
  get getUsername():string{
    return <string>this.username;
  }
  set setUsername(val:string){
    this.username=val;
  }

  get getPassword():string{
    return <string>this.password;
  }
  set setPassword(val:string){
    this.password=val;
  }
}
