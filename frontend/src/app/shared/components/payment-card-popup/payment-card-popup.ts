import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-payment-card-popup',
  imports: [],
  templateUrl: './payment-card-popup.html',
  styleUrl: './payment-card-popup.css',
})
export class PaymentCardPopup {
  @Input({ required: true }) totalPrice!: number;
  @Output() setPaymentPopup = new EventEmitter<boolean>();
  @Output() paySuccess = new EventEmitter<void>();
}
