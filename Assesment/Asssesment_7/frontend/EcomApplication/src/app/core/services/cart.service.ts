import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(private http: HttpClient) {
    this.updateCartItemCount();
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
  getUserById(userId: any): Observable<any> {
    return this.http.get(
      `https://localhost:7227/api/User/getUserById/${userId}`
    );
  }
  //code fro subject behavipour
  private cartItemCountSubject = new BehaviorSubject<number>(0);
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
