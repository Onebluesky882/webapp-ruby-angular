import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartItem } from 'src/type/cart-item.type';

@Component({
  selector: 'app-cart-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart-items.html',
})
export class CartItemComponent {
  @Input({ required: true }) item!: CartItem;

  @Output() quantityChange = new EventEmitter<number>();

  @Output() removeItem = new EventEmitter<string>();

  // get first product
  get product() {
    return this.item?.items?.[0];
  }

  // total product price
  get total(): number {
    if (!this.item) return 0;

    return this.item.items.reduce((sum, product) => {
      return sum + product.priceCents;
    }, 0);
  }

  // total price with qty
  get totalPrice(): number {
    if (!this.item) return 0;
    return this.total * this.item.qty;
  }

  // update quantity
  updateQuantity(newQuantity: number) {
    if (newQuantity > 0) {
      this.quantityChange.emit(newQuantity);
    } else {
      this.removeCartItem();
    }
  }

  // remove item
  removeCartItem() {
    const firstItem = this.item?.items?.[0];

    if (!firstItem) return;

    this.removeItem.emit(firstItem.id);
  }

  // format currency
  formatPrice(cents: number): string {
    return (cents / 100).toLocaleString('th-TH', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }
}
