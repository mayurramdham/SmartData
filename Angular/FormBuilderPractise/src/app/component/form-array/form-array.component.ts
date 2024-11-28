import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  Form,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';

@Component({
  selector: 'app-form-array',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './form-array.component.html',
  styleUrl: './form-array.component.css',
})
export class FormArrayComponent {
  developerForm: FormGroup;
  skillSet = ['angular', 'js', 'ts', 'react', 'css'];

  constructor(private fb: FormBuilder) {
    this.developerForm = this.fb.group({
      developer: new FormControl(''),
      skills: this.fb.array([]),
      phoneNumber: this.fb.array([]),
    });
  }

  skills(): FormArray {
    return this.developerForm.get('skills') as FormArray;
  }
  phoneNumber(): FormArray {
    return this.developerForm.get('phoneNumber') as FormArray;
  }

  addSkills() {
    const skill = this.fb.group({
      skill: new FormControl(''),
      experiance: new FormControl(''),
    });
    this.skills().push(skill);
  }
  removeSkills(i: number) {
    this.skills().removeAt(i);
  }
  
  onsubmitForm() {
    console.log(this.developerForm.value);
  }
}
