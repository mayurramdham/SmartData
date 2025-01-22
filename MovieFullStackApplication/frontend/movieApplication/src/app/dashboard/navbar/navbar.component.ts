import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MovieService } from '../../core/movie.service';
import { FormsModule } from '@angular/forms';
import { JwtServiceService } from '../../core/jwt-service.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  query: string = '';

  searchResults: any[] = [];
  private jwtService = inject(JwtServiceService);
  apiKey: string = this.jwtService.getApiKey(); // Replace with your actual API key
  constructor(private movieSearch: MovieService) {}

  onSearch(): void {
    if (
      this.query.length === 2 ||
      this.query.length === 5 ||
      this.query.length === 7
    ) {
      this.movieSearch.searchMovie(this.query, this.apiKey).subscribe(
        (results) => {
          console.log(this.apiKey);
          this.searchResults = results;
          console.log(this.searchResults);
        },
        (error) => {
          console.error('Error fetching movie data', error);
        }
      );
    }
  }
}
