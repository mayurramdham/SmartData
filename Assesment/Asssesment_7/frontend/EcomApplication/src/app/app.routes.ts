import { registerLocaleData } from '@angular/common';
import { Routes } from '@angular/router';
import { RegisterComponent } from './features/auth/register/register.component';

export const routes: Routes = [
  {
    path: '',
    component: RegisterComponent,
  },
];
