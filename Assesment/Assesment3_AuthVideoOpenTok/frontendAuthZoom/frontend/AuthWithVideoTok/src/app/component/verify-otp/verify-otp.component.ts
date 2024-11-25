import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ApiIntergrateService } from '../../services/api-intergrate.service';

@Component({
  selector: 'app-verify-otp',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './verify-otp.component.html',
  styleUrl: './verify-otp.component.css',
})
export class VerifyOtpComponent {
  constructor(private route: Router) {}
  private http = inject(ApiIntergrateService);
  otpData: FormGroup = new FormGroup({
    userName: new FormControl(''),
    emailOtp: new FormControl('', [Validators.required]),
  });
  otpDataValue: any = {};

  otpVerify() {
    // this.otpDataValue = this.otpData.get('emailOtp')?.value;
    // const otpValue = Number(this.otpData.get('emailOtp')?.value);
    // console.log(otpValue);
    if (this.otpData.value) {
      const otpValue = Number(this.otpData.get('emailOtp')?.value);
      const payload = {
        emailOtp: otpValue,
        userName: localStorage.getItem('email'),
      };
      console.log('OTP value:', otpValue, typeof otpValue);

      // const otpPayload = { emailOtp: otpValue };
      // console.log('Sending OTP Payload:', otpPayload);

      this.http.VerifyOtpApi(payload).subscribe(
        (res: any) => {
          console.log('api response', res);
          console.error('error at verify');
          if (res.status == 200) {
            alert('Login Successfully');
            localStorage.removeItem('email');
            localStorage.setItem('accessToken', res.token);
            this.route.navigateByUrl('/videoTok');
          } else {
            alert('error occured');
          }
        },
        (error) => {
          console.log(error);
          alert('unable to get the response');
        }
      );
    } else {
      alert('Please enter a valid OTP');
    }
  }
}
