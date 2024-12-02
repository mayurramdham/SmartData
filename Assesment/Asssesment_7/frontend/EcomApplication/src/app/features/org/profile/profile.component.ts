import { Component, inject } from '@angular/core';
import { AuthServicesService } from '../../../core/services/auth-services.service';
import { JwtService } from '../../../core/services/jwt.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent {
  userData: any;
  jwtService = inject(JwtService);

  constructor(private authService: AuthServicesService) {}

  ngOnInit(): void {
    const userId = this.jwtService.getUserId();
    // Replace with actual logic to get userId
    this.getUserData(userId);
  }

  getUserData(userId: number): void {
    this.authService.getUserById(userId).subscribe((response: any) => {
      if (response.status === 200) {
        this.userData = response.userData;
        console.log('User Data:', this.userData);
      }
    });
  }

  formatDate(dateString: string | undefined): string {
    if (!dateString) return '';
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  }

  getUserType(userTypeId: number | undefined): string {
    if (userTypeId === 1) return 'Admin';
    if (userTypeId === 2) return 'Customer';
    return 'Unknown';
  }
}
