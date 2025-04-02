import {Component, OnInit} from '@angular/core';


import {Staff} from '../../models/staff';
import {HttpServerServiceService} from '../../services/http-server-service.service';
import {CommonModule} from '@angular/common';
import {HeaderComponent} from '../../components/header/header.component';
import {SideMenuComponent} from '../../components/side-menu/side-menu.component';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {Router} from '@angular/router';
import {ProductComponent} from '../../components/product/product.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: true,
  imports: [CommonModule, HttpClientModule, SideMenuComponent, ProductComponent]
})
export class HomeComponent implements OnInit {
  //declare a variable to store api data
  staffs: Staff[] | null | undefined;
  name: string = "xzcz";
  public getStaffInfoUrl:string = "http://localhost:8080/staff-info";

  // declare constructor used
  constructor(private http: HttpClient, private router: Router) {
  }
  // body
  ngOnInit(): void {

    // this.httpServerService.getAll(this.getStaffInfoUrl).subscribe((res:any)=>{
    //     this.staffs = res;
    //     console.log(this.staffs);
    //
    // })
  };

}
