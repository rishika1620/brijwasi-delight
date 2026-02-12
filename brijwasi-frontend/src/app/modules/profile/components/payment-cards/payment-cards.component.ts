import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

interface PaymentCard {
  id?: number;
  cardType: 'CREDIT' | 'DEBIT' | 'UPI';
  cardHolderName: string;
  cardNumber: string;
  expiryMonth?: number;
  expiryYear?: number;
  upiId?: string;
  isDefault?: boolean;
  isActive?: boolean;
}

@Component({
  selector: 'app-profile-payment-cards',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './payment-cards.component.html',
  styleUrls: ['./payment-cards.component.scss']
})
export class PaymentCardsComponent implements OnInit, OnDestroy {
  paymentCards: PaymentCard[] = [];
  cardForm!: FormGroup;
  showCardForm = false;
  editingCardId: number | null = null;
  loading = false;
  submitted = false;
  successMessage: string | null = null;
  errorMessage: string | null = null;
  currentYear = new Date().getFullYear();
  private destroy$ = new Subject<void>();

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initializeForm();
    this.loadPaymentCards();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  initializeForm(): void {
    this.cardForm = this.fb.group({
      cardType: ['CREDIT', [Validators.required]],
      cardHolderName: ['', [Validators.required, Validators.minLength(3)]],
      cardNumber: ['', [Validators.required, Validators.pattern(/^\d{4}$/)]],
      expiryMonth: ['', [Validators.required, Validators.min(1), Validators.max(12)]],
      expiryYear: ['', [Validators.required, Validators.min(this.currentYear)]],
      upiId: [''],
      isDefault: [false]
    });
  }

  loadPaymentCards(): void {
    // TODO: Replace with API call to ProfileService
    // this.profileService.getPaymentCards()
    //   .pipe(takeUntil(this.destroy$))
    //   .subscribe(
    //     (response) => {
    //       this.paymentCards = response.data;
    //     },
    //     (error) => {
    //       this.errorMessage = 'Failed to load payment cards';
    //     }
    //   );

    // Mock data for demonstration
    this.paymentCards = [
      {
        id: 1,
        cardType: 'CREDIT',
        cardHolderName: 'John Doe',
        cardNumber: '4242',
        expiryMonth: 12,
        expiryYear: 2025,
        isDefault: true,
        isActive: true
      },
      {
        id: 2,
        cardType: 'DEBIT',
        cardHolderName: 'John Doe',
        cardNumber: '5555',
        expiryMonth: 8,
        expiryYear: 2026,
        isDefault: false,
        isActive: true
      },
      {
        id: 3,
        cardType: 'UPI',
        cardHolderName: 'John Doe',
        cardNumber: '',
        upiId: 'johndoe@upi',
        isDefault: false,
        isActive: true
      }
    ];
  }

  toggleCardForm(): void {
    this.showCardForm = !this.showCardForm;
    if (!this.showCardForm) {
      this.cancelEdit();
    }
  }

  saveCard(): void {
    this.submitted = true;

    if (this.cardForm.invalid) {
      this.errorMessage = 'Please fill in all required fields correctly';
      return;
    }

    this.loading = true;
    this.successMessage = null;
    this.errorMessage = null;

    const formValue = this.cardForm.value;

    // TODO: Replace with API calls
    // if (this.editingCardId) {
    //   this.profileService.updatePaymentCard(this.editingCardId, formValue)
    //     .pipe(takeUntil(this.destroy$))
    //     .subscribe(
    //       (response) => {
    //         this.paymentCards = this.paymentCards.map(c =>
    //           c.id === this.editingCardId ? response.data : c
    //         );
    //         this.resetForm();
    //       },
    //       (error) => {
    //         this.errorMessage = 'Failed to update card';
    //         this.loading = false;
    //       }
    //     );
    // } else {
    //   this.profileService.addPaymentCard(formValue)
    //     .pipe(takeUntil(this.destroy$))
    //     .subscribe(
    //       (response) => {
    //         this.paymentCards.push(response.data);
    //         this.resetForm();
    //       },
    //       (error) => {
    //         this.errorMessage = 'Failed to add card';
    //         this.loading = false;
    //       }
    //     );
    // }

    // Mock implementation
    setTimeout(() => {
      if (this.editingCardId) {
        const index = this.paymentCards.findIndex(c => c.id === this.editingCardId);
        if (index !== -1) {
          this.paymentCards[index] = { ...this.paymentCards[index], ...formValue };
          this.successMessage = 'Payment card updated successfully!';
        }
      } else {
        const newCard: PaymentCard = {
          ...formValue,
          id: Math.max(...this.paymentCards.map(c => c.id || 0)) + 1,
          isActive: true
        };
        this.paymentCards.push(newCard);
        this.successMessage = 'Payment card added successfully!';
      }
      this.resetForm();
      this.loading = false;
    }, 500);
  }

  editCard(card: PaymentCard): void {
    this.editingCardId = card.id || null;
    this.cardForm.patchValue(card);
    this.showCardForm = true;
    this.submitted = false;
  }

  cancelEdit(): void {
    this.editingCardId = null;
    this.cardForm.reset({ cardType: 'CREDIT', isDefault: false });
    this.submitted = false;
    this.showCardForm = false;
    this.successMessage = null;
    this.errorMessage = null;
  }

  deleteCard(id: number): void {
    if (!confirm('Are you sure you want to delete this card?')) {
      return;
    }

    // TODO: Replace with API call
    // this.profileService.deletePaymentCard(id)
    //   .pipe(takeUntil(this.destroy$))
    //   .subscribe(
    //     () => {
    //       this.paymentCards = this.paymentCards.filter(c => c.id !== id);
    //       this.successMessage = 'Payment card deleted successfully!';
    //     },
    //     (error) => {
    //       this.errorMessage = 'Failed to delete card';
    //     }
    //   );

    // Mock implementation
    this.paymentCards = this.paymentCards.filter(c => c.id !== id);
    this.successMessage = 'Payment card deleted successfully!';
  }

  setDefault(id: number): void {
    // TODO: Replace with API call
    // this.profileService.setDefaultPaymentCard(id)
    //   .pipe(takeUntil(this.destroy$))
    //   .subscribe(
    //     () => {
    //       this.paymentCards = this.paymentCards.map(c => ({
    //         ...c,
    //         isDefault: c.id === id
    //       }));
    //       this.successMessage = 'Default payment card updated!';
    //     },
    //     (error) => {
    //       this.errorMessage = 'Failed to set default card';
    //     }
    //   );

    // Mock implementation
    this.paymentCards = this.paymentCards.map(c => ({
      ...c,
      isDefault: c.id === id
    }));
    this.successMessage = 'Default payment card updated!';
  }

  getCardTypeIcon(cardType: string): string {
    switch (cardType) {
      case 'CREDIT':
        return '💳';
      case 'DEBIT':
        return '💳';
      case 'UPI':
        return '📱';
      default:
        return '💳';
    }
  }

  private resetForm(): void {
    this.cardForm.reset({ cardType: 'CREDIT', isDefault: false });
    this.submitted = false;
    this.editingCardId = null;
    this.showCardForm = false;
    setTimeout(() => {
      this.successMessage = null;
    }, 3000);
  }
}
