import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '@core/services/api.service';
import { User } from '@modules/auth/models/auth.model';
import { ApiResponse } from '@shared/models/api.model';

export interface UserProfile extends User {
  memberSince?: string;
  totalOrders?: number;
  loyaltyPoints?: number;
}

export interface Address {
  id?: number;
  userId?: number;
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
  createdAt?: Date;
  updatedAt?: Date;
}

export interface PaymentCard {
  id?: number;
  userId?: number;
  cardType: 'CREDIT' | 'DEBIT' | 'UPI';
  cardHolderName: string;
  cardNumber: string;
  expiryMonth?: number;
  expiryYear?: number;
  upiId?: string;
  isDefault?: boolean;
  isActive?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface UserPreferences {
  id?: number;
  userId?: number;
  emailNotifications: boolean;
  smsNotifications: boolean;
  pushNotifications: boolean;
  promotionalEmails: boolean;
  preferredLanguage: string;
  preferredCurrency: string;
  isVegetarian: boolean;
  isSpicyFoodLover: boolean;
  dietaryRestrictions: string;
  newsLetterSubscribed: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  constructor(private apiService: ApiService) {}

  /**
   * Get user profile
   */
  getProfile(): Observable<ApiResponse<UserProfile>> {
    return this.apiService.get<UserProfile>('/profile');
  }

  /**
   * Update user profile
   */
  updateProfile(profileData: Partial<UserProfile>): Observable<ApiResponse<UserProfile>> {
    return this.apiService.put<UserProfile>('/profile', profileData);
  }

  /**
   * Change password
   */
  changePassword(currentPassword: string, newPassword: string): Observable<ApiResponse<any>> {
    return this.apiService.post<any>('/profile/change-password', {
      currentPassword,
      newPassword
    });
  }

  // ========== ADDRESS METHODS ==========

  /**
   * Get all addresses for the logged-in user
   */
  getAddresses(): Observable<ApiResponse<Address[]>> {
    return this.apiService.get<Address[]>('/profile/addresses');
  }

  /**
   * Get a specific address by ID
   */
  getAddressById(id: number): Observable<ApiResponse<Address>> {
    return this.apiService.get<Address>(`/profile/addresses/${id}`);
  }

  /**
   * Create a new address
   */
  createAddress(address: Address): Observable<ApiResponse<Address>> {
    return this.apiService.post<Address>('/profile/addresses', address);
  }

  /**
   * Add address (alias for createAddress for backward compatibility)
   */
  addAddress(address: any): Observable<ApiResponse<any>> {
    return this.apiService.post<any>('/profile/addresses', address);
  }

  /**
   * Update an existing address
   */
  updateAddress(addressId: string | number, address: Address): Observable<ApiResponse<Address>> {
    return this.apiService.put<Address>(`/profile/addresses/${addressId}`, address);
  }

  /**
   * Delete an address (soft delete)
   */
  deleteAddress(addressId: string | number): Observable<ApiResponse<void>> {
    return this.apiService.delete<void>(`/profile/addresses/${addressId}`);
  }

  /**
   * Set an address as default
   */
  setDefaultAddress(id: number): Observable<ApiResponse<void>> {
    return this.apiService.put<void>(`/profile/addresses/${id}/set-default`, {});
  }

  /**
   * Get the default address
   */
  getDefaultAddress(): Observable<ApiResponse<Address>> {
    return this.apiService.get<Address>('/profile/addresses/default');
  }

  // ========== PAYMENT CARD METHODS ==========

  /**
   * Get all payment cards for the logged-in user
   */
  getAllPaymentCards(): Observable<ApiResponse<PaymentCard[]>> {
    return this.apiService.get<PaymentCard[]>('/profile/payment-cards');
  }

  /**
   * Get a specific payment card by ID
   */
  getPaymentCardById(id: number): Observable<ApiResponse<PaymentCard>> {
    return this.apiService.get<PaymentCard>(`/profile/payment-cards/${id}`);
  }

  /**
   * Add a new payment card
   */
  addPaymentCard(card: PaymentCard): Observable<ApiResponse<PaymentCard>> {
    return this.apiService.post<PaymentCard>('/profile/payment-cards', card);
  }

  /**
   * Update an existing payment card
   */
  updatePaymentCard(id: number, card: PaymentCard): Observable<ApiResponse<PaymentCard>> {
    return this.apiService.put<PaymentCard>(`/profile/payment-cards/${id}`, card);
  }

  /**
   * Delete a payment card (soft delete)
   */
  deletePaymentCard(id: number): Observable<ApiResponse<void>> {
    return this.apiService.delete<void>(`/profile/payment-cards/${id}`);
  }

  /**
   * Set a payment card as default
   */
  setDefaultPaymentCard(id: number): Observable<ApiResponse<void>> {
    return this.apiService.put<void>(`/profile/payment-cards/${id}/set-default`, {});
  }

  /**
   * Get the default payment card
   */
  getDefaultPaymentCard(): Observable<ApiResponse<PaymentCard>> {
    return this.apiService.get<PaymentCard>('/profile/payment-cards/default');
  }

  // ========== USER PREFERENCES METHODS ==========

  /**
   * Get user preferences
   */
  getUserPreferences(): Observable<ApiResponse<UserPreferences>> {
    return this.apiService.get<UserPreferences>('/profile/preferences');
  }

  /**
   * Update user preferences
   */
  updateUserPreferences(preferences: UserPreferences): Observable<ApiResponse<UserPreferences>> {
    return this.apiService.put<UserPreferences>('/profile/preferences', preferences);
  }
}
