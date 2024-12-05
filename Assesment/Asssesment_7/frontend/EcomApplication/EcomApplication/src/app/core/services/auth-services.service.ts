import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthServicesService {
  constructor(private http: HttpClient) {}
  registerData(data: any): Observable<any> {
    return this.http.post<any>(
      'https://localhost:7227/api/User/register',
      data
    );
  }
  loginData(data: any): Observable<any> {
    return this.http.post<any>('https://localhost:7227/api/User/Otp', data);
  }
  verfiOtp(data: any): Observable<any> {
    return this.http.post<any>('https://localhost:7227/api/User/login', data);
  }
  getUserById(userId: any): Observable<any> {
    return this.http.get<any>(
      `https://localhost:7227/api/User/getUserById/${userId}`
    );
  }
}
