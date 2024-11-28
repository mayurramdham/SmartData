import { inject } from '@angular/core';
import { CanActivateChildFn, Router } from '@angular/router';
import { ApiServiceService } from './services/api-service.service';

export const canActiveChildGuard: CanActivateChildFn = (childRoute, state) => {
  const router = inject(Router);
  const Api = inject(ApiServiceService);
  let isLoggedIn = Api.getToken();
  if (isLoggedIn) {
    return true;
  } else {
    router.navigate(['']); 
    return false;
  }
};
