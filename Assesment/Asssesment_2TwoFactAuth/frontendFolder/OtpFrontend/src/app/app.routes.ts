import { Routes } from '@angular/router';
// import { RegisterComponent } from './component/register/register.component';
import { VideoChatAppComponent } from './component/video-chat-app/video-chat-app.component';
import { RegisterComponent } from './component/register/register.component';
import { LoginComponent } from './component/login/login.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'videoChat',
    component: VideoChatAppComponent,
  },
];
