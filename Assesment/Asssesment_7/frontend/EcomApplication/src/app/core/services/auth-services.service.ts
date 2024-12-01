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
  getAllCoutries(): Observable<any> {
    return this.http.get('https://localhost:7227/api/Dropdown/GetCountries');
  }
  getAllStateByCountryId(countryId: number): Observable<any> {
    return this.http.get(
      `https://localhost:7227/api/Dropdown/GetStatesByCountry${countryId}`
    );
  }
}
