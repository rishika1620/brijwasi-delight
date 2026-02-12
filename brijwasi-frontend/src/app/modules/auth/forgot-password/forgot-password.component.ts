import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  forgotPasswordForm!: FormGroup;
  loading = false;
  submitted = false;
  resetToken: string | null = null;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.forgotPasswordForm = this.fb.group({
      mobileNumber: ['', [
        Validators.required,
        Validators.pattern(/^[0-9]{10}$/)
      ]]
    });
  }

  get mobileNumber() {
    return this.forgotPasswordForm.get('mobileNumber');
  }

  onSubmit(): void {
    this.submitted = true;
    this.errorMessage = null;

    if (this.forgotPasswordForm.invalid) {
      return;
    }

    this.loading = true;
    const { mobileNumber } = this.forgotPasswordForm.value;

    this.authService.forgotPassword({ mobileNumber }).subscribe({
      next: (response: any) => {
        this.resetToken = response.data.resetToken;
        this.loading = false;
      },
      error: (error: any) => {
        this.errorMessage = error.message || 'Failed to process forgot password request';
        this.loading = false;
      }
    });
  }

  copyToken(): void {
    if (this.resetToken) {
      navigator.clipboard.writeText(this.resetToken);
      alert('Reset token copied to clipboard');
    }
  }

  goToResetPassword(): void {
    this.router.navigate(['/auth/reset-password']);
  }

  goToLogin(): void {
    this.router.navigate(['/auth/login']);
  }
}
