import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ApiIntergrationService } from '../../api-intergration.service';
import { Router, RouterLink } from '@angular/router';
import { provideToastr } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginValue: any = {};
  private http = inject(ApiIntergrationService);
  // private toaster = inject(provideToastr);
  private router = inject(Router);
  LoginData: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  // Login() {
  //   this.toaster.success('User Login sucessfully', '', {
  //     closeButton: true,
  //   });
  // }

  // notLogin() {
  //   this.toaster.error('Unable to Login', '', {
  //     closeButton: true,
  //   });
  // }
  loginData() {
    this.loginValue = this.LoginData.get('email')?.value;
    console.log(this.loginValue);
    this.http.loginApi(this.loginValue).subscribe(
      (res: any) => {
        if (res) {
          localStorage.setItem('accessToken', res.token);
          // this.Login();
          alert('User Login Successfully');

          localStorage.setItem('userId', res.data.aId);
          this.router.navigateByUrl('/videoChat');
        } else {
          // this.notLogin();
          alert('unable Login');
        }
      },
      (error) => {
        console.log(error);
        alert('Error occured, unable to get the response');
      }
    );
  }
}
