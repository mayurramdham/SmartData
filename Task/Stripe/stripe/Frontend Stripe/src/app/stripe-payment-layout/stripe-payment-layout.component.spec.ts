import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StripePaymentLayoutComponent } from './stripe-payment-layout.component';

describe('StripePaymentLayoutComponent', () => {
  let component: StripePaymentLayoutComponent;
  let fixture: ComponentFixture<StripePaymentLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StripePaymentLayoutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StripePaymentLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
