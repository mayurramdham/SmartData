import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  constructor(private http: HttpClient) {}
  getAllCoutries(): Observable<any> {
    return this.http.get('https://localhost:7059/api/dropDown/GetCountries');
  }
  getAllStateByCountryId(countryId: number): Observable<any> {
    return this.http.get(
      `https://localhost:7059/api/dropDown/GetStatesByCountry/${countryId}`
    );
  }
}
