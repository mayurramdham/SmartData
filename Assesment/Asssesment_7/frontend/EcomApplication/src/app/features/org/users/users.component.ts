import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ProductService } from '../../../core/services/product.service';
import { NavbarComponent } from '../../auth/utility/navbar/navbar.component';
import { CartService } from '../../../core/services/cart.service';
import { JwtService } from '../../../core/services/jwt.service';
import { ToaterService } from '../../../core/services/toater.service';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, NavbarComponent],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css',
})
export class UsersComponent implements OnInit {
  products: any[] = [];
  productService = inject(ProductService);
  cartService = inject(CartService);
  jwtService = inject(JwtService);
  toasterService = inject(ToaterService);
  productId: number = 0;
  userId: number = 0;
  quantity: number = 1;

  ngOnInit(): void {
    this.getAllProducts();
    this.userId = this.jwtService.getUserId();
  }
  getAllProducts() {
    this.productService.getProducts().subscribe(
      (response: any) => {
        console.log('productResponse', response);
        if (response.status === 200) {
          this.products = response.product;

          console.log('productResponse2', this.products);
        } else {
          console.error('Error fetching products:', response.message);
        }
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }
  addItemsToCart(prId: number) {
    const payload = {
      prId: prId,
      userId: this.userId,
      quantity: 1,
    };
    this.cartService.addToCart(payload).subscribe(
      (response) => {
        if (response.status == 200) {
          this.toasterService.showSuccess('Item Addedd Successfully');
        } else {
          this.toasterService.showError('errror');
        }
      },
      (error) => {
        this.toasterService.showError('Unable to get response');
      }
    );
  }
}
