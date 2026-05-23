import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from 'src/type/product.type';

@Injectable({
  providedIn: 'root',
})
export class Api {
  apiUrl = 'https://kolzsticks.github.io/Free-Ecommerce-Products-Api/main/products.json';
  baseUrl = 'https://todo-app-ruby-angular-production.up.railway.app/api';

  constructor(private http: HttpClient) {}

  getProducts() {
    return this.http.get<Product[]>(this.apiUrl);
  }

  getUser() {
    return this.http.get(`${this.baseUrl}/users`);
  }

  createUser(user: any) {
    return this.http.post(`${this.baseUrl}/users`, user);
  }
}
