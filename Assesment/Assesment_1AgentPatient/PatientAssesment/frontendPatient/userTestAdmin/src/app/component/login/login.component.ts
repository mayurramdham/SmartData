import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ApiIntergrateServiceService } from '../../servies/api-intergrate-service.service';
import { AuthServiceService } from '../../servies/auth-service.service';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  isloading: boolean = false;
  constructor(private router: Router) {}
  loginUserData: FormGroup = new FormGroup({
    userEmail: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    // roles: new FormControl('', [Validators.required]), // not required we are already send while creatting account
  });
  loginUserDataValue: any = {};
  private http = inject(ApiIntergrateServiceService);
  private authService = inject(AuthServiceService);
  private toaster = inject(ToastrService);
  showSuccess() {
    this.toaster.success('User Login Successfully', '', {
      closeButton: true,
    });
  }
  showError() {
    this.toaster.error('unabled to login', '', {
      closeButton: true,
    });
  }

  loginUser() {
    this.isloading = true;
    this.loginUserDataValue = this.loginUserData.value;
    console.log(this.loginUserDataValue);
    this.http.LoginApi(this.loginUserDataValue).subscribe(
      (res: any) => {
        console.log('login response', res);
        console.error('error at verify');
        if (res.status == 200) {
          this.showSuccess();
          alert('Login Successfully');
          const userId = res.userData; //  API returns `userId`
          this.authService.saveUserId(userId);
          localStorage.setItem('accessToken', res.token);
          this.router.navigateByUrl('/org/home');
        } else {
          this.showError();
          this.isloading = true;
          alert('Unable to login');
        }
      },
      (error) => {
        this.isloading = true;
        console.log('login error', error);
        alert('not get response');
      }
    );
  }
}
