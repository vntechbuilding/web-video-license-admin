import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-pages-template',
  standalone: true,
  imports: [
    RouterOutlet,
    NzIconModule,
    NzLayoutModule,
    NzMenuModule,
    RouterLink,
    NgIf,
  ],
  templateUrl: './pages-template.component.html',
  styleUrl: './pages-template.component.scss',
})
export class PagesTemplateComponent {
  isCollapsed = false;
}
