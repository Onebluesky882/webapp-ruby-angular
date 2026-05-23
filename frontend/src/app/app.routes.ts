import { Routes } from '@angular/router';
import { Home } from './features/home/home';
import { Cart } from './features/cart/cart';
import { Order } from './features/order/order';
import { LoginComponent } from './features/login/login';

export const routes: Routes = [
  {
    path: '',
    component: Home,
  },
  {
    path: 'cart',
    component: Cart,
  },
  {
    path: 'order',
    component: Order,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
];
