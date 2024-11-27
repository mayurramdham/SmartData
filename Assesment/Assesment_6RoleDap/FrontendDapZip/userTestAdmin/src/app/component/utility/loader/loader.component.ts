import { Component, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { LoaderService } from '../../../servies/loader.service';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [CommonModule, MatProgressSpinnerModule, MatProgressBarModule],
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.css',
})
export class LoaderComponent {
  isLoading!: Observable<boolean>;
  loadingValue: number = 0;
  private loadingService = inject(LoaderService);
  ngOnInit(): void {
    this.isLoading = this.loadingService.loading$; //asigning observers directly
    this.simulateLoading();
  }
  simulateLoading(): void {
    const interval = setInterval(() => {
      if (this.loadingValue < 100) {
        this.loadingValue += 10; // Increment the loading value
      } else {
        clearInterval(interval); // Clear the interval when loading is complete
      }
    }, 500); // Adjust the interval time as needed
  }
}
