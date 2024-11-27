import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ApiIntegrateService } from '../../api-integrate.service';

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.css',
})
export class ChangePasswordComponent {
  changeDataValue: any = {};
  private apiService = inject(ApiIntegrateService);
  changeData: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required]),
    oldPassword: new FormControl('', [Validators.required]),
    newPassword: new FormControl('', [Validators.required]),
  });

  changePassword() {
    this.changeDataValue = this.changeData.value();
    console.log(this.changeDataValue);
    this.apiService.forgetApi(this.changeDataValue).subscribe(
      (res: any) => {
        if (res.status == 200) {
          alert('Password Change successfuuly');
        } else {
          alert('unable to change password ');
        }
      },
      (error) => {
        alert('errror occured');
      }
    );
  }
}
