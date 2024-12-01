import { Target } from '@angular/compiler';
import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AuthServicesService } from '../../../core/services/auth-services.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  selectedFile: File | null = null;
  registerFormValue = {};
  authService = inject(AuthServicesService);
  userTypes = [
    { id: 1, name: 'Admin' },
    { id: 2, name: 'Customer' },
  ];
  countries = [
    { id: 1, name: 'India' },
    { id: 2, name: 'USA' },
  ];
  states: { id: number; name: string }[] = [];
  ngOnInit(): void {
    this.getAllCountries();
  }

  //formGroup Data Binding
  constructor(private fb: FormBuilder) {
    this.registerForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      dob: ['', Validators.required],
      // userName: [{ value: '', disabled: true }],
      // password: ['', Validators.required],
      mobile: ['', Validators.required],
      address: ['', Validators.required],
      zipcode: ['', [Validators.required, Validators.pattern(/^\d{6}$/)]],
      userTypeId: ['', Validators.required],
      countryId: [''],
      stateId: [''],
    });
  }

  //Functions Api Calling
  onCountryChange(event: Event) {
    // Mock states filtering
    const target = event.target as HTMLSelectElement;
    const value = target.value;
    console.log(value);
    const countryId = target.value;
    if (countryId === '1') {
      this.states = [
        { id: 1, name: 'Maharashtra' },
        { id: 2, name: 'Gujarat' },
      ];
    } else if (countryId === '2') {
      this.states = [
        { id: 3, name: 'California' },
        { id: 4, name: 'Texas' },
      ];
    } else {
      this.states = [];
    }
    this.registerForm.controls['stateId'].setValue('');
  }

  // onSubmit() {
  //   if (this.registerForm.valid) {
  //     console.log(this.registerForm.value);
  //     this.registerFormValue = this.registerForm.value;
  //     alert('Registration Successful!');
  //     this.authService.registerData(this.registerFormValue).subscribe((res) => {
  //       if ((res.status = 200)) {
  //         alert('user registered successfully');
  //       } else {
  //         alert('unabled to add user');
  //       }
  //     });
  //   }
  // }
  onFileSelect(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.selectedFile = file; // Store the file for uploading
    }
  }
  onSubmit(): void {
    if (this.registerForm.valid) {
      const formData = new FormData();

      // Append form values to FormData
      Object.keys(this.registerForm.value).forEach((key) => {
        formData.append(key, this.registerForm.value[key]);
      });

      // Append the profile image
      if (this.selectedFile) {
        formData.append(
          'profileImage',
          this.selectedFile,
          this.selectedFile.name
        );
        console.log(
          'profile images',
          this.selectedFile,
          this.selectedFile.name
        );
      }

      // Call the service method
      this.authService.registerData(formData).subscribe(
        (response) => {
          console.log('Registration successful:', response);
          alert('Registration successful!');
        },
        (error) => {
          console.error('Error during registration:', error);
          alert('Registration failed. Please try again.');
        }
      );
    } else {
      alert('Please fill all required fields.');
    }
  }
  getAllCountries() {
    this.authService.getAllCoutries().subscribe(
      (response) => {
        console.log('all state data');
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
