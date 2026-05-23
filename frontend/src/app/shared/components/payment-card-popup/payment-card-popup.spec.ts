import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentCardPopup } from './payment-card-popup';

describe('PaymentCardPopup', () => {
  let component: PaymentCardPopup;
  let fixture: ComponentFixture<PaymentCardPopup>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaymentCardPopup],
    }).compileComponents();

    fixture = TestBed.createComponent(PaymentCardPopup);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
