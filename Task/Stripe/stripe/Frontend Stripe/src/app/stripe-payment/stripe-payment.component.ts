import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChanges,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { AngularStripeService } from '@fireflysemantics/angular-stripe-service';
import { Subject } from 'rxjs';
import { PaymentService } from '../payment.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-stripe-payment',
  templateUrl: './stripe-payment.component.html',
  styleUrls: ['./stripe-payment.component.css'],
})
export class StripePaymentComponent implements OnInit {
  @ViewChild('cardInfo', { static: false }) cardInfo!: ElementRef;
  stripe: any;
  cardHandler = this.onChange.bind(this);
  error: any;
  card: any;
  errorbutton: boolean = false;
  stripeToken: any;
  textpaymentfaild: any;
  publisherKey =
    'pk_test_51QULkJ04VOO4XGrMiZaK1WuI6UAH5zpgXT7VRsuNKEeJo2F6qLgKHYB51y3Fh6YsYpcwNffwCFFMJj7zm9lgza0S00EHQoOTKa'; 
  @ViewChild('secondDialog', { static: true })
  secondDialog!: TemplateRef<any>;
  @Input()
  pay!: Subject<boolean>;
  @Input() paymentData: any = [];
  @Output() onPaymentResponse = new EventEmitter<any>();
  constructor(
    private stripeService: AngularStripeService,
    private cd: ChangeDetectorRef,
    private service: PaymentService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.pay.subscribe((v) => {
      this.onSubmit();
    });
  }

  async onSubmit() {
    const { token, error } = await this.stripe.createToken(this.card);
    if (token != undefined) {
      this.stripeToken = token;
      this.payment();
    } else {
      this.toastr.error(error.message);
    }
  }

  onChange({ error }: { error: Error }) {
    if (error) {
      this.error = error.message;
      this.errorbutton = false;
    } else {
      this.error = null;
      this.errorbutton = true;
    }
    this.cd.detectChanges();
  }

  payment() {
    const data = {
      sourceToken: this.stripeToken.id.toString(),
      amount: this.paymentData.amount,
      customerName: this.paymentData.customerName,
      customerEmail: this.paymentData.customerEmail,
    };

    this.service.CreateStripePayment(data).subscribe((response: any) => {
      if (response.success == true) {
        this.onPaymentResponse.emit(response);
        alert('Payment Successfull');
        // this.toastr.success('Payment Done Successfully')
        this.resetCard();
      } else {
        alert(response.message);
        // this.toastr.error(response.message)
      }
    });
  }

  resetCard() {
    // Unmount the card element
    this.card.unmount();

    // Reinitialize the Stripe card element
    this.initializeStripe();
  }

  ngAfterViewInit() {
    this.initializeStripe();
  }

  initializeStripe() {
    this.stripeService.setPublishableKey(this.publisherKey).then((stripe) => {
      this.stripe = stripe;
      const elements = stripe.elements();

      this.card = elements.create('card', {
        hidePostalCode: true,
        style: {
          base: {
            iconColor: '#666EE8',
            color: '#31325F',
            fontFamily: 'Arial, sans-serif',
            fontSize: '16px',
            border: '1px solid #ccc',
            padding: '10px',
            'border-radius': '5px',
            '::placeholder': {
              color: '#CFDE0',
            },
          },
        },
      });

      // Mount the card element to your cardInfo element
      this.card.mount(this.cardInfo.nativeElement);

      // Add an event listener for changes in the card element
      this.card.addEventListener('change', this.cardHandler);
      this.card.addEventListener('change', this.onChange.bind(this));
    });
  }
}
