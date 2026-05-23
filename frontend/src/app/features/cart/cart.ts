import { Component, inject, effect } from '@angular/core';
import { CartItemComponent } from '@/shared/components/cart-items/cart-items';
import { CartStore } from '../../core/services/cart-store';
import { SessionService } from '@/core/services/session';
import { Router } from '@angular/router';
import { TotalPriceCard } from '@/shared/components/total-price-card/total-price-card';
import { PaymentCardPopup } from '@/shared/components/payment-card-popup/payment-card-popup';

@Component({
  imports: [CartItemComponent, TotalPriceCard, PaymentCardPopup],
  templateUrl: './cart.html',
  styleUrl: './cart.css',
})
export class Cart {
  cartStore = inject(CartStore);
  session = inject(SessionService);
  router = inject(Router);

  cartItems = this.cartStore.cartItems;

  constructor() {
    effect(() => {
      console.log('cart effect', this.cartItems());

      if (!this.session.user()) {
        this.router.navigate(['/']);
        return;
      }
    });
  }

  get totalPrice() {
    return this.cartItems().reduce((sum, cartItem) => {
      const itemTotal = cartItem.items.reduce((innerSum, product) => {
        return innerSum + product.priceCents;
      }, 0);

      return sum + (itemTotal * cartItem.qty) / 100;
    }, 0);
  }

  updateQuantity(item: any, newQuantity: number) {
    this.cartStore.cartItems.update((items) => {
      return items.map((i) =>
        i.items[0].id === item.items[0].id ? { ...i, qty: newQuantity } : i,
      );
    });
  }

  removeCartItem(itemId: string) {
    this.cartStore.cartItems.update((items) => {
      return items.filter((i) => i.items[0].id !== itemId);
    });
  }
  paymentPopupVisible = false;
  setPaymentPopup = (value: boolean) => {
    console.log('paymentPopupVisible', this.paymentPopupVisible);
    this.paymentPopupVisible = value;
  };

  paySuccessFull = () => {
    console.log('click ');
    this.router.navigate(['/order']);
  };
}
