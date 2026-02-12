import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CartService } from '@modules/cart/services/cart.service';
import { OrderService } from '@modules/order/services/order.service';
import { CreateOrderRequest } from '@modules/order/models/order.model';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit, OnDestroy {
  checkoutForm!: FormGroup;
  paymentForm!: FormGroup;
  cartItems: any[] = [];
  totalPrice = 0;
  loading = false;
  currentStep = 1;
  private destroy$ = new Subject<void>();

  paymentMethods = [
    { id: 'card', name: 'Credit/Debit Card', icon: '💳' },
    { id: 'wallet', name: 'Wallet', icon: '👝' },
    { id: 'upi', name: 'UPI', icon: '📱' },
    { id: 'cod', name: 'Cash on Delivery', icon: '💰' }
  ];

  constructor(
    private formBuilder: FormBuilder,
    private cartService: CartService,
    private orderService: OrderService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initializeForms();
    this.loadCart();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private initializeForms(): void {
    this.checkoutForm = this.formBuilder.group({
      deliveryAddress: ['', [Validators.required, Validators.minLength(10)]],
      city: ['', Validators.required],
      pincode: ['', [Validators.required, Validators.pattern(/^[0-9]{6}$/)]],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      specialInstructions: ['']
    });

    this.paymentForm = this.formBuilder.group({
      paymentMethod: ['card', Validators.required],
      cardHolder: ['', Validators.required],
      cardNumber: ['', [Validators.required, Validators.pattern(/^[0-9]{16}$/)]],
      expiryDate: ['', Validators.required],
      cvv: ['', [Validators.required, Validators.pattern(/^[0-9]{3}$/)]]
    });
  }

  private loadCart(): void {
    this.cartService.cartItems$
      .pipe(takeUntil(this.destroy$))
      .subscribe(items => {
        this.cartItems = items;
        this.calculateTotal();
      });
  }

  private calculateTotal(): void {
    this.totalPrice = this.cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  }

  nextStep(): void {
    if (this.currentStep === 1 && this.checkoutForm.invalid) {
      return;
    }
    if (this.currentStep < 2) {
      this.currentStep++;
    }
  }

  previousStep(): void {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  placeOrder(): void {
    if (this.paymentForm.invalid) {
      return;
    }

    this.loading = true;
    const orderData: CreateOrderRequest = {
      deliveryAddressId: 'addr-1', // This would come from selected address
      notes: this.checkoutForm.value.specialInstructions,
      appliedCouponCode: undefined
    };

    this.orderService.createOrder(orderData)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          this.loading = false;
          if (response.success) {
            this.cartService.clearCart();
            this.router.navigate(['/orders']);
          }
        },
        error: (error) => {
          this.loading = false;
          alert('Order placement failed. Please try again.');
        }
      });
  }

  get deliveryAddress() {
    return this.checkoutForm.get('deliveryAddress');
  }

  get city() {
    return this.checkoutForm.get('city');
  }

  get pincode() {
    return this.checkoutForm.get('pincode');
  }
}
