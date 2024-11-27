import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { ApiIntergrateServiceService } from '../../servies/api-intergrate-service.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  constructor(private router: Router) {}
  RegisterUserData: FormGroup = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    userEmail: new FormControl('@gmail.com', [
      Validators.required,
      Validators.email,
    ]),
    password: new FormControl('', [Validators.required]),
    roles: new FormControl('', [Validators.required]),
  });

  registerUserDataValue: any = {};
  private http = inject(ApiIntergrateServiceService);

  RegisterUser() {
    this.registerUserDataValue = this.RegisterUserData.value;
    console.log(this.registerUserDataValue);

    this.http.registerData(this.registerUserDataValue).subscribe(
      (res: any) => {
        if (res.status == 200) {
          alert('user added successfully');
          this.router.navigateByUrl('/auth/login');
        } else {
          alert('Unable to register User');
        }
      },
      (error) => {
        console.log(error);
        alert('not execute');
      }
    );
  }
}
