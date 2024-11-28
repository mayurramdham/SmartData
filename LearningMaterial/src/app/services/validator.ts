import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function customValidator(control: AbstractControl): ValidationErrors | null {
 
  if (control.value && control.value.length < 5) {
    return { 'minLengthError': 'Input must be at least 5 characters long' };
  }
  return null;
}