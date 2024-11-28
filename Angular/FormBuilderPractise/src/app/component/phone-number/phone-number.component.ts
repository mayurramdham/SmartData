import { Component } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { customValidator } from '../../customValidator';

@Component({
  selector: 'app-phone-number',
  standalone: true,
  imports: [],
  templateUrl: './phone-number.component.html',
  styleUrl: './phone-number.component.css',
})
export class PhoneNumberComponent {
  form: FormGroup;
  constructor(private fb: FormBuilder) {
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required, customValidator]),
      phoneNumber: new FormControl([this.createPhoneNumber()]),
    });
  }
  createPhoneNumber(): FormGroup {
    return new FormGroup({
      phone: new FormControl('', [
        Validators.required,
        Validators.pattern(/^\d{10}$/),
      ]),
    });
  }

  addPhoneNumber() {
    (this.form.get('phoneNumber') as FormArray).push(this.createPhoneNumber());
  }
  removePhoneNumber() {
    (this.form.get('phoneNumber') as FormArray).push(this.createPhoneNumber());
  }
  get phoneNumber(): FormArray {
    return this.form.get('phoneNumber') as FormArray;
  }
}
