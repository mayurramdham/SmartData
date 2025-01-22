import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  constructor(private http: HttpClient) {}
  getAllMovie(): Observable<any> {
    return this.http.get('https://localhost:7059/api/Movie/getAllMovieData');
  }
  searchMovie(query: string, apikey: string): Observable<any> {
    return this.http.get(
      `https://localhost:7059/api/Movie/getAllMovie?s=${query}&apikey=${apikey}`
    );
  }
}
