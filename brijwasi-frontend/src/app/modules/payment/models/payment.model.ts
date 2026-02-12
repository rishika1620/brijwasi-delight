/**
 * Payment method enum
 */
export enum PaymentMethod {
  CARD = 'CARD',
  UPISTRING = 'UPI',
  WALLET = 'WALLET',
  CASH = 'CASH'
}

/**
 * Payment status enum
 */
export enum PaymentStatus {
  PENDING = 'PENDING',
  PROCESSING = 'PROCESSING',
  SUCCESS = 'SUCCESS',
  FAILED = 'FAILED',
  CANCELLED = 'CANCELLED'
}

/**
 * Payment model
 */
export interface Payment {
  id: string;
  orderId: string;
  amount: number;
  currency: string;
  method: PaymentMethod;
  status: PaymentStatus;
  transactionId?: string;
  failureReason?: string;
  createdAt: string;
  updatedAt: string;
}

/**
 * Create payment request
 */
export interface CreatePaymentRequest {
  orderId: string;
  amount: number;
  method: PaymentMethod;
  paymentDetails?: Record<string, any>;
}

/**
 * Payment response
 */
export interface PaymentResponse {
  paymentId: string;
  transactionId?: string;
  status: PaymentStatus;
  redirectUrl?: string;
}
