import { Component, Input } from '@angular/core';
import { CartItem } from 'src/type/cart-item.type';
import { Product } from 'src/type/product.type';

@Component({
  selector: 'app-order-card',
  imports: [],
  templateUrl: './order-card.html',
  styleUrl: './order-card.css',
})
export class OrderCard {
  @Input({ required: true }) orders!: CartItem[];

  get id(): string {
    return this.orders[0]?.items[0]?.id || '';
  }
  @Input({ required: true }) order!: CartItem[];

  @Input({ required: true }) date!: string;
  @Input({ required: true }) totalPrice!: number;

  toBaht(amount: number): string {
    return amount.toString();
  }
}
