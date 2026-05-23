import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalPriceCard } from './total-price-card';

describe('TotalPriceCard', () => {
  let component: TotalPriceCard;
  let fixture: ComponentFixture<TotalPriceCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TotalPriceCard],
    }).compileComponents();

    fixture = TestBed.createComponent(TotalPriceCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
