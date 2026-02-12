import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AuthService } from '@modules/auth/services/auth.service';

interface Address {
  id?: number;
  label: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  mobileNumber: string;
  landmark?: string;
  isDefault?: boolean;
  isActive?: boolean;
}

@Component({
  selector: 'app-profile-addresses',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './addresses.component.html',
  styleUrls: ['./addresses.component.scss']
})
export class AddressesComponent implements OnInit, OnDestroy {
  addresses: Address[] = [];
  addressForm!: FormGroup;
  showAddressForm = false;
  editingAddressId: number | null = null;
  loading = false;
  submitted = false;
  successMessage: string | null = null;
  errorMessage: string | null = null;
  private destroy$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.loadAddresses();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  initializeForm(): void {
    this.addressForm = this.fb.group({
      label: ['', [Validators.required]],
      street: ['', [Validators.required, Validators.minLength(5)]],
      city: ['', [Validators.required]],
      state: ['', [Validators.required]],
      zipCode: ['', [Validators.required, Validators.pattern(/^[0-9]{5}$/)]],
      country: ['', [Validators.required]],
      mobileNumber: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      landmark: [''],
      isDefault: [false]
    });
  }

  loadAddresses(): void {
    // TODO: Call profile service to fetch addresses
    // For now, mock data
    this.addresses = [
      {
        id: 1,
        label: 'Home',
        street: '123 Main St',
        city: 'New York',
        state: 'NY',
        zipCode: '10001',
        country: 'USA',
        mobileNumber: '9876543210',
        landmark: 'Near Central Park',
        isDefault: true,
        isActive: true
      }
    ];
  }

  toggleAddressForm(): void {
    this.showAddressForm = !this.showAddressForm;
    this.editingAddressId = null;
    this.addressForm.reset();
    this.submitted = false;
  }

  editAddress(address: Address): void {
    this.editingAddressId = address.id || null;
    this.showAddressForm = true;
    this.addressForm.patchValue(address);
    this.submitted = false;
  }

  deleteAddress(id: number): void {
    if (confirm('Are you sure you want to delete this address?')) {
      // TODO: Call profile service to delete address
      this.addresses = this.addresses.filter(a => a.id !== id);
      this.successMessage = 'Address deleted successfully';
      setTimeout(() => this.successMessage = null, 3000);
    }
  }

  saveAddress(): void {
    this.submitted = true;
    this.errorMessage = null;
    this.successMessage = null;

    if (this.addressForm.invalid) {
      return;
    }

    this.loading = true;
    const formValue = this.addressForm.value;

    if (this.editingAddressId) {
      // TODO: Call profile service to update address
      const index = this.addresses.findIndex(a => a.id === this.editingAddressId);
      if (index !== -1) {
        this.addresses[index] = { ...formValue, id: this.editingAddressId };
        this.successMessage = 'Address updated successfully';
      }
    } else {
      // TODO: Call profile service to create address
      this.addresses.push({ ...formValue, id: Date.now() });
      this.successMessage = 'Address added successfully';
    }

    this.loading = false;
    this.addressForm.reset();
    this.showAddressForm = false;
    this.editingAddressId = null;
    this.submitted = false;

    setTimeout(() => this.successMessage = null, 3000);
  }

  cancelEdit(): void {
    this.showAddressForm = false;
    this.editingAddressId = null;
    this.addressForm.reset();
    this.submitted = false;
  }

  setDefault(id: number): void {
    // TODO: Call profile service to set default address
    this.addresses.forEach(a => a.isDefault = a.id === id);
    this.successMessage = 'Default address updated';
    setTimeout(() => this.successMessage = null, 3000);
  }
}
