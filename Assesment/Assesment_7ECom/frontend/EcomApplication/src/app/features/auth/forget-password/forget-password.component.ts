import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthServicesService } from '../../../core/services/auth-services.service';
import { Router } from '@angular/router';
import { ToaterService } from '../../../core/services/toater.service';

@Component({
  selector: 'app-forget-password',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.css',
})
export class ForgetPasswordComponent implements OnInit {
  emailForm!: FormGroup;

  resetPasswordForm!: FormGroup;

  isResettingPassword = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthServicesService,
    private toasterService: ToaterService
  ) {}

  ngOnInit(): void {
    this.emailForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });

    this.resetPasswordForm = this.fb.group(
      {
        newPassword: ['', [Validators.required, Validators.minLength(6)]],
        confirmNewPassword: ['', [Validators.required]],
      },
      { validators: this.passwordMatchValidator }
    );
  }

  passwordMatchValidator(group: FormGroup): { [key: string]: boolean } | null {
    const password = group.get('newPassword')?.value;
    const confirmPassword = group.get('confirmNewPassword')?.value;
    return password && confirmPassword && password !== confirmPassword
      ? { passwordMismatch: true }
      : null;
  }

  sendResetLink(): void {
    if (this.emailForm.valid) {
      const email = this.emailForm.value.email;

      console.log('Sending reset link to:', email);
      this.authService.forgotPassword(email).subscribe(
        (response) => {
          if (response.status == 200) {
            this.router.navigateByUrl('/auth/sendOtp');
            this.toasterService.showSuccess(
              'new password send on your email id'
            );
          } else {
            this.toasterService.showError(
              'Enter valid email adddress user not exists '
            );
          }
        },
        (error) => {
          console.log(error);
          this.toasterService.showError('Unable to get response');
        }
      );
      this.isResettingPassword = true;
    }
  }

  resetPassword(): void {
    if (this.resetPasswordForm.valid) {
      const newPassword = this.resetPasswordForm.value.newPassword;
      // Simulate resetting the password (call backend API)
      console.log('Resetting password to:', newPassword);
      // Navigate to login or show a success message
      this.router.navigate(['/auth/login']);
    }
  }

  // Toggle between the forms
  toggleForm(): void {
    this.isResettingPassword = !this.isResettingPassword;
  }
}
