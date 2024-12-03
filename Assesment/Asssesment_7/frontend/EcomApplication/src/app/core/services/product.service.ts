import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}
  addProduct(data: any): Observable<any> {
    return this.http.post(
      'https://localhost:7227/api/Product/AddProduct',
      data
    );
  }
  getProducts(): Observable<any> {
    return this.http.get('https://localhost:7227/api/Product');
  }
  updateProducts(product: any): Observable<any> {
    return this.http.put('https://localhost:7227/api/Product', product);
  }
  deleteProducts(PrId: any): Observable<any> {
    return this.http.delete(`https://localhost:7227/api/Product/${PrId}`);
  }
}
