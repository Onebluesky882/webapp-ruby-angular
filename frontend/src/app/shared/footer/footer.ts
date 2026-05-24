import { Component, inject } from '@angular/core';
import { TotalPriceCard } from '../components/total-price-card/total-price-card';
import { CartStore } from '@/core/services/cart-store';
import { SessionService } from '@/core/services/session';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-footer',
  imports: [TotalPriceCard],
  templateUrl: './footer.html',
  styleUrl: './footer.css',
})
export class FooterComponent {
  cartStore = inject(CartStore);
  session = inject(SessionService);
  router = inject(Router);
  isOrder = false;

  cartItems = this.cartStore.cartItems;
  get totalPrice() {
    return this.cartItems().reduce((sum, cartItem) => {
      const itemTotal = cartItem.items.reduce((innerSum, product) => {
        return innerSum + product.priceCents;
      }, 0);

      return sum + (itemTotal * cartItem.qty) / 100;
    }, 0);
  }

  get isHidden(): boolean {
    return this.router.url === '/order';
  }
}
