import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-total-price-card',
  imports: [],
  templateUrl: './total-price-card.html',
  styleUrl: './total-price-card.css',
})
export class TotalPriceCard {
  @Input({ required: true }) totalPrice!: number;
  @Input({ required: true }) paymentPopupVisible = false;
  @Output() setPaymentPopup = new EventEmitter<boolean>();
}
