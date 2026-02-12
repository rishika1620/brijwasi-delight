import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '@core/services/api.service';
import { Payment, ProcessPaymentRequest } from '@modules/payment/models/payment.model';
import { ApiResponse } from '@shared/models/api.model';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  constructor(private apiService: ApiService) {}

  /**
   * Process payment
   */
  processPayment(paymentData: ProcessPaymentRequest): Observable<ApiResponse<Payment>> {
    return this.apiService.post<Payment>('/payments/process', paymentData);
  }

  /**
   * Get payment by order id
   */
  getPaymentByOrder(orderId: string): Observable<ApiResponse<Payment>> {
    return this.apiService.get<Payment>(`/payments/order/${orderId}`);
  }

  /**
   * Verify payment
   */
  verifyPayment(transactionId: string): Observable<ApiResponse<Payment>> {
    return this.apiService.get<Payment>(`/payments/verify/${transactionId}`);
  }

  /**
   * Get payment by id
   */
  getPayment(paymentId: string): Observable<ApiResponse<Payment>> {
    return this.apiService.get<Payment>(`/payments/${paymentId}`);
  }
}
