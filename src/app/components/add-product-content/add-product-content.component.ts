import { Component } from '@angular/core';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {Router} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {SideMenuComponent} from '../side-menu/side-menu.component';
import {Product} from '../../models/product';

@Component({
  selector: 'app-add-product-content',
  imports: [
    HttpClientModule,
    FormsModule
  ],
  templateUrl: './add-product-content.component.html',
  styleUrl: './add-product-content.component.css'
})
export class AddProductContentComponent {
  category: string | undefined;
  title: string | undefined;
  price: string | undefined;
  describe: string | undefined;
  image: File | undefined;

  addProductUrl = "http://localhost:8081/api/v1/product/add-product";
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
    }
    if (this.image) {
      formData.append('image', this.image, this.image.name); // `image` là key, và tên file sẽ là tên của file thực tế
    }else {
      console.log('No image selected');
    }

    this.httpClient.post(this.addProductUrl, formData, httpOptions).subscribe({
      next: (res: any) => {
        console.log(res);
        console.log("Product added successfully.");
      },
      error: (error) => {
        console.error('There was an error!', error);
      }
    });
  }

}
function isTokenExpired(token: string): boolean {
  const payload = JSON.parse(atob(token.split('.')[1])); // Giải mã payload
  const exp = payload.exp * 1000; // Chuyển exp thành timestamp (milliseconds)
  return Date.now() >= exp;
}
