import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
export const guardsGuard: CanActivateFn = (route, state) => {
  const token = localStorage.getItem('accessToken');

  const router = inject(Router);

  if (token) {
    try {
      const decodedToken: any = jwtDecode(token);
      const currentTime = Math.floor(Date.now() / 1000);

      if (decodedToken.exp > currentTime) {
        // const userId = decodedToken.UserId; // <-- Get the userId from the decoded token
        // console.log('User ID:', userId); // You can use the userId as needed

        return true; // Token is valid
      } else {
        // Token is expired
        localStorage.removeItem('accessToken');
        router.navigate(['/login']);
        return false;
      }
    } catch (error) {
      console.error('Invalid token:', error);
      localStorage.removeItem('accessToken');
      router.navigate(['/login']);
      return false;
    }
  } else {
    router.navigateByUrl('/login');
    return false;
  }
};
