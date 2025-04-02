import {Component} from '@angular/core';

import {FormGroup, FormsModule} from "@angular/forms";
import {HttpClient, HttpClientModule, HttpHeaders} from "@angular/common/http";
import {HeaderComponent} from '../../components/header/header.component';
import {SideMenuComponent} from '../../components/side-menu/side-menu.component';
import {Product} from '../../models/product';
import {CommonModule} from '@angular/common';
import {Router} from '@angular/router';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  standalone: true,
  imports: [
    HttpClientModule,
    HeaderComponent,
    SideMenuComponent,
    FormsModule
  ],
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent {
  product: Product | undefined
  category: string | undefined
  title: string | undefined
  price: string | undefined
  describe: string | undefined
  image: File | undefined ;
  form: FormGroup | undefined;

  addProductUrl = "http://localhost:8082/api/v1/product/add-product";
  constructor(private httpClient : HttpClient, private router : Router) {
  }
  public onFileChanged(event:any) {
    //Select File
    this.image = event.target.files[0];
    console.log(this.image);
  }
  onSubmit() {
    console.log(this.category);
    const httpOptions = {
      headers: new HttpHeaders({'encrypt': 'multipart/form-data'})
    }
    const productRequest: // @ts-ignore
      Product = new Product(this.category, this.title, this.price, this.describe);
    let json = JSON.stringify(productRequest);
    let formParams = new FormData();
    // @ts-ignore
    formParams.append('file', this.image)
    // @ts-ignore
    formParams.append('body', json);
    this.httpClient.post(this.addProductUrl, formParams, httpOptions).subscribe((res:any)=>{
      console.log(res);
      console.log("afafgasfasfas")
    });
  }

}
