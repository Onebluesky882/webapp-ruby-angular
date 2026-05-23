import { Component, effect, inject } from '@angular/core';
import { OrderCard } from '@/shared/components/order-card/order-card';
import { SessionService } from '@/core/services/session';
import { Router } from '@angular/router';
import { CartStore } from '@/core/services/cart-store';

@Component({
  selector: 'app-order',
  imports: [OrderCard],
  templateUrl: './order.html',
  styleUrl: './order.css',
})
export class Order {
  session = inject(SessionService);
  router = inject(Router);
  cartStore = inject(CartStore);
  constructor() {
    effect(() => {
      if (!this.session.user()) {
        this.router.navigate(['/']);
        return;
      }
    });
  }
  // filter status == "completed"
  completedOrders = this.cartStore.cartItems().filter((item) => item.status !== 'paid');
}
