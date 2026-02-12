import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '@core/services/api.service';
import { Order, CreateOrderRequest } from '@modules/order/models/order.model';
import { ApiResponse } from '@shared/models/api.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  constructor(private apiService: ApiService) {}

  /**
   * Create new order
   */
  createOrder(orderData: CreateOrderRequest): Observable<ApiResponse<Order>> {
    return this.apiService.post<Order>('/orders', orderData);
  }

  /**
   * Get all orders for user
   */
  getUserOrders(): Observable<ApiResponse<Order[]>> {
    return this.apiService.get<Order[]>('/orders');
  }

  /**
   * Get order by id
   */
  getOrder(orderId: string): Observable<ApiResponse<Order>> {
    return this.apiService.get<Order>(`/orders/${orderId}`);
  }

  /**
   * Cancel order
   */
  cancelOrder(orderId: string): Observable<ApiResponse<Order>> {
    return this.apiService.post<Order>(`/orders/${orderId}/cancel`, {});
  }

  /**
   * Track order
   */
  trackOrder(orderId: string): Observable<ApiResponse<any>> {
    return this.apiService.get<any>(`/orders/${orderId}/track`);
  }
}
