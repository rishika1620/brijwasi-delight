import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { OrderRoutingModule } from './order-routing.module';
import { OrderListComponent } from './components/order-list/order-list.component';

@NgModule({
  declarations: [OrderListComponent],
  imports: [CommonModule, SharedModule, OrderRoutingModule]
})
export class OrderModule {}
