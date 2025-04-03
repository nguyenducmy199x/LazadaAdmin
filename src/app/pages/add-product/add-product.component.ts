import {Component} from '@angular/core';

import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {AddProductContentComponent} from '../../components/add-product-content/add-product-content.component';
import {HeaderComponent} from '../../components/header/header.component';
import {SideMenuComponent} from '../../components/side-menu/side-menu.component';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  standalone: true,
  imports: [
    HttpClientModule,
    FormsModule,
    HeaderComponent,
    SideMenuComponent,
    AddProductContentComponent
  ],
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent {
}
