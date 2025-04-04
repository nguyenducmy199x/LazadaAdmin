// src/app/shared/alert/alert.service.ts

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type AlertType = 'success' | 'error' | 'info' | 'warning';

export interface AlertData {
  message: string;
  type: AlertType;
  show: boolean;
}

@Injectable({ providedIn: 'root' })
export class AlertService {
  private alertSubject = new BehaviorSubject<AlertData | null>(null);
  alert$ = this.alertSubject.asObservable();

  show(message: string, type: AlertType = 'info', duration: number = 3000) {
    this.alertSubject.next({ message, type, show: true });
    if (duration > 0) {
      setTimeout(() => {
        this.alertSubject.next(null);
      }, duration);
    }
  }

  clear() {
    this.alertSubject.next(null);
  }
}
