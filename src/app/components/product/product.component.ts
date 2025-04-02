import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpClientModule, HttpHeaders} from "@angular/common/http";
import {DomSanitizer, SafeResourceUrl, SafeUrl} from '@angular/platform-browser';
import {Product} from '../../models/product';
import {PageProductRequest} from '../../models/page-product-request';
import {ProductImg} from '../../models/productImg';
import {Router} from '@angular/router';
import {CommonModule} from '@angular/common';
import {SideMenuComponent} from '../side-menu/side-menu.component';

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
  pageSize: number = 5;
  pageOnClick: string | undefined;
  currentState: any | undefined;
  pageId: string | undefined;
  private readonly imageType: string = 'data:image/PNG;base64,';

  constructor(private http: HttpClient, private sanitizer: DomSanitizer, private router : Router) {
  }

  electronicDeviceProductsUrl: string = "http://localhost:8081/api/v1/product/get-products-by-category";
  pagingationUrl: string = "http://localhost:8081/api/v1/product/get-product-by-title-and-by-paging-number";

  currentPage = 0;

  choosePage(page: number) {
    if (page >= 0 && page < this.pageSize) {
      this.currentPage = page;
      console.log(`Chuyển đến trang ${page + 1}`);

      this.pageOnClick = page.toString();
      localStorage.setItem("pageOnClick", this.pageOnClick); // Lưu vào localStorage

      this.getPageProducts(this.pageOnClick); // Load lại sản phẩm của trang đã chọn
    }
  }



  ngOnInit(): void {
    let isNotYetClick = "0";
    localStorage.getItem("pageOnClick");
    if(localStorage.getItem("pageOnClick") != undefined){
      // @ts-ignore
      this.getPageProducts(localStorage.getItem("pageOnClick"));
    }else{
      console.log("init method");
      console.log(isNotYetClick)
      this.getPageProducts(isNotYetClick);
    }

  }
  getPageProducts(pageOnClick: string) {
    const categoryRequest = "Electronics Device";
    const token = sessionStorage.getItem('access_token');

    if (token && isTokenExpired(token)) {
      console.log('Token expired. Redirecting to login...');
      sessionStorage.removeItem('access_token');
      this.router.navigate(['/login']);
    }

    const httpOptions = {
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    };

    const pageProductRequest = new PageProductRequest(pageOnClick, "smartphone", "10");

    this.http.post<ProductImg[]>(this.pagingationUrl, pageProductRequest, httpOptions)
      .subscribe((res) => {
        this.products = res.map(item => {
          let imageType = 'jpeg'; // Mặc định JPEG
          if (item.image?.startsWith('/9j/')) {
            imageType = 'jpeg';
          } else if (item.image?.startsWith('iVBORw')) {
            imageType = 'png';
          }

          // Không cần `bypassSecurityTrustUrl()`, chỉ nối chuỗi Base64
          let imageUrl = item.image
            ? `data:image/${imageType};base64,${item.image}`
            : 'assets/default-image.jpg'; // Ảnh mặc định

          return new ProductImg(item.category, item.title, item.price, item.describe, imageUrl);
        });

        console.log(this.products);
      });
  }


}
function isTokenExpired(token: string): boolean {
  const payload = JSON.parse(atob(token.split('.')[1])); // Giải mã payload
  const exp = payload.exp * 1000; // Chuyển exp thành timestamp (milliseconds)
  return Date.now() >= exp;
}
