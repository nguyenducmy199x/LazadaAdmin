import { Component } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

import { Product } from '../../models/product';
import { AlertComponent } from '../../services/alert/alert.component';
import { AlertService } from '../../services/alert/alert.service';

@Component({
  selector: 'app-add-product-content',
  standalone: true,
  imports: [
    CommonModule,
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
  warning: string | null | undefined;

  addProductUrl = "http://localhost:8081/api/v1/product/add-product";
  constructor(private httpClient: HttpClient, private router: Router,  private alertService: AlertService) {

  }

  public onFileChanged(event: any) {
    this.image = event.target.files[0];
  }

  onSubmit() {
    const token = sessionStorage.getItem('access_token');
    if (token && isTokenExpired(token)) {
      sessionStorage.removeItem('access_token');
      this.router.navigate(['/login']);
    }

    const httpOptions = {
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    };
    const productDto = new Product(this.category!, this.title!, this.price!, this.describe!);
    const formData = new FormData();
    formData.append('productDto', new Blob([JSON.stringify(productDto)], { type: 'application/json' }));
    if (this.image) {
      formData.append('image', this.image, this.image.name);
    } else {
      console.log('No image selected');
    }

    this.httpClient.post(this.addProductUrl, formData, httpOptions).subscribe({
      next: (res: any) => {
        this.alertService.show('Product added successfully!', 'success');
        
      },
      error: (error) => {
        this.alertService.show('Product added not successfully!', 'success');
      }
    });
  }
}

function isTokenExpired(token: string): boolean {
  const payload = JSON.parse(atob(token.split('.')[1]));
  const exp = payload.exp * 1000;
  return Date.now() >= exp;
}
