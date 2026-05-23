import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from 'src/type/product.type';
import { CartItem } from 'src/type/cart-item.type';

@Component({
  selector: 'app-item-card',
  imports: [CommonModule],
  templateUrl: './item-card.html',
  styleUrl: './item-card.css',
})
export class ItemCard {
  @Input({ required: true }) item!: Product;
  @Input({ required: true }) addToCart!: (product: Product[]) => void;
  @Input({ required: true }) formatPrice!: (price: number | string) => string;
  @Input({ required: true }) session!: { user: () => any };
  @Input({ required: true }) handleAddToCart!: (item: Product) => void;
  @Input({ required: true }) addedItemId: string | null = null;
}
