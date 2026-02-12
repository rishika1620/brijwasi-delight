import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SharedModule } from '@shared/shared.module';
import { PaymentRoutingModule } from './payment-routing.module';
import { CheckoutComponent } from './components/checkout/checkout.component';

@NgModule({
  declarations: [CheckoutComponent],
  imports: [CommonModule, ReactiveFormsModule, FormsModule, SharedModule, PaymentRoutingModule]
})
export class PaymentModule {}
