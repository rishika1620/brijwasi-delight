import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiService } from '@core/services/api.service';
import { 
  User, 
  LoginRequest, 
  RegisterRequest, 
  AuthResponse 
} from '@modules/auth/models/auth.model';
import { environment } from '@environments/environment';
import { ApiResponse } from '@shared/models/api.model';

/**
 * Authentication service to handle login, register, and token management
 */
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(this.loadUser());
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(private apiService: ApiService) {
    this.loadUser();
  }

  /**
   * Login with mobile number and password
   */
  login(credentials: LoginRequest): Observable<User> {
    return this.apiService.post<AuthResponse>(
      `${environment.apiEndpoints.auth}/login`,
      credentials
    ).pipe(
      map((response: ApiResponse<AuthResponse>) => {
        if (response.data && response.data.token) {
          this.setToken(response.data.token);
          this.setUser(response.data.user);
          this.currentUserSubject.next(response.data.user);
        }
        return response.data.user;
      })
    );
  }

  /**
   * Register new user
   */
  register(credentials: RegisterRequest): Observable<User> {
    return this.apiService.post<AuthResponse>(
      `${environment.apiEndpoints.auth}/register`,
      credentials
    ).pipe(
      map((response: ApiResponse<AuthResponse>) => {
        if (response.data && response.data.token) {
          this.setToken(response.data.token);
          this.setUser(response.data.user);
          this.currentUserSubject.next(response.data.user);
        }
        return response.data.user;
      })
    );
  }

  /**
   * Logout user and clear stored data
   */
  logout(): void {
    localStorage.removeItem(environment.tokenKey);
    localStorage.removeItem(environment.userKey);
    this.currentUserSubject.next(null);
  }

  /**
   * Check if user is authenticated
   */
  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  /**
   * Get stored auth token
   */
  getToken(): string | null {
    return localStorage.getItem(environment.tokenKey);
  }

  /**
   * Set auth token
   */
  private setToken(token: string): void {
    localStorage.setItem(environment.tokenKey, token);
  }

  /**
   * Set current user
   */
  private setUser(user: User): void {
    localStorage.setItem(environment.userKey, JSON.stringify(user));
  }

  /**
   * Load user from localStorage
   */
  private loadUser(): User | null {
    const user = localStorage.getItem(environment.userKey);
    return user ? JSON.parse(user) : null;
  }

  /**
   * Get current user
   */
  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  /**
   * Refresh auth token
   */
  refreshToken(): Observable<AuthResponse> {
    return this.apiService.post<AuthResponse>(
      `${environment.apiEndpoints.auth}/refresh`,
      {}
    ).pipe(
      map((response: ApiResponse<AuthResponse>) => {
        if (response.data && response.data.token) {
          this.setToken(response.data.token);
          this.currentUserSubject.next(response.data.user);
        }
        return response.data;
      })
    );
  }

  /**
   * Request password reset token by mobile number
   */
  forgotPassword(request: { mobileNumber: string }): Observable<any> {
    return this.apiService.post<any>(
      `${environment.apiEndpoints.auth}/forgot-password`,
      request
    );
  }

  /**
   * Reset password using reset token
   */
  resetPassword(request: { token: string; newPassword: string; confirmPassword: string }): Observable<any> {
    return this.apiService.post<any>(
      `${environment.apiEndpoints.auth}/reset-password`,
      request
    );
  }

  /**
   * Change password for authenticated user
   */
  changePassword(request: { currentPassword: string; newPassword: string; confirmPassword: string }): Observable<any> {
    return this.apiService.post<any>(
      `${environment.apiEndpoints.auth}/change-password`,
      request
    );
  }
}
