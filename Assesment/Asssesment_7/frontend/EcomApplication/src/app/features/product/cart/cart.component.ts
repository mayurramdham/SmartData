import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CartService } from '../../../core/services/cart.service';
import { ToaterService } from '../../../core/services/toater.service';
import { NavbarComponent } from '../../auth/utility/navbar/navbar.component';
import { JwtService } from '../../../core/services/jwt.service';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, NavbarComponent, ReactiveFormsModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent implements OnInit {
  paymentForm: FormGroup;
  cartItems: any[] = [];
  cart = new Set<number>();
  cartItemCount: number = 0;
  users: any = {};
  constructor(
    private fb: FormBuilder,
    private cartService: CartService,
    private toasterService: ToaterService,
    private jwtService: JwtService
  ) {
    this.paymentForm = this.fb.group({
      cardNumber: [
        '',
        [Validators.required, Validators.pattern(/^\d{16}$/)], // 16-digit card number
      ],
      expiryDate: [
        '',
        [Validators.required, Validators.pattern(/^(0[1-9]|1[0-2])\/\d{2}$/)], // MM/YY format
      ],
      cvv: [
        '',
        [Validators.required, Validators.pattern(/^\d{3}$/)], // 3-digit CVV
      ],
    });
  }
  ngOnInit(): void {
    this.getCartDetails();
    this.getUserForAddress(this.userId);
    this.cartService.cartItemCount$.subscribe((count) => {
      this.cartItemCount = count;
    });

    // Initialize the cart item count
    this.cartService.updateCartItemCount();
  }
  userId = this.jwtService.getUserId();

  //using subject behavoir for handlin adding and removing the data
  addItemToCart(item: any): void {
    this.cartService.addItemToCart(item);
  }

  // Remove item from cart (for demonstration)
  removeItemFromCart(item: any): void {
    this.cartService.removeItemFromCart(item);
  }

  clearCart(): void {
    this.cartService.clearCart();
  }

  //using subject behavoir for handlin adding and removing the data end the code

  getCartDetails() {
    this.cartService.getProductFromCart(this.userId).subscribe(
      (response: any) => {
        if (response.status === 200) {
          console.log('responseOnly', response);
          this.cartItems = response.cartItems;
          console.log('cartResponseData', response.cartItems);
        } else {
          this.toasterService.showError('Failed to fetch cart items');
        }
      },
      (error) => {
        this.toasterService.showError('Error fetching cart items');
      }
    );
  }

  calculateTotalPrice(): number {
    return this.cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  }
  getUserForAddress(data: any) {
    this.cartService.getUserById(data).subscribe(
      (response) => {
        if (response.status == 200) {
          this.users = response.userData;
          console.log('userDataAddress', this.users);
        } else {
          console.log(Error);
        }
      },
      (error) => {
        console.error('unable to get response');
      }
    );
  }

  increaseQuantity(item: any): void {
    const payload = {
      prId: item.prId,
      cartId: item.cartId,
      quantity: 1,
    };
    // console.log('quanity payload', payload.quantity);
    this.cartService.IncrementQuantity(payload).subscribe(
      (response) => {
        if ((response.status = 200)) {
          if (response.avaibleStock > response.cartQuantity) {
            this.toasterService.showError(
              'Out of stock! Please reduce the quantity.'
            );
          }
          this.updateCartInLocalStorage();
          this.getCartDetails();
        }
      },
      (error) => {
        console.error('quanity error', error);
      }
    );
  }

  decreaseQuantity(item: any): void {
    if (item.quantity > 1) {
      item.quantity--;
    }
  }

  removeCartInLocalStorage() {
    localStorage.removeItem('cart');
  }

  updateCartInLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(Array.from(this.cart)));
  }

  removeCartItemFromLocalStorage(itemToRemove: any): void {
    // Retrieve the current cart from localStorage
    const storedCart = localStorage.getItem('cart');
    console.log('storedCart:', storedCart);

    if (storedCart) {
      // Parse the stored cart string into an array
      let cartArray = JSON.parse(storedCart);
      console.log('cartArray before removal:', cartArray);

      cartArray.shift();

      localStorage.setItem('cart', JSON.stringify(cartArray));

      this.cart = new Set(cartArray);

      console.log('cartArray after removal:', cartArray);
    }
  }

  removeCartItem(cartId: number): void {
    console.log('cartId', cartId);
    const isConfirmed = window.confirm(
      'Are you sure you want to delete this item from the cart?'
    );

    if (isConfirmed) {
      // Proceed with the deletion if confirmed
      this.cartService.RemoveItemFromCart(cartId).subscribe({
        next: (result: any) => {
          if (result.status == 200) {
            this.removeCartInLocalStorage();
            this.cartService.updateCartItemCount();
            this.getCartDetails();
            this.toasterService.showSuccess(
              'Item from cart Deleted Successfully'
            );
          } else {
            this.toasterService.showError('Unable to delete the cart item');
          }
        },
        error: (error: Error) => {
          this.toasterService.showError('Unable to get response');
          console.log(error);
        },
      });
    } else {
      // If the user cancels, do nothing
      console.log('Item deletion canceled');
    }
  }

  //payment modal
  // private paymentModal: bootstrap.Modal | undefined;

  openPaymentModal(): void {
    const modalElement = document.getElementById('paymentModal');
    if (modalElement) {
      modalElement.style.display = 'block';
      modalElement.classList.add('show');
      modalElement.setAttribute('aria-hidden', 'false');
    }
  }

  closePaymentModal(): void {
    const modal = document.getElementById('paymentModal');
    if (modal) {
      modal.style.display = 'none';
      modal.classList.remove('show');
      modal.setAttribute('aria-hidden', 'true');
    }
  }

  processPayment(): void {
    if (this.paymentForm.valid) {
      // Simulate payment processing
      alert('Payment successful!');
      this.closePaymentModal();
      this.paymentForm.reset(); // Reset form after successful submission
    } else {
      this.paymentForm.markAllAsTouched(); // Show validation errors
    }
  }
}
