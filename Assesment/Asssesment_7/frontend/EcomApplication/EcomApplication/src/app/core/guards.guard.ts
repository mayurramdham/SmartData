import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

export const guardsGuard: CanActivateFn = (route, state) => {
  const accessToken = localStorage.getItem('accessToken');
  const router = inject(Router);

  if (accessToken) {
    try {
      const decodedToken: any = jwtDecode(accessToken);
      const currentTime = Math.floor(Date.now() / 1000);

      if (decodedToken.exp > currentTime) {
        const requiredRoles: string[] = route.data?.['roles'] || [];
        const userRole: string = decodedToken.role;

        if (requiredRoles.length && !requiredRoles.includes(userRole)) {
          console.error('Access denied: Invalid Role');
          router.navigate(['/auth/sendOtp']); // Redirect to login or unauthorized page
          return false;
        }

        return true; // User has a valid token and required role
      } else {
        // Token is expired
        localStorage.removeItem('accessToken');
        router.navigate(['/auth/sendOtp']);
        return false;
      }
    } catch (error) {
      console.error('Invalid token:', error);
      localStorage.removeItem('accessToken');
      router.navigate(['/auth/sendOtp']);
      return false;
    }
  } else {
    router.navigate(['/auth/sendOtp']);
    return false;
  }
};
