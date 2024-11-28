import { Routes } from '@angular/router';
import { FormArrayComponent } from './component/form-array/form-array.component';
import { PhoneNumberComponent } from './component/phone-number/phone-number.component';

export const routes: Routes = [
  {
    path: '',
    component: FormArrayComponent,
  },
  {
    path: 'phone-number',
    component: PhoneNumberComponent,
  },
];
