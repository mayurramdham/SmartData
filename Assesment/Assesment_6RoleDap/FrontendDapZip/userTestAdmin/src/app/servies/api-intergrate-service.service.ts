import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiIntergrateServiceService {
  constructor(private http: HttpClient) {}
  registerData(data: any): Observable<any> {
    return this.http.post<any>(
      'https://localhost:7059/api/User/register',
      data
    );
  }
  LoginApi(data: any): Observable<any> {
    return this.http.post('https://localhost:7059/loginUser', data);
  }
  getUserById(id: number): Observable<any> {
    return this.http.get(`https://localhost:7059/api/User/${id}`);
  }
  getAllUser(pageSize: number, pageNumber: number): Observable<any> {
    return this.http.get(
      `https://localhost:7059/api/User/getPage/${pageSize}/${pageNumber}`
    );
  }
  deleteUser(id: number): Observable<any> {
    return this.http.delete(`https://localhost:7059/api/User/${id}`);
  }
  updateUser(user: any): Observable<any> {
    return this.http.put<any>(
      `https://localhost:7059/api/User/${user.Id}`,
      user
    );
  }
}
