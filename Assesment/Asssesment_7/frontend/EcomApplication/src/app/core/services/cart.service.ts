import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(private http: HttpClient) {}
  addToCart(body: any): Observable<any> {
    return this.http.post('https://localhost:7227/api/Product/AddToCart', body);
  }
}
