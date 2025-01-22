import { Component, inject } from '@angular/core';
import { ToasterService } from '../../core/toaster.service';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../core/auth.service';
import { Router, RouterLink } from '@angular/router';
import { JwtServiceService } from '../../core/jwt-service.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  private toasterService = inject(ToasterService);
  private authService = inject(AuthService);
  private router = inject(Router);
  private jwtService = inject(JwtServiceService);
  private currentRole = this.jwtService.getRole();
  isLoading: boolean = false;
  loginValue: any = {};
  test() {
    this.toasterService.showSuccess('test');
  }

  LoginData: FormGroup = new FormGroup({
    userEmail: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  loginUser() {
    this.loginValue = this.LoginData.value;
    this.isLoading = true;
    localStorage.setItem('userName', this.LoginData.get('userName')?.value);
    this.authService.loginUser(this.loginValue).subscribe({
      next: (response: any) => {
        if (response.status == 200) {
          this.isLoading = true;
          this.toasterService.showSuccess(response.message);
          localStorage.setItem('accessToken', response.data);
          if (this.currentRole == 'User') {
            this.router.navigateByUrl('dashboard/home');
          } else {
            this.router.navigateByUrl('dashboard/admin');
          }
        } else {
          this.isLoading = false;
          this.toasterService.showError(response.message);
        }
      },

      error: (error) => {
        this.isLoading = false;
        this.toasterService.showError(error.message);
      },
    });
  }
}
