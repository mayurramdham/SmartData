import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-auth-component',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './auth-component.component.html',
  styleUrl: './auth-component.component.css',
})
export class AuthComponentComponent {}
