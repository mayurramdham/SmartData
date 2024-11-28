
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {
  private apiUrl = 'https://api.example.com/data';
  constructor(private http: HttpClient) {
   
   }

  // getData(): Observable<any> {
  //   return this.service.get<any>(this.apiUrl + "test");
  // }
  postData(data: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, data);
  }

  isLoggedIn: boolean = false
  private service = inject(ApiServiceService)
  getToken(): boolean {
      let token = localStorage.getItem("isLoggedIn") ?? "false"
    if (token == "true") {
      return true
    } else {
      return false
    }
  }
}
