import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
export const guardsGuard: CanActivateFn = (route, state) => {
  const token = localStorage.getItem('access_token');

  const router = inject(Router);

  if (token) {
    return true;
  } else {
    router.navigateByUrl('/Login');
    return false;
  }
};
