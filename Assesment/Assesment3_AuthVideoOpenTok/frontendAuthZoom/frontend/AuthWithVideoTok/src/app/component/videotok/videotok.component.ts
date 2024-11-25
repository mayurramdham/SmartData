import { Component } from '@angular/core';
import { ApiIntergrateService } from '../../services/api-intergrate.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-videotok',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './videotok.component.html',
  styleUrl: './videotok.component.css',
})
export class VideotokComponent {
  meetingResponse: any = null; // This will store the meeting details to display
  loading: boolean = false; // To show loading indicator while waiting for API response
  error: string = ''; // To show any errors from the API

  constructor(private zoomService: ApiIntergrateService) {}

  createMeeting() {
    this.loading = true; // Show loading while making the API call
    debugger;
    this.zoomService.createMeeting$().subscribe(
      {
        next: (res: any) => {
          this.loading = false;
          this.meetingResponse = res.data;
        },
        error: (err: any) => {
          this.loading = false;

          console.log('Error to creating meeting : ', err);
        },
      }
      // (response) => {
      //   this.loading = false;
      //   this.meetingResponse = response.data; // Store the response data
      // },
      // (error) => {
      //   this.loading = false;
      //   this.error = 'Failed to create meeting: ' + error.message;
      // }
    );
  }
}
