import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonService } from '../../../../core/utility/common.service';
import { AuthService } from '../../../../core/auth/auth.service';
import { Router, RouterLink } from '@angular/router';
import { ToasterService } from '../../../../core/utility/toaster.service';

@Component({
  selector: 'app-patientregistration',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './patientregistration.component.html',
  styleUrl: './patientregistration.component.css',
})
export class PatientregistrationComponent implements OnInit {
  pateintRegisterForm: FormGroup;
  selectedFile: File | null = null;
  private commonService = inject(CommonService);
  private authService = inject(AuthService);
  private toasterService = inject(ToasterService);
  private route = inject(Router);
  isLoading: boolean = false;
  states: any[] = [];
  countries: any[] = [];
  todayDate = new Date().toISOString().split('T')[0];
  ngOnInit(): void {
    this.getAllCountries();
  }
  constructor(private fb: FormBuilder) {
    this.pateintRegisterForm = this.fb.group({
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
      city: ['', Validators.required],
      pincode: [
        '',
        [Validators.required, Validators.min(100000), Validators.max(999999)],
      ],
      bloodGroupId: ['', [Validators.required]],
      countryId: [''],
      stateId: [''],
      gender: ['', [Validators.required]],
    });
  }
  validateMobileLength($event: any) {}
  validateZipcodeLength($event: any) {}
  removeNumbers($event: any) {}
  onFileSelect(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.selectedFile = file; // Store the file for uploading
      console.log('file selected', this.selectedFile);
    }
  }
  onCountryChange(event: any) {
    const selectedCountryId = +event.target.value;
    console.log('selectedCountryId', selectedCountryId);
    this.commonService.getAllStateByCountryId(selectedCountryId).subscribe({
      next: (result: any) => {
        this.states = result.state;
        console.log('sgtate', this.states);
      },
      error: (error: Error) => {
        console.log(error);
      },
    });
  }

  onSubmit() {
    if (this.pateintRegisterForm.valid) {
      const formData = new FormData();

      Object.keys(this.pateintRegisterForm.value).forEach((key) => {
        formData.append(key, this.pateintRegisterForm.value[key]);
      });

      if (this.selectedFile) {
        formData.append(
          'profileImageUrl',
          this.selectedFile,
          this.selectedFile.name
        );
        console.log('Profile image:', this.selectedFile.name);
      }

      formData.append('userTypeId', '1');

      this.isLoading = true;
      this.authService.registerPatient(formData).subscribe(
        (response) => {
          console.log('Registration successful:', response);
          this.isLoading = true;
          this.toasterService.showSuccess('Registration successful');
          this.route.navigateByUrl('/auth/login');
        },
        (error) => {
          console.error('Error during registration:', error);
          this.isLoading = false;
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
    this.commonService.getAllCoutries().subscribe({
      next: (result: any) => {
        this.countries = result.country;
        console.log('countries data', this.countries);
      },
      error: (error: Error) => {
        console.log(error);
      },
    });
  }
}
