import { Target } from '@angular/compiler';
import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AuthServicesService } from '../../../core/services/auth-services.service';
import { CommonModule } from '@angular/common';
import { DropdownService } from '../../../core/services/dropdown.service';
import { ToaterService } from '../../../core/services/toater.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  selectedFile: File | null = null;
  registerFormValue = {};
  countries: any[] = [];
  states: any[] = [];
  filteredStates: any[] = [];
  isLoading: boolean = false;
  authService = inject(AuthServicesService);
  dropdownService = inject(DropdownService);
  toasterService = inject(ToaterService);
  router = inject(Router);
  todayDate = new Date().toISOString().split('T')[0];
  userTypes = [
    { id: 1, name: 'Admin' },
    { id: 2, name: 'User' },
  ];
  // countries = [
  //   { id: 1, name: 'India' },
  //   { id: 2, name: 'USA' },
  // ];
  // states: { id: number; name: string }[] = [];
  ngOnInit(): void {
    this.getAllCountries();
    //  this.getStateByCountryId();
    this.filteredStates = [];
  }
  removeNumbers(event: KeyboardEvent) {
    const charCode = event.charCode;

    if (charCode >= 48 && charCode <= 57) {
      event.preventDefault();
    }
  }

  //formGroup Data Binding
  constructor(private fb: FormBuilder) {
    this.registerForm = this.fb.group({
      firstName: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(12),
        ],
      ],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      dob: ['', Validators.required],
      mobile: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      address: ['', Validators.required],
      zipcode: [
        '',
        [Validators.required, Validators.min(100000), Validators.max(999999)],
      ],
      userTypeId: ['', Validators.required],
      countryId: [''],
      stateId: [''],
    });
  }

  validateMobileLength(event: Event): void {
    const input = event.target as HTMLInputElement;
    const value = input.value;

    if (value.length > 10) {
      // Limit the input to 6 digits
      input.value = value.slice(0, 10);
    }
  }

  validateZipcodeLength(event: Event): void {
    const input = event.target as HTMLInputElement;
    const value = input.value;

    if (value.length > 6) {
      // Limit the input to 6 digits
      input.value = value.slice(0, 6);
    }
  }

  //Functions Api Calling
  onCountryChange(event: any) {
    const selectedCountryId = +event.target.value;
    console.log('selectedCountryId', selectedCountryId);
    this.dropdownService.getAllStateByCountryId(selectedCountryId).subscribe({
      next: (result: any) => {
        this.states = result.state;
        console.log('sgtate', this.states);
      },
      error: (error: Error) => {
        console.log(error);
      },
    });
  }

  onFileSelect(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.selectedFile = file; // Store the file for uploading
    }
  }
  onSubmit(): void {
    this.isLoading = true;
    if (this.registerForm.valid) {
      const formData = new FormData();
      formData.append('userTyeId', '1');
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
          this.toasterService.showSuccess('Registration successful');
          this.router.navigateByUrl('/auth/sendOtp');
        },
        (error) => {
          console.error('Error during registration:', error);
          this.isLoading = true;
          this.toasterService.showError(
            'Registration failed. Please try again.'
          );
        }
      );
    } else {
      this.toasterService.showError('Please fill all required fields.');
      return;
    }
  }
  getAllCountries() {
    this.dropdownService.getAllCoutries().subscribe(
      (response) => {
        this.countries = response.country;
        console.log(this.countries);
      },
      (error) => {
        console.log(error);
      }
    );
  }
  getStateByCountryId(selectedCountryId: number) {
    this.dropdownService.getAllStateByCountryId(selectedCountryId).subscribe(
      (response) => {
        console.log('state data found');
        this.states = response.state;
        console.log(this.states);
      },

      (error) => {
        console.log(error);
      }
    );
  }
}
