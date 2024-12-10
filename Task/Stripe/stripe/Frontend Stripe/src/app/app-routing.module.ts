// app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StripePaymentComponent } from './stripe-payment/stripe-payment.component';
import { StripePaymentLayoutComponent } from './stripe-payment-layout/stripe-payment-layout.component';

const routes: Routes = [
  {
    path: 'stripe-pay',
    component: StripePaymentComponent
  },

  {
    path:'',
    component:StripePaymentLayoutComponent
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes) 
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
