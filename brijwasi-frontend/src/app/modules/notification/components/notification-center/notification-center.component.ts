import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Notification } from '@modules/notification/models/notification.model';

@Component({
  selector: 'app-notification-center',
  templateUrl: './notification-center.component.html',
  styleUrls: ['./notification-center.component.scss']
})
export class NotificationCenterComponent implements OnInit, OnDestroy {
  notifications: Notification[] = [];
  filteredNotifications: Notification[] = [];
  selectedFilter = 'all';
  loading = false;
  private destroy$ = new Subject<void>();

  filters = [
    { id: 'all', label: 'All' },
    { id: 'ORDER', label: 'Orders' },
    { id: 'PROMOTION', label: 'Promotions' },
    { id: 'SYSTEM', label: 'System' }
  ];

  constructor() {}

  ngOnInit(): void {
    this.loadNotifications();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private loadNotifications(): void {
    this.loading = true;
    // Mock notifications
    this.notifications = [
      {
        id: '1',
        userId: 'user1',
        title: 'Order Confirmed',
        message: 'Your order #1 has been confirmed',
        type: 'ORDER_CONFIRMED' as any,
        read: false,
        createdAt: new Date().toISOString(),
        relatedOrderId: '1'
      },
      {
        id: '2',
        userId: 'user1',
        title: 'Special Offer',
        message: 'Get 20% off on your next order',
        type: 'PROMOTION' as any,
        read: false,
        createdAt: new Date(Date.now() - 3600000).toISOString()
      },
      {
        id: '3',
        userId: 'user1',
        title: 'Order Delivered',
        message: 'Your order #1 has been delivered',
        type: 'ORDER_DELIVERED' as any,
        read: true,
        createdAt: new Date(Date.now() - 86400000).toISOString(),
        relatedOrderId: '1'
      }
    ];
    this.filteredNotifications = this.notifications;
    this.loading = false;
  }

  filterByType(type: string): void {
    this.selectedFilter = type;
    this.applyFilter();
  }

  private applyFilter(): void {
    if (this.selectedFilter === 'all') {
      this.filteredNotifications = this.notifications;
    } else {
      this.filteredNotifications = this.notifications.filter(n => n.type.toString().includes(this.selectedFilter));
    }
  }

  markAsRead(notificationId: string): void {
    const notification = this.notifications.find(n => n.id === notificationId);
    if (notification) {
      notification.read = true;
    }
  }

  markAllAsRead(): void {
    this.notifications.forEach(n => n.read = true);
  }

  deleteNotification(notificationId: string): void {
    this.notifications = this.notifications.filter(n => n.id !== notificationId);
    this.applyFilter();
  }

  getUnreadCount(): number {
    return this.notifications.filter(n => !n.read).length;
  }

  getTimeAgo(dateString: string): string {
    const date = new Date(dateString);
    const now = new Date();
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (seconds < 60) return 'just now';
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    return `${days}d ago`;
  }
}
