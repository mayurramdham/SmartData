import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ApiIntegrateService } from '../../api-integrate.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginValue: any = {};
  private http = inject(ApiIntegrateService);
  private router = inject(Router);
  LoginData: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });
  loginData() {
    this.loginValue = this.LoginData.value;
    console.log(this.loginValue);
    this.http.loginApi(this.loginValue).subscribe(
      (res: any) => {
        if (res.status == 200) {
          alert('User Login Successfully');
          this.router.navigateByUrl('/patientForm');
        } else {
          alert('unable Login');
        }
      },
      (error) => {
        alert('Error occured, unable to get the response');
      }
    );
  }
}
