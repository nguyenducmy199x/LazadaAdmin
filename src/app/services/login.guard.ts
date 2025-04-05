// src/app/guards/login.guard.ts
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const loginGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const token = sessionStorage.getItem('access_token');

  if (token && !isTokenExpired(token)) {
    // Nếu đã login, chuyển về trang home
    router.navigate(['/home']);
    return false;
  }

  // Nếu chưa login thì cho vào trang login
  return true;
};

function isTokenExpired(token: string): boolean {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const exp = payload.exp * 1000;
    return Date.now() >= exp;
  } catch (e) {
    return true;
  }
}
