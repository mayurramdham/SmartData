import { Routes } from '@angular/router';
import { RegisterComponent } from './component/register/register.component';
import { LoginComponent } from './component/login/login.component';
import { VerifyOtpComponent } from './component/verify-otp/verify-otp.component';
import { VideotokComponent } from './component/videotok/videotok.component';
import { guardsGuard } from './guards/guards.guard';
export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'VerifyOtp',
    component: VerifyOtpComponent,
  },
  {
    path: 'videoTok',
    component: VideotokComponent,
    canActivate: [guardsGuard],
  },
];
