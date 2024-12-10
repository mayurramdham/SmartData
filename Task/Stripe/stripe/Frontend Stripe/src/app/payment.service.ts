import { Injectable } from '@angular/core';
import { CommonService } from './common.service';

  
@Injectable({
    providedIn: 'root',
  })

export class PaymentService{

    constructor(
        private commonService : CommonService
    ){}

    CreateStripePayment(postData: any) {
        return this.commonService.post<any>('Stripe/CreateStripePayment', postData)
    }

    StrripeRefund(postData: any) {
        return this.commonService.post<any>('Stripe/StripeRefund', postData)
    }
}