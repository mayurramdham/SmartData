import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(private http: HttpClient) {
    this.updateCartItemCount();
    this.setItemCountSubject();
  }
  addToCart(body: any): Observable<any> {
    return this.http.post('https://localhost:7227/api/Cart/AddToCart', body);
  }
  getProductFromCart(prId: any): Observable<any> {
    return this.http.get(`https://localhost:7227/api/Cart/${prId}`);
  }
  RemoveItemFromCart(cartId: any): Observable<any> {
    return this.http.delete(`https://localhost:7227/api/Cart/${cartId}`);
  }
  IncrementQuantity(quantity: any): Observable<any> {
    return this.http.post(
      `https://localhost:7227/api/Cart/incrementcart`,
      quantity
    );
  }

  DecrementQuantity(quantity: any): Observable<any> {
    return this.http.post(
      `https://localhost:7227/api/Cart/decrementcart`,
      quantity
    );
  }
  getUserById(userId: any): Observable<any> {
    return this.http.get(
      `https://localhost:7227/api/User/getUserById/${userId}`
    );
  }

  getCartProductCount$(userId: number): Observable<any> {
    return this.http.get(
      `https://localhost:7227/api/Cart/getCartCount/${userId}`
    );
  }

  addPayment(payment: any): Observable<any> {
    return this.http.post(
      `https://localhost:7227/api/Cart/AddPayment`,
      payment
    );
  }

  GenerateInvoice(invoiceId: number): Observable<any> {
    return this.http.get(
      `https://localhost:7227/api/Cart/generateInvoic/${invoiceId}`
    );
  }

  //code fro subject behavipour
  private cartItemCountSubject = new BehaviorSubject<number>(0);
  //code to handle cartCount 05-12-2025
  public cartItem$ = new BehaviorSubject<number[]>([]);

  setItemCountSubject() {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      const decodedToken: any = jwtDecode(accessToken);
      const userId = decodedToken.UserId;
      this.getCartProductCount$(userId).subscribe(
        (response) => {
          if (response.status == 200) {
            this.cartItem$.next(response.cartProductId);
          } else {
            this.cartItem$.next([]);
          }
        },
        (error) => {
          this.cartItem$.next([]);
        }
      );
    } else {
      this.cartItem$.next([]);
    }
  }

  resetSetCount() {
    this.setItemCountSubject();
  }

  // Expose the cart item count as an observable
  cartItemCount$ = this.cartItemCountSubject.asObservable();

  // Update the cart item count
  updateCartItemCount(): void {
    const storedCart = localStorage.getItem('cart');
    const cartArray = storedCart ? JSON.parse(storedCart) : [];
    this.cartItemCountSubject.next(cartArray.length); // Emit the updated count
  }

  // Add an item to the cart
  addItemToCart(item: any): void {
    const storedCart = localStorage.getItem('cart');
    let cartArray = storedCart ? JSON.parse(storedCart) : [];
    cartArray.push(item); // Add the new item
    localStorage.setItem('cart', JSON.stringify(cartArray)); // Save to localStorage
    this.updateCartItemCount(); // Update the count
  }

  // Remove an item from the cart
  removeItemFromCart(itemToRemove: any): void {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      let cartArray = JSON.parse(storedCart);
      cartArray = cartArray.filter(
        (item: any) => item.cartId !== itemToRemove.cartId
      ); // Remove by cartId
      localStorage.setItem('cart', JSON.stringify(cartArray)); // Save to localStorage
      this.updateCartItemCount(); // Update the count
    }
  }

  // Clear the cart completely
  clearCart(): void {
    localStorage.removeItem('cart');
    this.updateCartItemCount(); // Set count to 0 after clearing the cart
  }
}
