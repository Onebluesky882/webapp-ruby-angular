import { computed, Injectable, signal } from '@angular/core';
import { CartItem } from 'src/type/cart-item.type';

@Injectable({
  providedIn: 'root',
})
export class CartStore {
  private items = signal<CartItem[]>([]);

  cartItems = this.items;

  totalItems = computed(() => this.items().reduce((sum, item) => sum + item.qty, 0));

  totalPrice = computed(() => {
    return (
      this.items().reduce((sum, cartItem) => {
        const itemTotal = cartItem.items.reduce((innerSum, product) => {
          return innerSum + product.priceCents;
        }, 0);

        return sum + itemTotal * cartItem.qty;
      }, 0) / 100
    );
  });

  addToCart(product: CartItem) {
    const current = this.items();

    const existing = current.find((i) =>
      i.items.some((p) => String(p.id) === String(product.items[0].id)),
    );

    if (existing) {
      this.items.set(
        current.map((i) =>
          i.items.some((p) => String(p.id) === String(product.items[0].id))
            ? { ...i, qty: i.qty + 1 }
            : i,
        ),
      );
    } else {
      this.items.set([...current, { ...product, qty: 1 }]);
    }
  }

  removeItem(id: number) {
    const filtered = this.items().filter((cartItem) => {
      return !cartItem.items.some((product) => {
        return String(product.id) === String(id);
      });
    });

    this.items.set(filtered);
  }

  clearCart() {
    this.items.set([]);
  }
  paymentPopupVisible = signal(false);
  openPaymentPopup() {
    console.log('paymentPopupVisible', this.paymentPopupVisible());
    this.paymentPopupVisible.set(true);
  }
}
