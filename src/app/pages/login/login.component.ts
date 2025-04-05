import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {AuthenResponse} from "../../models/authen-response";
import {Router} from "@angular/router";
import {Authen} from '../../models/authen';
import {FormsModule} from '@angular/forms';
import { environment } from '../../environments/environment';

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
  public authenticateUrl: string =  environment.apiUrl + "/v1/authen/login";

  constructor(private http: HttpClient, private router: Router) {
  }


  ngOnInit(): void {
  }

  public onSubmit() {
    const authen: Authen = new Authen(this.username, this.password);
    // @ts-ignore
    this.http.post(this.authenticateUrl, authen).subscribe((res: AuthenResponse) => {
      this.authenResponse = new AuthenResponse(res);
      sessionStorage.setItem('access_token', this.authenResponse.getJwtToken());
      if (this.authenResponse.code === '200') {
        this.router.navigate(['home']);
      }else{
        this.router.navigate(['login'])
        this.loginwarning = 'Login Failed , Please try again';
      }
    });
  }
}
