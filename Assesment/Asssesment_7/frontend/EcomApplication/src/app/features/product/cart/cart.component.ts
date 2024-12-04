import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CartService } from '../../../core/services/cart.service';
import { ToaterService } from '../../../core/services/toater.service';
import { NavbarComponent } from '../../auth/utility/navbar/navbar.component';
import { JwtService } from '../../../core/services/jwt.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, NavbarComponent],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent implements OnInit {
  cartItems: any[] = [];
  cart = new Set<number>();
  cartItemCount: number = 0;
  users: any = {};
  constructor(
    private cartService: CartService,
    private toasterService: ToaterService,
    private jwtService: JwtService
  ) {}
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
    console.log('quanity payload', payload);
    this.cartService.IncrementQuantity(payload).subscribe(
      (response) => {
        if ((response.status = 200)) {
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
}
