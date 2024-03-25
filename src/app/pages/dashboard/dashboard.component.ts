import { Component, OnInit } from '@angular/core';
import { ModalBase } from '../../shared/base/modal-base';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  constructor(private router: Router) {}
  ngOnInit() {
    this.router.navigate(['/domain']).then();
  }
}
