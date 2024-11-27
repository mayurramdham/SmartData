import { CommonModule } from '@angular/common';
import { Component, Inject, inject } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { ApiIntegrateService } from '../../api-integrate.service';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, HttpClientModule, RouterLink],
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent {
  userData: FormGroup = new FormGroup({
    // userID: new FormControl(0),
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  // constructor(private loginService: LoginProcessService) {}
  userDataValue: any = {};
  constructor(
    private apiIntegration: ApiIntegrateService,
    private router: Router
  ) {}

  AddUser() {
    this.userDataValue = this.userData.value;
    console.log(this.userDataValue, 'form');
    const formDatatype = this.userData.value;

    // Check data types and values
    Object.entries(formDatatype).forEach(([key, value]) => {
      console.log(`${key}: ${typeof value}, value: ${value}`);
    });

    this.apiIntegration.postData(this.userDataValue).subscribe(
      (res: any) => {
        if (res.status == 200) {
          alert('User Added Successfullky');
          console.log('Executing successfully');
          this.router.navigateByUrl('/login');
        } else {
          alert('unable to Add User');
        }
      },
      (error) => {
        console.log(error);
        alert('not execute');
      }
    );
  }
}
