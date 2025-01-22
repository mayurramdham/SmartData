import { Routes } from '@angular/router';
import { AuthenticationComponent } from './authentication/authentication.component';
import { RegisterComponent } from './authentication/register/register.component';
import { LoginComponent } from './authentication/login/login.component';
import { HomeComponent } from './dashboard/home/home.component';
import { AdminComponent } from './dashboard/admin/admin.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth/login',
    pathMatch: 'full',
  },
  {
    path: 'auth',
    component: AuthenticationComponent,
    children: [
      {
        path: 'register',
        component: RegisterComponent,
      },
      {
        path: 'login',
        component: LoginComponent,
      },
    ],
  },
  {
    path: 'dashboard/home',
    component: HomeComponent,
  },
  {
    path: 'dashboard/admin',
    component: AdminComponent,
  },
];
