import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {AuthenResponse} from "../../models/authen-response";
import {Router} from "@angular/router";
import {Authen} from '../../models/authen';
import {HeaderComponent} from '../../components/header/header.component';
import {SideMenuComponent} from '../../components/side-menu/side-menu.component';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [
    FormsModule,
    HttpClientModule
  ]
})
export class LoginComponent implements OnInit {
  public username: string | undefined;
  public password: string | undefined;
  public response: string | null | undefined;
  public loginwarning: string | null | undefined;
  authenResponse: AuthenResponse | null | undefined;
  public authenticateUrl: string = "http://localhost:8081/api/v1/authen/login";

  constructor(private http: HttpClient, private router: Router) {
  }


  ngOnInit(): void {
  }

  public onSubmit() {
    const authen: Authen = new Authen(this.username, this.password);
    // @ts-ignore
    this.http.post(this.authenticateUrl, authen).subscribe((res: AuthenResponse) => {
      console.log(res);
      this.authenResponse = new AuthenResponse(res);
      console.log("object mapping result is - " + this.authenResponse.getJwtToken);
      console.log(this.authenResponse.code)
      if (this.authenResponse.code === '200') {
        this.router.navigate(['home']);
      }else{
        this.router.navigate(['login'])
        this.loginwarning = 'Login Failed , Please try again';
      }
    });
  }
}
