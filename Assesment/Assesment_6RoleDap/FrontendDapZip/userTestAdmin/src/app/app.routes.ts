import { Routes } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { registerLocaleData } from '@angular/common';
import { RegisterComponent } from './component/register/register.component';
import { HomeComponent } from './component/home/home.component';
import { authGuardGuard } from './guards/auth-guard.guard';
import { ProfileComponent } from './component/profile/profile.component';
import { UsersComponent } from './component/users/users.component';
import { ChatComponent } from './component/chat/chat.component';
import { OrgComponent } from './component/org/org.component';
import { AuthComponent } from './component/auth/auth.component';

export const routes: Routes = [
  {
    path: '',
    // redirectTo: 'auth/login',
    redirectTo: 'org/home',
    pathMatch: 'full',

    // component: LoginComponent,
  },
  // {
  //   path: 'login',
  //   component: LoginComponent,
  // },
  // {
  //   path: 'register',
  //   component: RegisterComponent,
  // },

  // {
  //   path: 'home',
  //   component: HomeComponent,
  //   canActivate: [authGuardGuard],
  // },
  // {
  //   path: 'profile',
  //   component: ProfileComponent,
  //   canActivate: [authGuardGuard],
  // },
  // {
  //   path: 'users',
  //   component: UsersComponent,
  //   canActivate: [authGuardGuard],
  // },
  // {
  //   path: 'chat',
  //   component: ChatComponent,
  //   canActivate: [authGuardGuard],
  // },
  {
    path: 'auth',
    component: AuthComponent,
    children: [
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'register',
        component: RegisterComponent,
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
        canActivate: [authGuardGuard],
        data: { roles: ['admin', 'provider'] },
      },

      {
        path: 'users',
        component: UsersComponent,
        canActivate: [authGuardGuard],
        data: { roles: ['admin'] },
      },
      {
        path: 'chat',
        component: ChatComponent,
        canActivate: [authGuardGuard],
        data: { roles: ['admin', 'provider'] },
      },
      {
        path: 'profile',
        component: ProfileComponent,
        canActivate: [authGuardGuard],
        data: { roles: ['admin', 'provider'] },
      },
    ],
  },
];
