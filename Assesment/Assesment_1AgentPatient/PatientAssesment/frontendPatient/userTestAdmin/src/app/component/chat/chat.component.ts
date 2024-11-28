import { Component, inject } from '@angular/core';
import { NavbarComponent } from '../utility/navbar/navbar.component';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import * as signalR from '@microsoft/signalr';
import { CommonModule } from '@angular/common';
import { JwtservicesService } from '../../servies/jwtservices.service';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [NavbarComponent, ReactiveFormsModule, CommonModule],
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent {
  private hubConnection!: signalR.HubConnection;
  messages: { user: string; text: string; isMe: boolean }[] = [];
  chatForm: FormGroup;
  userName: string = ''; // Store logged-in user's name

  constructor(private jwtService: JwtservicesService) {
    // Fetch the logged-in user's name from the JWT service
    this.userName = this.jwtService.getName();
    console.log('Logged-in user is:', this.userName);

    // Initialize the form with only the message input, as user name is pre-filled
    this.chatForm = new FormGroup({
      message: new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {
    // Set up SignalR connection for real-time messaging
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('https://localhost:7059/chathub') // Replace with your backend URL
      .build();

    // Start the SignalR connection
    this.hubConnection
      .start()
      .then(() => console.log('SignalR Connected'))
      .catch((err) => console.error('Error connecting to SignalR:', err));

    // Listen for incoming messages
    this.hubConnection.on('ReceiveMessage', (user: string, text: string) => {
      const isMe = user === this.userName; // Check if the message is from the logged-in user
      this.messages.push({ user, text, isMe });
    });
  }

  sendMessage(): void {
    if (this.chatForm.valid) {
      const message = this.chatForm.get('message')?.value;

      // Send the message along with the current user's name (i.e., logged-in user)
      this.hubConnection
        .invoke('SendMessage', this.userName, message)
        .then(() => {
          this.chatForm.reset(); // Reset the message input field
        })
        .catch((err) => console.error('Error sending message:', err));
    }
  }
}
