import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Order, OrderStatus } from '@modules/order/models/order.model';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent implements OnInit, OnDestroy {
  orders: Order[] = [];
  filteredOrders: Order[] = [];
  selectedStatus: string = 'all';
  loading = false;
  private destroy$ = new Subject<void>();

  orderStatuses = [
    { id: 'all', label: 'All Orders' },
    { id: 'CONFIRMED', label: 'Confirmed' },
    { id: 'PREPARING', label: 'Preparing' },
    { id: 'PACKED', label: 'Packed' },
    { id: 'ON_THE_WAY', label: 'On the Way' },
    { id: 'DELIVERED', label: 'Delivered' },
    { id: 'CANCELLED', label: 'Cancelled' }
  ];

  constructor() {}

  ngOnInit(): void {
    this.loadOrders();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private loadOrders(): void {
    this.loading = true;
    // Mock orders data
    this.orders = [
      {
        id: '1',
        userId: 'user1',
        items: [
          { id: 'oi1', menuItemId: '1', menuItemName: 'Biryani Special', quantity: 2, price: 250 }
        ],
        deliveryAddress: { id: 'addr1', userId: 'user1', label: 'Home', street: '123 Main St', city: 'City', state: 'State', postalCode: '123456', country: 'India', isDefault: true },
        status: 'DELIVERED' as any,
        totalAmount: 550,
        deliveryFee: 50,
        taxAmount: 27.5,
        createdAt: '2025-01-20',
        updatedAt: '2025-01-20'
      },
      {
        id: '2',
        userId: 'user1',
        items: [
          { id: 'oi2', menuItemId: '2', menuItemName: 'Paneer Tikka', quantity: 1, price: 280 }
        ],
        deliveryAddress: { id: 'addr1', userId: 'user1', label: 'Home', street: '123 Main St', city: 'City', state: 'State', postalCode: '123456', country: 'India', isDefault: true },
        status: 'ON_THE_WAY' as any,
        totalAmount: 330,
        deliveryFee: 50,
        taxAmount: 16.5,
        createdAt: '2025-01-27',
        updatedAt: '2025-01-27'
      }
    ];
    this.filteredOrders = this.orders;
    this.loading = false;
  }

  filterByStatus(status: string): void {
    this.selectedStatus = status;
    this.applyFilters();
  }

  private applyFilters(): void {
    if (this.selectedStatus === 'all') {
      this.filteredOrders = this.orders;
    } else {
      this.filteredOrders = this.orders.filter(order => order.status === this.selectedStatus);
    }
  }

  getStatusBadge(status: string): string {
    const statusMap: { [key: string]: string } = {
      'CONFIRMED': 'badge-info',
      'PREPARING': 'badge-primary',
      'PACKED': 'badge-primary',
      'ON_THE_WAY': 'badge-primary',
      'DELIVERED': 'badge-success',
      'CANCELLED': 'badge-danger'
    };
    return statusMap[status] || 'badge-secondary';
  }

  getStatusLabel(status: string): string {
    return status.replace(/_/g, ' ').toUpperCase();
  }
}
