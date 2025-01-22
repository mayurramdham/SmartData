import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}
  registerUser(register: any): Observable<any> {
    return this.http.post('https://localhost:7059/api/User/register', register);
  }
  loginUser(login: any): Observable<any> {
    return this.http.post('https://localhost:7059/loginUser', login);
  }
}
