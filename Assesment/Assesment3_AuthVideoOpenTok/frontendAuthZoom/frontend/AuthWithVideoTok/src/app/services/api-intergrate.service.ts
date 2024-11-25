import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiIntergrateService {
  constructor(private http: HttpClient) {}
  registerData(data: any): Observable<any> {
    return this.http.post<any>('https://localhost:7059/api/User', data);
  }
  LoginApi(data: any): Observable<any> {
    return this.http.post('https://localhost:7059/loginUser', data);
  }
  VerifyOtpApi(data: any): Observable<any> {
    return this.http.post(`https://localhost:7059/api/Otp/VerifyOtp/`, data);
  }
  ZoomApi(): Observable<any> {
    return this.http.get('https://localhost:7059/api/Zoom/CreateMeeting');
  }
  Url = 'https://localhost:7059/api/Zoom/CreateMeeting';

  createMeeting$(): Observable<any> {
    return this.http.get(`${this.Url}`);
  }
}
