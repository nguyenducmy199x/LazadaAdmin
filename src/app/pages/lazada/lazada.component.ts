import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { ProductComponent } from '../../components/product/product.component';
import { HeaderComponent } from '../../components/header/header.component';
import { SideMenuComponent } from '../../components/side-menu/side-menu.component';
import { BannerComponent } from "../../components/banner/banner.component";
import { SearchComponent } from "../../components/search/search.component";

@Component({
  selector: 'app-lazada',
  templateUrl: './lazada.component.html',
  styleUrl: './lazada.component.css',
  standalone: true,
  imports: [CommonModule, HttpClientModule, HeaderComponent, SideMenuComponent, BannerComponent, ProductComponent]
})
export class LazadaComponent {

}
