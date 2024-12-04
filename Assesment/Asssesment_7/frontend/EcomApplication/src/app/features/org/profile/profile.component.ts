import { Component, inject } from '@angular/core';
import { AuthServicesService } from '../../../core/services/auth-services.service';
import { JwtService } from '../../../core/services/jwt.service';
import { NavbarComponent } from '../../auth/utility/navbar/navbar.component';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ToaterService } from '../../../core/services/toater.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [NavbarComponent, CommonModule, ReactiveFormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent {
  userData: any;
  changePasswordForm: FormGroup;
  jwtService = inject(JwtService);
  toasterService = inject(ToaterService);

  constructor(
    private authService: AuthServicesService,
    private fb: FormBuilder
  ) {
    this.changePasswordForm = this.fb.group(
      {
        username: ['', [Validators.required, Validators.minLength(3)]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
      },
      {
        // Custom validator to ensure passwords match
        validator: this.passwordsMatchValidator,
      }
    );
  }

  openModal() {
    const modal = document.getElementById('changePasswordModal');
    if (modal) {
      modal.style.display = 'block';
      modal.classList.add('show');
      modal.setAttribute('aria-hidden', 'false');
    }
  }

  closeModal() {
    const modal = document.getElementById('changePasswordModal');
    if (modal) {
      modal.style.display = 'none';
      modal.classList.remove('show');
      modal.setAttribute('aria-hidden', 'true');
    }
  }

  changePasswordModal(product: any) {
    console.log('product', product);

    // this.productForm.get('PrName')?.setValue(product.pr)
    // this.productForm.get()
    const modal = document.getElementById('changePasswordModal');
    if (modal) {
      modal.style.display = 'block';
      modal.classList.add('show');
      modal.setAttribute('aria-hidden', 'false');
    }
  }

  passwordsMatchValidator(group: FormGroup): { [key: string]: boolean } | null {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;

    return password && confirmPassword && password !== confirmPassword
      ? { passwordMismatch: true }
      : null;
  }

  onSubmit(): void {
    if (this.changePasswordForm.invalid) {
      console.log('Form is invalid!');
      return;
    }
    const payload = {
      username: this.changePasswordForm.get('username')?.value,
      password: this.changePasswordForm.get('password')?.value,
    };
    console.log('payload is', payload);
    this.authService.changePassword(payload).subscribe(
      (response) => {
        if (response.status == 200) {
          this.toasterService.showSuccess('Password Change Successfully');
        } else {
          this.toasterService.showError('Unable to chnage the password');
        }
      },
      (error) => {
        this.toasterService.showError('unable to get response');
      }
    );
    const { username, password } = this.changePasswordForm.value;
    console.log(`Password for ${username} changed to ${password}`);
  }

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
