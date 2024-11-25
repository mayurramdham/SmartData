import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ApiIntergrateService } from '../../services/api-intergrate.service';

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
    email: new FormControl('@gmail.com', [
      Validators.required,
      Validators.email,
    ]),
    password: new FormControl('', [Validators.required]),
  });

  registerUserDataValue: any = {};
  private http = inject(ApiIntergrateService);
  RegisterUser() {
    this.registerUserDataValue = this.RegisterUserData.value;
    console.log(this.registerUserDataValue);

    this.http.registerData(this.registerUserDataValue).subscribe(
      (res: any) => {
        if (res.status == 200) {
          alert('user added successfully');
          this.router.navigateByUrl('/login');
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
