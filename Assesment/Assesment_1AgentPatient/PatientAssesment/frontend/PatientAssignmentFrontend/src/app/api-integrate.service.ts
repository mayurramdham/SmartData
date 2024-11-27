import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiIntegrateService {
  constructor(private http: HttpClient) {
    console.log('APiIntegrate');
  }

  postData(data: any): Observable<any> {
    return this.http.post<any>('http://localhost:5258/Register', data);
  }
  loginApi(data: any): Observable<any> {
    return this.http.post<any>('http://localhost:5258/loginuser', data);
  }
  forgetApi(data: any): Observable<any> {
    return this.http.post<any>('http://localhost:5258/ForgetPassword', data);
  }
  changeApi(data: any): Observable<any> {
    return this.http.post<any>('http://localhost:5258/ChangePassword', data);
  }
}
