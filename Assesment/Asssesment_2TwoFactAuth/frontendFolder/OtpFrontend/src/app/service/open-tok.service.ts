import { Injectable } from '@angular/core';
import OT from '@opentok/client';

@Injectable({
  providedIn: 'root',
})
export class OpenTokService {
  private apiKey: string = 'YOUR_API_KEY';
  private sessionId: string = 'YOUR_SESSION_ID';
  private token: string = 'YOUR_TOKEN';
  private session: OT.Session;
  private publisher!: OT.Publisher;

  constructor() {
    this.session = OT.initSession(this.apiKey, this.sessionId);
  }

  initializeSession() {
    this.session.on('streamCreated', (event) => {
      this.session.subscribe(event.stream, 'subscriber', {
        insertMode: 'append',
        width: '100%',
        height: '100%',
      });
    });

    this.session.connect(this.token, (error) => {
      if (error) {
        console.error('Failed to connect:', error.message);
      } else {
        this.publisher = OT.initPublisher('publisher', {
          insertMode: 'append',
          width: '100%',
          height: '100%',
        });
        this.session.publish(this.publisher);
      }
    });
  }
}
