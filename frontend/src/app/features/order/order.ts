import { Component, effect, inject, OnInit } from '@angular/core';
import { OrderCard } from '@/shared/components/order-card/order-card';
import { SessionService } from '@/core/services/session';
import { Router } from '@angular/router';
import { CartStore } from '@/core/services/cart-store';
import { firstValueFrom } from 'rxjs';
import { Api } from '@/core/services/api';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-order',
  imports: [CommonModule, OrderCard],
  templateUrl: './order.html',
  styleUrl: './order.css',
})
export class Order {
  standalone = true;
  session = inject(SessionService);
  router = inject(Router);
  cartStore = inject(CartStore);
  api = inject(Api);

  constructor() {
    effect(() => {
      if (!this.session.user()) {
        this.router.navigate(['/']);
        return;
      }
    });
  }

  orders: any[] = [];

  async ngOnInit() {
    const res = await firstValueFrom(this.api.getOrders());

    console.log('API RESPONSE:', res);
  }
}
