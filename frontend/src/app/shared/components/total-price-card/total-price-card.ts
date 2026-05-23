import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-total-price-card',
  imports: [],
  templateUrl: './total-price-card.html',
  styleUrl: './total-price-card.css',
})
export class TotalPriceCard {
  @Input({ required: true }) totalPrice!: number;
  @Input({ required: true }) paymentPopupVisible = false;
  @Input({ required: true }) setPaymentPopup!: (value: boolean) => void;
}
