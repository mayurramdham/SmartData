import { Component } from '@angular/core';
import { OpenTokService } from '../../service/open-tok.service';

@Component({
  selector: 'app-video-chat-app',
  standalone: true,
  imports: [],
  templateUrl: './video-chat-app.component.html',
  styleUrl: './video-chat-app.component.css',
})
export class VideoChatAppComponent {
  constructor(private openTokService: OpenTokService) {}

  ngOnInit(): void {
    this.openTokService.initializeSession();
  }
}
