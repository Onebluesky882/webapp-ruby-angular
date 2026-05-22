import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Api } from '../../core/services/api';
import { Product } from './home.type';
import { ItemCard } from '../../shared/components/item-card/item-card';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ItemCard],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  api = inject(Api);

  products = [] as Product[];
  ngOnInit(): void {
    this.api.getProducts().subscribe((data) => {
      console.log(data);
      this.products = data;
    });
  }

  formatPrice(cents: number | string): string {
    const amount = typeof cents === 'string' ? parseFloat(cents) : cents;

    return (amount / 100).toLocaleString('th-TH', {
      minimumFractionDigits: 2,

      maximumFractionDigits: 2,
    });
  }
}
