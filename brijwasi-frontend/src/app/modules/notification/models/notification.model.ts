/**
 * Notification type enum
 */
export enum NotificationType {
  ORDER_CONFIRMED = 'ORDER_CONFIRMED',
  ORDER_PREPARING = 'ORDER_PREPARING',
  ORDER_PACKED = 'ORDER_PACKED',
  ORDER_ON_THE_WAY = 'ORDER_ON_THE_WAY',
  ORDER_DELIVERED = 'ORDER_DELIVERED',
  PAYMENT_SUCCESS = 'PAYMENT_SUCCESS',
  PAYMENT_FAILED = 'PAYMENT_FAILED',
  PROMOTION = 'PROMOTION',
  SYSTEM = 'SYSTEM'
}

/**
 * Notification model
 */
export interface Notification {
  id: string;
  userId: string;
  type: NotificationType;
  title: string;
  message: string;
  relatedOrderId?: string;
  read: boolean;
  actionUrl?: string;
  createdAt: string;
  updatedAt?: string;
}

/**
 * Mark notification as read request
 */
export interface MarkAsReadRequest {
  notificationIds: string[];
}
