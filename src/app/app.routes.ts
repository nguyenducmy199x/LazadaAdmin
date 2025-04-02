import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { AddProductComponent } from './pages/add-product/add-product.component';
import {EditProductComponent} from './pages/edit-product/edit-product.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'add-product', component: AddProductComponent },
  { path: 'edit-product', component: EditProductComponent },
];
