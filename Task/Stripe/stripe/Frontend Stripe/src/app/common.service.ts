import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

  
@Injectable({
    providedIn: 'root',
  })

export class CommonService{

constructor(
    private readonly _http: HttpClient
){}

api_url = "http://localhost:7096/api"


     /** Generic Http post request */
  post<T>(url: string, body: any, isShowLoader: boolean = true): Observable<T> {
    const fullUrl = `${this.api_url}/${url}`;

    if (!isShowLoader)
      return this._http.post<T>(fullUrl, body, { headers: this.getNoShowHeaders() });

    return this._http.post<T>(fullUrl, body);
  }

  private getNoShowHeaders() {
    return (new HttpHeaders()).set('X-No-Loader', 'true');
  }
  
}