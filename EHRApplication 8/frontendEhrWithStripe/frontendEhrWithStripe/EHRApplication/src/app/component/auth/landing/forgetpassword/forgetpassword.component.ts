import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../../core/auth/auth.service';
import { ToasterService } from '../../../../core/utility/toaster.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-forgetpassword',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './forgetpassword.component.html',
  styleUrl: './forgetpassword.component.css',
})
export class ForgetpasswordComponent {
  emailForm!: FormGroup;
  resetPasswordForm!: FormGroup;
  isLoading: boolean = false;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private toasterService: ToasterService
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
      const payload = {
        email: this.emailForm.value.email,
      };
      console.log('Sending reset link to:', payload);
      this.authService.forgotPassword(payload).subscribe({
        next: (response) => {
          if ((response.status = 200)) {
            this.isLoading = true;
            this.router.navigateByUrl('/auth/login');
            this.toasterService.showSuccess('new password sent to your mail');
          } else {
            this.isLoading = false;
            this.toasterService.showError(
              'invalid email address or user dosent exist'
            );
          }
        },
        error: (error) => {
          this.isLoading = false;
          console.log('error at forgetpassword', error);
          this.toasterService.showError('unable to get the response');
        },
      });
    }
  }

  resetPassword(): void {
    if (this.resetPasswordForm.valid) {
      const newPassword = this.resetPasswordForm.value.newPassword;
      console.log('Resetting password to:', newPassword);
      this.router.navigate(['/auth/login']);
    }
  }
}
