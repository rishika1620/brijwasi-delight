import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

interface UserPreferences {
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
}

@Component({
  selector: 'app-profile-preferences',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './preferences.component.html',
  styleUrls: ['./preferences.component.scss']
})
export class PreferencesComponent implements OnInit, OnDestroy {
  preferencesForm!: FormGroup;
  loading = false;
  successMessage: string | null = null;
  errorMessage: string | null = null;
  private destroy$ = new Subject<void>();

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initializeForm();
    this.loadPreferences();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  initializeForm(): void {
    this.preferencesForm = this.fb.group({
      // Notification Preferences
      emailNotifications: [true],
      smsNotifications: [true],
      pushNotifications: [true],
      promotionalEmails: [true],
      newsLetterSubscribed: [true],

      // Language & Currency
      preferredLanguage: ['en'],
      preferredCurrency: ['INR'],

      // Food Preferences
      isVegetarian: [false],
      isSpicyFoodLover: [true],
      dietaryRestrictions: ['']
    });
  }

  loadPreferences(): void {
    // TODO: Replace with API call to ProfileService
    // this.profileService.getUserPreferences()
    //   .pipe(takeUntil(this.destroy$))
    //   .subscribe(
    //     (response) => {
    //       if (response.data) {
    //         this.preferencesForm.patchValue(response.data);
    //       }
    //     },
    //     (error) => {
    //       this.errorMessage = 'Failed to load preferences';
    //     }
    //   );

    // Mock data for demonstration
    const mockPreferences: UserPreferences = {
      emailNotifications: true,
      smsNotifications: true,
      pushNotifications: true,
      promotionalEmails: false,
      preferredLanguage: 'en',
      preferredCurrency: 'INR',
      isVegetarian: false,
      isSpicyFoodLover: true,
      dietaryRestrictions: '',
      newsLetterSubscribed: true
    };
    this.preferencesForm.patchValue(mockPreferences);
  }

  savePreferences(): void {
    this.loading = true;
    this.successMessage = null;
    this.errorMessage = null;

    const formValue = this.preferencesForm.value;

    // TODO: Replace with API call
    // this.profileService.updateUserPreferences(formValue)
    //   .pipe(takeUntil(this.destroy$))
    //   .subscribe(
    //     (response) => {
    //       this.successMessage = 'Preferences updated successfully!';
    //       this.loading = false;
    //       setTimeout(() => {
    //         this.successMessage = null;
    //       }, 3000);
    //     },
    //     (error) => {
    //       this.errorMessage = 'Failed to update preferences';
    //       this.loading = false;
    //     }
    //   );

    // Mock implementation
    setTimeout(() => {
      this.successMessage = 'Preferences updated successfully!';
      this.loading = false;
      setTimeout(() => {
        this.successMessage = null;
      }, 3000);
    }, 500);
  }

  resetPreferences(): void {
    this.loadPreferences();
    this.successMessage = null;
    this.errorMessage = null;
  }
}
