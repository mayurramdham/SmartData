import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Route, Router, RouterLink } from '@angular/router';
import { ApiIntergrateService } from '../../services/api-intergrate.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  constructor(private router: Router) {}
  loginUserData: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });
  loginUserDataValue: any = {};
  private http = inject(ApiIntergrateService);

  loginUser() {
    this.loginUserDataValue = this.loginUserData.value;
    localStorage.setItem('email', this.loginUserData.get('email')?.value);
    console.log(this.loginUserDataValue);
    this.http.LoginApi(this.loginUserDataValue).subscribe(
      (res: any) => {
        if (res.status == 200) {
          alert('Otp sent to your mail');
          this.router.navigateByUrl('/VerifyOtp');
        } else {
          alert('Unable to login');
        }
      },
      (error) => {
        console.log('login error', error);
        alert('not get response');
      }
    );
  }
}
