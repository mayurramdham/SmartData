import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { JwtService } from '../../../../core/services/jwt.service';
import { ToaterService } from '../../../../core/services/toater.service';
import { AuthServicesService } from '../../../../core/services/auth-services.service';
import { CartService } from '../../../../core/services/cart.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit {
  userId?: number;
  usersData: any = {};
  userName: string = ''; // Replace with actual user name from auth service
  isAdmin = false; // Replace with actual role check logic from auth service
  currentRole: string = '';

  constructor(private router: Router) {
    this.currentRole = this.jwtService.getRole();
    this.userName = this.jwtService.getName();
    this.userId = this.jwtService.getUserId();
  }
  ngOnInit(): void {
    if (this.userId) this.getUserData(this.userId);
    console.log('currentRole', this.currentRole);
  }
  private jwtService = inject(JwtService);
  private authService = inject(AuthServicesService);
  private toaster = inject(ToaterService);
  private cartService = inject(CartService);
  logout() {
    // Perform logout logic here

    alert('Logged out successfully!');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('userId');
    localStorage.removeItem('userName');
    this.router.navigate(['/auth/login']); // Redirect to login page
  }
  goToCart() {
    this.router.navigate(['/product/cart']);
  }
  Test() {
    console.log('in jwt test');
    const role = this.jwtService.getRole();
    const name = this.jwtService.getName();
    const userId = this.jwtService.getUserId();
    console.log('userId', userId);
  }
  getUserData(userId: number) {
    console.log('id', userId);
    this.authService.getUserById(userId).subscribe((response) => {
      if (response.status == 200) {
        this.usersData = response.userData;
        console.log('userData', this.usersData);
      }
    });
  }
  //*****cart data*******/
  // getCartItemCount() {
  //   const userId = 1; // You can dynamically fetch this user ID from session/authentication state
  //   this.cartService.getProductFromCart(userId).subscribe(
  //     (response: any) => {
  //       if (response.status === 200) {
  //         this.cartItemCount = response.cartItems.length;
  //       }
  //     },
  //     (error) => {
  //       this.cartItemCount = 0;
  //     }
  //   );
  // }
}
