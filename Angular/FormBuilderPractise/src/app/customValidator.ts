import {
  AbstractControl,
  FormControlName,
  ValidationErrors,
} from '@angular/forms';

export function customValidator(
  control: AbstractControl
): ValidationErrors | null {
  if (control.value && control.value.length < 5) {
    return { minLength: 'name must be at least 5 character long' };
  }
  return null;
}
