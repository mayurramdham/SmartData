import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthServicesService } from '../../../core/services/auth-services.service';
import { ToaterService } from '../../../core/services/toater.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  authService = inject(AuthServicesService);
  toasterService = inject(ToaterService);
  router = inject(Router);
  otpDataValue: any = {};
  otpData: FormGroup = new FormGroup({
    userName: new FormControl(''),
    otpCode: new FormControl('', [
      Validators.required,
      Validators.pattern(/^\d{6}$/), // Ensures only 6-digit numbers are valid
    ]),
  });

  otpVerify() {
    // this.otpDataValue = this.otpData.get('emailOtp')?.value;
    // const otpValue = Number(this.otpData.get('emailOtp')?.value);
    // console.log(otpValue);
    if (this.otpData.value) {
      const otpValue = Number(this.otpData.get('otpCode')?.value);
      const payload = {
        OtpCode: otpValue,
        userName: localStorage.getItem('userName'),
      };
      console.log('payload', payload);
      console.log('OTP value:', otpValue, typeof otpValue);

      // const otpPayload = { emailOtp: otpValue };
      // console.log('Sending OTP Payload:', otpPayload);

      this.authService.verfiOtp(payload).subscribe(
        (res: any) => {
          console.log('api response', res);
          console.error('error at verify');
          if (res.status == 200) {
            this.toasterService.showSuccess('Login Successfully');

            localStorage.removeItem('email');
            localStorage.setItem('accessToken', res.token);
            this.router.navigateByUrl('/org/home');
          } else {
            this.toasterService.showError('Invalid otp or otp expired');
          }
        },
        (error) => {
          console.log(error);
          this.toasterService.showError('unable to get the response');
        }
      );
    } else {
      this.toasterService.showError('Please enter a valid OTP');
    }
  }
}
