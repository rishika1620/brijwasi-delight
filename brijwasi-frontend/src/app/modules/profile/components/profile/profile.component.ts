import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AuthService } from '@modules/auth/services/auth.service';
import { User } from '@modules/auth/models/auth.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {
  profileForm!: FormGroup;
  changePasswordForm!: FormGroup;
  currentUser: User | null = null;
  loading = false;
  saveSuccess = false;
  showChangePassword = false;
  changePasswordLoading = false;
  changePasswordSuccess = false;
  changePasswordError: string | null = null;
  private destroy$ = new Subject<void>();

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadUserProfile();
    this.initializeForm();
    this.initializeChangePasswordForm();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private loadUserProfile(): void {
    this.authService.currentUser$
      .pipe(takeUntil(this.destroy$))
      .subscribe(user => {
        this.currentUser = user;
        if (user) {
          this.updateFormValues(user);
        }
      });
  }

  private initializeForm(): void {
    this.profileForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]]
    });
  }

  private initializeChangePasswordForm(): void {
    this.changePasswordForm = this.formBuilder.group({
      currentPassword: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, {
      validators: this.passwordMatchValidator
    });
  }

  passwordMatchValidator(group: FormGroup): { [key: string]: any } | null {
    const newPassword = group.get('newPassword');
    const confirmPassword = group.get('confirmPassword');

    if (newPassword && confirmPassword && newPassword.value !== confirmPassword.value) {
      confirmPassword.setErrors({ passwordMismatch: true });
      return { passwordMismatch: true };
    } else {
      const errors = confirmPassword?.errors;
      if (errors) {
        delete errors['passwordMismatch'];
        if (Object.keys(errors).length === 0) {
          confirmPassword?.setErrors(null);
        }
      }
    }
    return null;
  }

  private updateFormValues(user: User): void {
    this.profileForm.patchValue({
      username: user.username,
      email: user.email,
      phone: user.mobileNumber || ''
    });
  }

  saveProfile(): void {
    if (this.profileForm.invalid) {
      return;
    }

    this.loading = true;
    this.saveSuccess = false;

    // Simulate save
    setTimeout(() => {
      this.loading = false;
      this.saveSuccess = true;
      setTimeout(() => {
        this.saveSuccess = false;
      }, 3000);
    }, 1000);
  }

  toggleChangePassword(): void {
    this.showChangePassword = !this.showChangePassword;
    if (!this.showChangePassword) {
      this.changePasswordForm.reset();
      this.changePasswordError = null;
    }
  }

  changePassword(): void {
    if (this.changePasswordForm.invalid) {
      return;
    }

    this.changePasswordLoading = true;
    this.changePasswordError = null;
    this.changePasswordSuccess = false;

    const { currentPassword, newPassword, confirmPassword } = this.changePasswordForm.value;

    this.authService.changePassword({
      currentPassword,
      newPassword,
      confirmPassword
    }).subscribe({
      next: (response) => {
        this.changePasswordLoading = false;
        this.changePasswordSuccess = true;
        this.changePasswordForm.reset();
        setTimeout(() => {
          this.changePasswordSuccess = false;
          this.showChangePassword = false;
        }, 2000);
      },
      error: (error) => {
        this.changePasswordLoading = false;
        this.changePasswordError = error.message || 'Failed to change password';
      }
    });
  }

  get firstName() {
    return this.profileForm.get('firstName');
  }

  get lastName() {
    return this.profileForm.get('lastName');
  }

  get email() {
    return this.profileForm.get('email');
  }

  get phone() {
    return this.profileForm.get('phone');
  }

  get currentPasswordCtrl() {
    return this.changePasswordForm.get('currentPassword');
  }

  get newPasswordCtrl() {
    return this.changePasswordForm.get('newPassword');
  }

  get confirmPasswordCtrl() {
    return this.changePasswordForm.get('confirmPassword');
  }
}
