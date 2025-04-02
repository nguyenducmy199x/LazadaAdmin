import { Component } from '@angular/core';
import {Product} from "../../models/product";
import {FormGroup, FormsModule} from "@angular/forms";
import {HttpClient, HttpClientModule, HttpHeaders} from "@angular/common/http";
import {HeaderComponent} from '../../components/header/header.component';
import {SideMenuComponent} from '../../components/side-menu/side-menu.component';
import {Router} from '@angular/router';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css'],
  standalone: true,
  imports: [
    HttpClientModule,
    HeaderComponent,
    SideMenuComponent,
    FormsModule
  ]
})
export class EditProductComponent {

  product: Product | undefined
  category: string | undefined
  title: string | undefined
  price: string | undefined
  describe: string | undefined
  image: File | undefined ;

  addProductUrl = "http://localhost:8082/api/v1/product/edit-product";
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
    this.httpClient.patch(this.addProductUrl, formParams, httpOptions).subscribe((res:any)=>{
      console.log(res);
      console.log("afafgasfasfas")
    });
  }

}
