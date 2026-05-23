import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-payment-card-popup',
  imports: [],
  templateUrl: './payment-card-popup.html',
  styleUrl: './payment-card-popup.css',
})
export class PaymentCardPopup {
  @Output() paySuccess = new EventEmitter<void>();
}
