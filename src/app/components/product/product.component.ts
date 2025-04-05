import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule, HttpHeaders } from "@angular/common/http";
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { Product } from '../../models/product';
import { PageProductRequest } from '../../models/page-product-request';
import { ProductImg } from '../../models/productImg';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SideMenuComponent } from '../side-menu/side-menu.component';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
  standalone: true,
  imports: [CommonModule, HttpClientModule]
})
export class ProductComponent implements OnInit {
  category: string | undefined;
  image: File | undefined;
  public imageShow: any;
  price: string | undefined;
  products: ProductImg[] | undefined;
  pageSize: number = 3; // Hiển thị 3 sản phẩm trên trang
  pageOnClick: string | undefined;
  currentState: any | undefined;
  pageId: string | undefined;
  private readonly imageType: string = 'data:image/PNG;base64,';

  currentPage = 0;
  totalPages: number = 0; // Khởi tạo totalPages
  displayedProducts: ProductImg[] | undefined = []; // Khởi tạo displayedProducts

  electronicDeviceProductsUrl: string = "http://localhost:8081/api/v1/product/get-products-by-category";
  pagingationUrl: string = "http://localhost:8081/api/v1/product/get-product-by-title-and-by-paging-number";

  constructor(private http: HttpClient, private sanitizer: DomSanitizer, private router: Router) { }

   ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts() {
    this.pageOnClick = this.currentPage.toString(); // Gán lại pageOnClick sau khi thay đổi trang
    localStorage.setItem("pageOnClick", this.pageOnClick); // Lưu trang vào localStorage
    this.getPageProducts(this.pageOnClick); // Gọi API để lấy sản phẩm
  }

  choosePage(page: number) {
    if (page >= 0 && page < this.totalPages) {
      this.currentPage = page;
  
      this.pageOnClick = this.currentPage.toString();
      localStorage.setItem("pageOnClick", this.pageOnClick);
  
      this.getPageProducts(this.pageOnClick);
    }
  }

  getPageProducts(pageOnClick: string) {
    const categoryRequest = "Electronics Device";
    const token = sessionStorage.getItem('access_token');

    if (token && isTokenExpired(token)) {
      console.log('Token expired. Redirecting to login...');
      sessionStorage.removeItem('access_token');
      this.router.navigate(['/login']);
      return; // Dừng thực hiện nếu token hết hạn
    }

    const httpOptions = {
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    };

    const pageProductRequest = new PageProductRequest(pageOnClick, "smartphone", this.pageSize.toString()); // Sử dụng pageSize
    console.log(`Requesting data for page: ${pageOnClick}`);
    this.http.post<{products: ProductImg[], totalItems: string}>(this.pagingationUrl, pageProductRequest, httpOptions)
      .subscribe((res) => {
        console.log(res);
        const totalItems = parseInt(res.totalItems, 10); // Chuyển string sang number
        if (isNaN(totalItems)) {
          console.error("totalItems không phải kiểu số hợp lệ:", res.totalItems);
          return;
        }
        this.products = res.products.map(item => {
          let imageType = 'jpeg';
          if (item.image?.startsWith('/9j/')) {
            imageType = 'jpeg';
          } else if (item.image?.startsWith('iVBORw')) {
            imageType = 'png';
          }
    
          let imageUrl = item.image
          ? `data:image/${imageType};base64,${item.image}`
          : 'assets/default-image.jpg';
          return new ProductImg(item.category, item.title, item.price, item.describe, imageUrl);
        });

        this.totalPages = Math.ceil(totalItems / this.pageSize); // Tính toán số trang
        console.log('Total Pages:', this.totalPages);

        this.updatePagination();
      });
  }

  updatePagination() {
    this.displayedProducts = this.products || [];
  }
  
}

function isTokenExpired(token: string): boolean {
  const payload = JSON.parse(atob(token.split('.')[1]));
  const exp = payload.exp * 1000;
  return Date.now() >= exp;
}
