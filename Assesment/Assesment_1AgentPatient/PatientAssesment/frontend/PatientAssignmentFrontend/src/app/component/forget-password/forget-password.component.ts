import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ApiIntegrateService } from '../../api-integrate.service';

@Component({
  selector: 'app-forget-password',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.css',
})
export class ForgetPasswordComponent {
  forrgetValue: any = {};
  private apiService = inject(ApiIntegrateService);
  forgetData: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required]),
    resetPassword: new FormControl(''),
  });

  forgetPassword() {
    this.forrgetValue = this.forgetData.value;
    console.log('forget data', this.forrgetValue);
    this.apiService.forgetApi(this.forrgetValue).subscribe(
      (res: any) => {
        if (res.status == 200) {
          alert('Forgot Password Done');
        } else {
          alert('unable to forget');
        }
      },
      (error) => {
        alert('Error at Forgot ');
      }
    );
  }
}
