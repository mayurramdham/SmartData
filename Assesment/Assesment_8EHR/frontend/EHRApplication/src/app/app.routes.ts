import { Routes } from '@angular/router';
import { LandingComponent } from './component/auth/landing/landing.component';
import { PatientregistrationComponent } from './component/auth/landing/patientregistration/patientregistration.component';
import { ProviderRegistrationComponent } from './component/auth/landing/provider-registration/provider-registration.component';
import { AuthComponent } from './component/auth/auth.component';
import { LoginComponent } from './component/auth/landing/login/login.component';
import { ForgetpasswordComponent } from './component/auth/landing/forgetpassword/forgetpassword.component';
import { VerifyOtpComponent } from './component/auth/landing/verify-otp/verify-otp.component';
import { HomeComponent } from './component/org/home/home.component';
import { OrgComponent } from './component/org/org.component';
import { ProfileComponent } from './component/org/profile/profile.component';
import { AppointmentComponent } from './component/org/appointment/appointment.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth/landing',
    pathMatch: 'full',
  },
  {
    path: 'auth',
    component: AuthComponent,
    children: [
      {
        path: 'landing',
        component: LandingComponent,
      },
      {
        path: 'patientRegistration',
        component: PatientregistrationComponent,
      },
      {
        path: 'providerRegistration',
        component: ProviderRegistrationComponent,
      },
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'forgetPassword',
        component: ForgetpasswordComponent,
      },
      {
        path: 'verifyOtp',
        component: VerifyOtpComponent,
      },
    ],
  },
  {
    path: 'org',
    component: OrgComponent,
    children: [
      {
        path: 'home',
        component: HomeComponent,
      },
      {
        path: 'profile',
        component: ProfileComponent,
      },
      {
        path: 'appointment',
        component: AppointmentComponent,
      },
    ],
  },
];
