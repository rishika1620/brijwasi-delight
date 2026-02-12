/**
 * Order status enum
 */
export enum OrderStatus {
  CONFIRMED = 'CONFIRMED',
  PREPARING = 'PREPARING',
  PACKED = 'PACKED',
  ON_THE_WAY = 'ON_THE_WAY',
  DELIVERED = 'DELIVERED',
  CANCELLED = 'CANCELLED'
}

/**
 * Order item model
 */
export interface OrderItem {
  id: string;
  menuItemId: string;
  menuItemName: string;
  quantity: number;
  price: number;
  addons?: string[];
  notes?: string;
}

/**
 * Delivery address model
 */
export interface DeliveryAddress {
  id: string;
  userId: string;
  label: string;
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  latitude?: number;
  longitude?: number;
  isDefault: boolean;
}

/**
 * Order model
 */
export interface Order {
  id: string;
  userId: string;
  items: OrderItem[];
  deliveryAddress: DeliveryAddress;
  status: OrderStatus;
  totalAmount: number;
  deliveryFee: number;
  taxAmount: number;
  discountAmount?: number;
  notes?: string;
  createdAt: string;
  updatedAt: string;
  estimatedDeliveryTime?: string;
}

/**
 * Create order request
 */
export interface CreateOrderRequest {
  deliveryAddressId: string;
  notes?: string;
  appliedCouponCode?: string;
}
