import { Routes } from '@angular/router';
import { LandingComponent } from './component/landing/landing.component';
import { PatientregistrationComponent } from './component/patientregistration/patientregistration.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'landing',
    pathMatch: 'full',
  },
  {
    path: 'landing',
    component: LandingComponent,
  },
  {
    path: 'patientRegistration',
    component: PatientregistrationComponent,
  },
];
