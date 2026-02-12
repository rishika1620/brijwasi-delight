import { Component, OnInit, OnDestroy } from '@angular/core';
import { ApiService, ErrorNotification } from '@core/services/api.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-error-notification',
  templateUrl: './error-notification.component.html',
  styleUrls: ['./error-notification.component.scss']
})
export class ErrorNotificationComponent implements OnInit, OnDestroy {
  errorMessage: string | null = null;
  statusCode: number | undefined;
  private destroy$ = new Subject<void>();
  private hideTimeout: any;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.errorNotification$
      .pipe(takeUntil(this.destroy$))
      .subscribe((notification: ErrorNotification | null) => {
        if (notification) {
          this.errorMessage = notification.message;
          this.statusCode = notification.statusCode;

          // Auto-hide error after 6 seconds
          if (this.hideTimeout) {
            clearTimeout(this.hideTimeout);
          }
          this.hideTimeout = setTimeout(() => {
            this.closeError();
          }, 6000);
        } else {
          this.errorMessage = null;
          this.statusCode = undefined;
        }
      });
  }

  closeError(): void {
    this.errorMessage = null;
    this.statusCode = undefined;
    this.apiService.errorNotification$.next(null);
  }

  ngOnDestroy(): void {
    if (this.hideTimeout) {
      clearTimeout(this.hideTimeout);
    }
    this.destroy$.next();
    this.destroy$.complete();
  }
}
