import { Component } from '@angular/core';
import {Product} from "../../models/product";
import {FormGroup, FormsModule} from "@angular/forms";
import {HttpClient, HttpClientModule, HttpHeaders} from "@angular/common/http";
import {HeaderComponent} from '../../components/header/header.component';
import {SideMenuComponent} from '../../components/side-menu/side-menu.component';
import {Router} from '@angular/router';
import {BaseResponse} from '../../models/base-response';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css'],
  standalone: true,
  imports: [
    HttpClientModule,
    SideMenuComponent,
    FormsModule
  ]
})
export class EditProductComponent {
  category: string | undefined;
  title: string | undefined;
  price: string | undefined;
  describe: string | undefined;
  image: File | undefined;
  baseResponse: BaseResponse<any> | null | undefined;
  public loginwarning: string | null | undefined;

  addProductUrl = "http://localhost:8081/api/v1/product/edit-product";
  constructor(private httpClient : HttpClient, private router : Router) {
  }
  public onFileChanged(event:any) {
    //Select File
    this.image = event.target.files[0];
    console.log(this.image);
  }
  onSubmit() {
    console.log(this.category);
    const token = sessionStorage.getItem('access_token');
    if (token && isTokenExpired(token)) {
      console.log('Token expired. Redirecting to login...');
      sessionStorage.removeItem('access_token'); // Xóa token hết hạn
      this.router.navigate(['/login']);
    }

    const httpOptions = {
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    };
    const productDto = new Product(this.category!, this.title!, this.price!, this.describe!);
    const formData = new FormData();
    // Append đối tượng productDto vào formData
    formData.append('productDto', new Blob([JSON.stringify(productDto)], { type: 'application/json' }));

    if (this.image) {
      formData.append('image', this.image, this.image.name); // `image` là key, và tên file sẽ là tên của file thực tế
    }else {
      console.log('No image selected');
    }
    this.httpClient.post<BaseResponse<any>>(this.addProductUrl, formData, httpOptions).subscribe(
      (res: BaseResponse<any>) => {
        this.baseResponse = res;
        console.log(this.baseResponse);
        this.router.navigate(['home']);
      },
      (error) => {
        console.error('Error:', error);
        this.loginwarning = 'add product fail';
      }
    );

  }

}
function isTokenExpired(token: string): boolean {
  const payload = JSON.parse(atob(token.split('.')[1])); // Giải mã payload
  const exp = payload.exp * 1000; // Chuyển exp thành timestamp (milliseconds)
  return Date.now() >= exp;
}
