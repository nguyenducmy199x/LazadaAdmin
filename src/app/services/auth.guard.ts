import { inject, Injectable } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const token = sessionStorage.getItem('access_token');
  const isValid = token && !isTokenExpired(token);
  
  if (!isValid) {
    const router = inject(Router);
    router.navigate(['/login']);
    return false;
  }

  return true;
};

// Tách hàm kiểm tra token hết hạn
function isTokenExpired(token: string): boolean {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return Date.now() >= payload.exp * 1000;
  } catch (e) {
    return true;
  }
}
