import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AuthServicesService } from '../../../core/services/auth-services.service';
import { ToaterService } from '../../../core/services/toater.service';
import { JwtService } from '../../../core/services/jwt.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-otp',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, CommonModule],
  templateUrl: './otp.component.html',
  styleUrl: './otp.component.css',
})
export class OtpComponent {
  loginValue: any = {};
  authService = inject(AuthServicesService);
  toasterService = inject(ToaterService);
  jwtService = inject(JwtService);
  router = inject(Router);
  LoginData: FormGroup = new FormGroup({
    userName: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });
  loginUser() {
    this.loginValue = this.LoginData.value;
    localStorage.setItem('userName', this.LoginData.get('userName')?.value);

    this.authService.loginData(this.loginValue).subscribe({
      next: (response: any) => {
        if (response.status == 200) {
          console.log(response);
          this.toasterService.showSuccess('Otp send to given mailId');

          this.router.navigateByUrl('/auth/login');
        } else {
          this.toasterService.showError('invalid credentials');
        }
      },
      error: (error) => {
        console.log('login error', error);
        this.toasterService.showError('unable to add user');
      },
    });
  }
}
