import { Component, Input } from '@angular/core';
import { Product } from '../../../features/home/home.type';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-item-card',
  imports: [CommonModule],
  templateUrl: './item-card.html',
  styleUrl: './item-card.css',
})
export class ItemCard {
  @Input({ required: true }) item!: Product;
  @Input({ required: true }) formatPrice!: (price: number | string) => string;
}
