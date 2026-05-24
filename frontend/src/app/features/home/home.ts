import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { Api } from '@/core/services/api';
import { ItemCard } from '@/shared/components/item-card/item-card';
import { Product } from 'src/type/product.type';
import { CartStore } from '@/core/services/cart-store';
import { CartItem } from 'src/type/cart-item.type';
import { SessionService } from '@/core/services/session';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { PaymentCardPopup } from '@/shared/components/payment-card-popup/payment-card-popup';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ItemCard, PaymentCardPopup],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  api = inject(Api);
  cartStore = inject(CartStore);
  session = inject(SessionService);
  router = inject(Router);

  // ✅ เปลี่ยนเป็น signal — Angular track ได้ถูกต้อง
  addedItemId = signal<string | null>(null);
  products = signal<Product[]>([]);
  loading = signal(true);

  async ngOnInit() {
    try {
      const data = await firstValueFrom(this.api.getProducts());
      this.products.set(data); // ✅ ไม่ต้องใช้ setTimeout
    } catch (error) {
      console.error(error);
    } finally {
      this.loading.set(false); // ✅ signal อัปเดต change detection ทันที
    }
  }

  formatPrice(cents: number | string): string {
    const amount = typeof cents === 'string' ? parseFloat(cents) : cents;
    return (amount / 100).toLocaleString('th-TH', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }

  addToCart = (products: Product[]) => {
    if (!this.session.user()?.id) {
      this.router.navigate(['/login']);
      return;
    }

    const productLength = products.length;
    const total = products.reduce((acc, item) => acc + item.priceCents, 0);

    products.forEach((product) => {
      const cartItem: CartItem = {
        status: 'onCart',
        userId: this.session.user()!.id,
        qty: productLength,
        total: total,
        items: [product],
      };
      this.cartStore.addToCart(cartItem);
    });
  };

  handleAddToCart = (product: Product) => {
    if (!this.session.user()?.id) {
      this.router.navigate(['/login']);
      return;
    }

    this.addToCart([product]);
    this.addedItemId.set(product.id.toString()); // ✅ signal

    setTimeout(() => {
      this.addedItemId.set(null); // ✅ signal ใน setTimeout ไม่เป็นปัญหา
    }, 500);
  };

  handlePaySuccess = async () => {
    await this.cartStore.clearCart();
    this.cartStore.paymentPopupVisible.set(false);
    this.router.navigate(['/order']);
  };
}
