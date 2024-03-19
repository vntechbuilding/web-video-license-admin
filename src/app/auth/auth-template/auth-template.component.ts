import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-auth-template',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './auth-template.component.html',
  styleUrl: './auth-template.component.scss',
})
export class AuthTemplateComponent {}
