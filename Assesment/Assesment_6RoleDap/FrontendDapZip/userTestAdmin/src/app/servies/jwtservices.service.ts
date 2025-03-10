import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class JwtservicesService {
  constructor() {}
  getRole() {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      const decodedToken: any = jwtDecode(accessToken);
      return decodedToken.role;
    }
  }
  getName() {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      const decodedToken: any = jwtDecode(accessToken);
      return decodedToken.Name;
    }
  }
}
