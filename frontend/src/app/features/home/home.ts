import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Api } from '@/core/services/api';
import { ItemCard } from '@/shared/components/item-card/item-card';
import { Product } from 'src/type/product.type';
import { CartStore } from '@/core/services/cart-store';
import { CartItem } from 'src/type/cart-item.type';
import { SessionService } from '@/core/services/session';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ItemCard],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  api = inject(Api);

  cart = inject(CartStore);
  session = inject(SessionService);
  router = inject(Router);
  addedItemId: string | null = null;
  products = [] as Product[];
  ngOnInit(): void {
    this.api.getProducts().subscribe((data) => {
      this.products = data;
    });
  }

  formatPrice(cents: number | string): string {
    const amount = typeof cents === 'string' ? parseFloat(cents) : cents;

    return (amount / 100).toLocaleString('th-TH', {
      minimumFractionDigits: 2,

      maximumFractionDigits: 2,
    });
  }

  addToCart(products: Product[]) {
    if (!this.session.user()?.id) {
      console.log('Please login first');
      this.router.navigate(['/login']);
    }
    const productLength = products.length;

    products.forEach((product) => {
      const total = products.reduce(
        (acc, item) => acc + item.priceCents,

        0,
      );
      const cartItem: CartItem = {
        status: 'onCart',
        userId: this.session.user()!.id,
        qty: productLength,
        total: total,
        items: [product],
      };
      this.cart.addToCart(cartItem);
    });

    console.log('product : ', products);
  }

  handleAddToCart = (product: Product) => {
    if (!this.session.user()?.id) {
      console.log('Please login first');
      this.router.navigate(['/login']);
      return;
    }
    this.addToCart([product]);
    this.addedItemId = product.id.toString();

    setTimeout(() => {
      this.addedItemId = null;
    }, 500);
  };
}
