import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ApiService } from '@core/services/api.service';
import { Notification } from '@modules/notification/models/notification.model';
import { ApiResponse } from '@shared/models/api.model';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private unreadCount = new BehaviorSubject<number>(0);
  public unreadCount$ = this.unreadCount.asObservable();

  constructor(private apiService: ApiService) {
    this.loadUnreadCount();
  }

  /**
   * Get all notifications
   */
  getNotifications(): Observable<ApiResponse<Notification[]>> {
    return this.apiService.get<Notification[]>('/notifications');
  }

  /**
   * Get unread notifications
   */
  getUnreadNotifications(): Observable<ApiResponse<Notification[]>> {
    return this.apiService.get<Notification[]>('/notifications/unread');
  }

  /**
   * Mark notification as read
   */
  markAsRead(notificationId: string): Observable<ApiResponse<Notification>> {
    return this.apiService.put<Notification>(`/notifications/${notificationId}/read`, {});
  }

  /**
   * Mark all as read
   */
  markAllAsRead(): Observable<ApiResponse<any>> {
    return this.apiService.put<any>('/notifications/read-all', {});
  }

  /**
   * Delete notification
   */
  deleteNotification(notificationId: string): Observable<ApiResponse<any>> {
    return this.apiService.delete<any>(`/notifications/${notificationId}`);
  }

  /**
   * Get unread count
   */
  getUnreadCount(): Observable<ApiResponse<number>> {
    return this.apiService.get<number>('/notifications/unread-count');
  }

  /**
   * Load unread count
   */
  private loadUnreadCount(): void {
    this.getUnreadCount().subscribe({
      next: (response) => {
        if (response.success) {
          this.unreadCount.next(response.data);
        }
      }
    });
  }

  /**
   * Update unread count
   */
  updateUnreadCount(count: number): void {
    this.unreadCount.next(count);
  }
}
