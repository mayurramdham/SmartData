import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { JwtservicesService } from '../../../servies/jwtservices.service';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  userName: string = ''; // Replace with actual user name from auth service
  isAdmin = false; // Replace with actual role check logic from auth service
  currentRole: string = '';

  constructor(private router: Router) {
    this.currentRole = this.jwtService.getRole();
    this.userName = this.jwtService.getName();
  }
  private jwtService = inject(JwtservicesService);
  private toaster = inject(ToastrService);
  showSuccess() {
    this.toaster.success('User Logout Successfully');
  }

  openChat() {
    // const chatModal: any = document.getElementById('chatModal');
    // const bootstrapModal = new bootstrap.Modal(chatModal);
    // bootstrapModal.show();
  }

  logout() {
    // Perform logout logic here
    this.showSuccess();
    alert('Logged out successfully!');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('userId');
    this.router.navigate(['/auth/login']); // Redirect to login page
  }

  Test() {
    console.log('in jwt test');
    const role = this.jwtService.getRole();
    const name = this.jwtService.getName();
    console.log('userName', name);
    console.log(role);
  }
}
