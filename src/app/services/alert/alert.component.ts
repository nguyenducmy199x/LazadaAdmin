// src/app/shared/alert/alert.component.ts

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertService, AlertData } from './alert.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-alert',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div *ngIf="alert$ | async as alert" class="custom-alert" [ngClass]="alert.type">
      {{ alert.message }}
      <span class="close-btn" (click)="close()">×</span>
    </div>
  `,
  styles: [`
    .custom-alert {
      position: fixed;
      top: 20px;
      right: 20px;
      z-index: 9999;
      padding: 16px 24px;
      border-radius: 8px;
      color: #fff;
      font-weight: bold;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
      animation: fadeInOut 3s ease-in-out;
    }

    .success { background-color: #4CAF50; border: 2px solid #3e8e41; }
    .error { background-color: #f44336; border: 2px solid #d32f2f; }
    .info { background-color: #2196F3; border: 2px solid #1976d2; }
    .warning { background-color: #ff9800; border: 2px solid #f57c00; }

    .close-btn {
      margin-left: 10px;
      cursor: pointer;
      font-size: 20px;
    }

    @keyframes fadeInOut {
      0% { opacity: 0; transform: translateY(-20px); }
      10% { opacity: 1; transform: translateY(0); }
      90% { opacity: 1; transform: translateY(0); }
      100% { opacity: 0; transform: translateY(-20px); }
    }
  `]
})
export class AlertComponent {
  alert$: Observable<AlertData | null>;

  constructor(private alertService: AlertService) {
    this.alert$ = this.alertService.alert$;
  }

  close() {
    this.alertService.clear();
  }
}
