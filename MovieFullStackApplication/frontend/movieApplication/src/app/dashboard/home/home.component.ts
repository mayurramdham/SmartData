import { Component, inject, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { MovieService } from '../../core/movie.service';
import { CommonModule } from '@angular/common';
import { JwtServiceService } from '../../core/jwt-service.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  private movieService = inject(MovieService);
  query: string = '';
  searchResults: any[] = [];
  private jwtService = inject(JwtServiceService);
  apiKey: string = this.jwtService.getApiKey(); // Replace with your actual API key
  constructor(private movieSearch: MovieService) {}

  onSearch(): void {
    if (this.query.length === 0) {
      this.getAllMovies();
    } else if (
      this.query.length >= 1
    ) {
      this.movieService.searchMovie(this.query, this.apiKey).subscribe(
        (results) => {
          this.searchResults = results.data;
        },
        (error) => {
          console.error('Error fetching movie data', error);
        }
      );
    } else {
      this.searchResults = [];
    }
  }

  movies: any[] = [];
  ngOnInit(): void {
    this.getAllMovies();
  }
  getAllMovies() {
    this.movieService.getAllMovie().subscribe({
      next: (response: any) => {
        if (response.status == 200) {
          this.searchResults = response.data;
          console.log('moviesdata', this.movies);
        }
      },
      error: (response) => {
        console.error(response);
      },
    });
  }
}
