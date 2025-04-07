import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { ProductComponent } from '../../components/product/product.component';
import { HeaderComponent } from '../../components/header/header.component';
import { BannerComponent } from "../../components/banner/banner.component";
import { SideMenuLazadaComponent } from "../../components/side-menu-lazada/side-menu-lazada.component";

@Component({
  selector: 'app-lazada',
  templateUrl: './lazada.component.html',
  styleUrl: './lazada.component.css',
  standalone: true,
  imports: [CommonModule, HttpClientModule, HeaderComponent, BannerComponent, ProductComponent, SideMenuLazadaComponent]
})
export class LazadaComponent {

}
