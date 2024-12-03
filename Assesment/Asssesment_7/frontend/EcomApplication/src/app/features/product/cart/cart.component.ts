import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CartService } from '../../../core/services/cart.service';
import { ToaterService } from '../../../core/services/toater.service';
import { NavbarComponent } from '../../auth/utility/navbar/navbar.component';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, NavbarComponent],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent implements OnInit {
  cartItems: any[] = [];
  constructor(
    private cartService: CartService,
    private toasterService: ToaterService
  ) {}
  ngOnInit(): void {
    this.getCartDetails();
  }
  getCartDetails() {
    const userId = 14; // You can dynamically fetch this user ID from session/authentication state
    this.cartService.getProductFromCart(userId).subscribe(
      (response: any) => {
        if (response.status === 200) {
          console.log('responseOnly', response);
          this.cartItems = response.cartItems;
          console.log('cartResponse', response.cartItems);
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

  increaseQuantity(item: any): void {
    item.quantity++;
  }

  decreaseQuantity(item: any): void {
    if (item.quantity > 1) {
      item.quantity--;
    }
  }
}
