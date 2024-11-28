import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AuthServiceService } from '../../servies/auth-service.service';
import { ApiIntergrateServiceService } from '../../servies/api-intergrate-service.service';
import { NavbarComponent } from '../utility/navbar/navbar.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, NavbarComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent {
  user: any; // Holds the user details
  isLoading = true;

  constructor(
    private userService: ApiIntergrateServiceService,
    private authService: AuthServiceService
  ) {}

  ngOnInit(): void {
    const userId = this.authService.getUserId(); // Get user ID from localStorage

    if (userId !== null) {
      this.userService.getUserById(userId).subscribe({
        next: (data) => {
          console.log('profile data', data.data.firstName);
          this.user = data.data;
          this.isLoading = false;
        },
        error: (err) => {
          console.error('Error fetching user data:', err);
          this.isLoading = false;
        },
      });
    } else {
      console.error('User ID not found in localStorage.');
      this.isLoading = false;
    }
  }
}
