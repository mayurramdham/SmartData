import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-provider-registration',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './provider-registration.component.html',
  styleUrl: './provider-registration.component.css',
})
export class ProviderRegistrationComponent {
  pateintRegisterForm: FormGroup;
  isLoading: boolean = false;
  states: any[] = [];
  countries: any[] = [];
  todayDate = new Date().toISOString().split('T')[0];
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  constructor(private fb: FormBuilder) {
    this.pateintRegisterForm = this.fb.group({});
  }
  validateMobileLength($event: any) {}
  validateZipcodeLength($event: any) {}
  removeNumbers($event: any) {}
  onFileSelect($event: any) {}
  onCountryChange($event: any) {}
  onSubmit() {}
}
