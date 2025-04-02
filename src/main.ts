import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';  // Đảm bảo bạn có file app.routes.ts chứa routes

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes)  // Cung cấp các routes cho ứng dụng
  ]
}).catch(err => console.error(err));
