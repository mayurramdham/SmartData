import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class JwtService {
  constructor() {}
  getRole() {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      const decodedToken: any = jwtDecode(accessToken);
      return decodedToken.role;
    }
  }
  getUserId() {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      const decodedToken: any = jwtDecode(accessToken);
      return decodedToken.UserId;
    }
  }
  getUserTypeId() {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      const decodedToken: any = jwtDecode(accessToken);
      return decodedToken.userTypeId;
    }
  }
  getFirstName() {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      const decodedToken: any = jwtDecode(accessToken);
      return decodedToken.Name;
    }
  }

  getLastName() {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      const decodedToken: any = jwtDecode(accessToken);
      return decodedToken.Email;
    }
  }
}
