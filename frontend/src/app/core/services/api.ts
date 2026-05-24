import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from 'src/type/product.type';

@Injectable({
  providedIn: 'root',
})
export class Api {
  apiUrl = 'https://kolzsticks.github.io/Free-Ecommerce-Products-Api/main/products.json';
  baseUrl = 'https://todo-app-ruby-angular-production.up.railway.app/api/v1';

  constructor(private http: HttpClient) {}

  getProducts() {
    return this.http.get<Product[]>(this.apiUrl);
  }

  getOrders() {
    return this.http.get(`${this.baseUrl}/orders`);
  }
  // add item to cart
  addItemToCart(item: any) {
    return this.http.post(`${this.baseUrl}/cart/add_item`, item);
  }

  // checkout
  checkout() {
    return this.http.post(`${this.baseUrl}/cart/checkout`, {});
  }

  //remove item
  removeItemFromCart(item: any) {
    return this.http.post(`${this.baseUrl}/cart/remove_item`, item);
  }
}
