import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AppointmentService {
  constructor(private http: HttpClient) {}
  addAppointment(data: any): Observable<any> {
    return this.http.post(
      'https://localhost:7059/api/Appointment/bookAppointment',
      data
    );
  }
  getProviderList(userTypeId: any): Observable<any> {
    return this.http.get(
      `https://localhost:7059/api/Appointment/getProvider/${userTypeId}`
    );
  }
}
