import { Routes } from '@angular/router';
import { SignUpComponent } from './component/sign-up/sign-up.component';
import { LoginComponent } from './component/login/login.component';
import { PatientFormComponent } from './component/patient-form/patient-form.component';
import { ForgetPasswordComponent } from './component/forget-password/forget-password.component';
import { ChangePasswordComponent } from './component/change-password/change-password.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: 'login', component: LoginComponent },
  //   {
  //     path: 'Patient',
  //     component: PatientComponent,
  //     canActivate: [authGuard],
  //   },
  //   { path: 'login', component: LoginComponent },
  { path: 'SignUp', component: SignUpComponent },
  { path: 'patientForm', component: PatientFormComponent },
  { path: 'forgetPassword', component: ForgetPasswordComponent },
  { path: 'changePassword', component: ChangePasswordComponent },
];
