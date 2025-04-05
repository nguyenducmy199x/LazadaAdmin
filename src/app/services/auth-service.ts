// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private router: Router) {}

  // Giả lập quá trình đăng nhập
  login(username: string, password: string): boolean {
    if (username === 'admin' && password === 'admin') {
      const token = 'mock-jwt-token'; // Thay thế bằng token thực tế từ server
      sessionStorage.setItem('access_token', token);
      return true;
    }
    return false;
  }

  // Đăng xuất người dùng
  logout(): void {
    sessionStorage.removeItem('access_token');
    this.router.navigate(['/login']);
  }

  // Kiểm tra xem người dùng đã đăng nhập chưa
  isAuthenticated(): boolean {
    const token = sessionStorage.getItem('access_token');
    return token !== null;
  }
}
