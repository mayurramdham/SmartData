import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { customInterceptor } from './interceptor/custom.interceptor';
import { provideToastr } from 'ngx-toastr';
import { NgxLoadingModule } from 'ngx-loading';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { loadingInterceptor } from './interceptor/loading.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(
      withInterceptors([customInterceptor, loadingInterceptor])
    ),
    provideAnimations(),
    provideToastr(),
    provideAnimationsAsync(),
  ],
};
