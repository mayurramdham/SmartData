import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { PaymentService } from '../payment.service';

@Component({
  selector: 'app-stripe-payment-layout',
  templateUrl: './stripe-payment-layout.component.html',
  styleUrls: ['./stripe-payment-layout.component.css'],
})
export class StripePaymentLayoutComponent {
  stripePaymentData:
    | { amount: any; customerName: string; customerEmail: string }
    | undefined;
  payForBooking: Subject<boolean> = new Subject();
  paymentToken!: string;
  constructor(private paymentService: PaymentService) {}

  Pay() {
    this.stripePaymentData = {
      amount: 200,
      customerName: 'Testing',
      customerEmail: 'test@yopmail.com',
    };
    this.payForBooking.next(true);
  }

  // Refund() {
  //   var model = {
  //     paymentToken: this.paymentToken,
  //     amount: 100
  //   }
  //   this.paymentService.
  //     StrripeRefund(model).
  //     subscribe((response: any) => {
  //       if (response.success == true) {
  //         alert("Refund Successfull")
  //       }
  //       else {
  //         alert(response.message)
  //       }
  //     }
  //     )

  // }
}
