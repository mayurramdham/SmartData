import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiIntergrationService {
  constructor(private http: HttpClient) {
    console.log('APiIntegrate');
  }

  postData(data: any): Observable<any> {
    return this.http.post<any>('https://localhost:7059/api/User', data);
  }

  loginApi(data: string): Observable<any> {
    return this.http.get<any>('https://localhost:7059/api/Otp/sendOtp');
  }
}
