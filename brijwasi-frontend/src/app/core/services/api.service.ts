import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from '@environments/environment';
import { ApiResponse } from '@shared/models/api.model';

/**
 * Error notification service for displaying errors to users
 */
export interface ErrorNotification {
  message: string;
  statusCode?: number;
  timestamp: Date;
}

/**
 * Base service for all HTTP API calls
 */
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  protected baseUrl = environment.apiBaseUrl;
  
  // Error notification stream
  public errorNotification$ = new BehaviorSubject<ErrorNotification | null>(null);

  constructor(protected http: HttpClient) {}

  /**
   * GET request
   */
  get<T>(endpoint: string, options?: any): Observable<ApiResponse<T>> {
    return this.http
      .get<ApiResponse<T>>(`${this.baseUrl}${endpoint}`)
      .pipe(
        tap(response => this.handleResponse(response)),
        catchError(error => this.handleError(error))
      );
  }

  /**
   * POST request
   */
  post<T>(endpoint: string, body: any, options?: any): Observable<ApiResponse<T>> {
    return this.http
      .post<ApiResponse<T>>(`${this.baseUrl}${endpoint}`, body)
      .pipe(
        tap(response => this.handleResponse(response)),
        catchError(error => this.handleError(error))
      );
  }

  /**
   * PUT request
   */
  put<T>(endpoint: string, body: any, options?: any): Observable<ApiResponse<T>> {
    return this.http
      .put<ApiResponse<T>>(`${this.baseUrl}${endpoint}`, body)
      .pipe(
        tap(response => this.handleResponse(response)),
        catchError(error => this.handleError(error))
      );
  }

  /**
   * PATCH request
   */
  patch<T>(endpoint: string, body: any, options?: any): Observable<ApiResponse<T>> {
    return this.http
      .patch<ApiResponse<T>>(`${this.baseUrl}${endpoint}`, body)
      .pipe(
        tap(response => this.handleResponse(response)),
        catchError(error => this.handleError(error))
      );
  }

  /**
   * DELETE request
   */
  delete<T>(endpoint: string, options?: any): Observable<ApiResponse<T>> {
    return this.http
      .delete<ApiResponse<T>>(`${this.baseUrl}${endpoint}`)
      .pipe(
        tap(response => this.handleResponse(response)),
        catchError(error => this.handleError(error))
      );
  }

  /**
   * Handle successful responses
   */
  private handleResponse<T>(response: ApiResponse<T>): void {
    // Clear any previous errors on success
    if (response.success) {
      this.errorNotification$.next(null);
    }
  }

  /**
   * Error handler with user-friendly messages
   */
  private handleError(error: any): Observable<never> {
    let errorMessage = 'An unexpected error occurred';
    let statusCode = 500;

    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = error.error.message || 'Network error occurred';
    } else if (error.error && typeof error.error === 'object') {
      // Server-side error with ApiResponse structure
      if (error.error.message) {
        errorMessage = error.error.message;
      }
      statusCode = error.error.statusCode || error.status || 500;
    } else if (error.status) {
      // HTTP error
      statusCode = error.status;
      errorMessage = this.getErrorMessageByStatus(statusCode);
    }

    // Notify subscribers of the error
    const notification: ErrorNotification = {
      message: errorMessage,
      statusCode: statusCode,
      timestamp: new Date()
    };
    this.errorNotification$.next(notification);

    console.error('API Error:', { message: errorMessage, statusCode, fullError: error });
    return throwError(() => ({ message: errorMessage, statusCode, originalError: error }));
  }

  /**
   * Get user-friendly error message by HTTP status code
   */
  private getErrorMessageByStatus(status: number): string {
    const errorMessages: { [key: number]: string } = {
      400: 'Bad request. Please check your input.',
      401: 'Unauthorized. Please login again.',
      403: 'Forbidden. You do not have permission to access this resource.',
      404: 'Resource not found.',
      409: 'Conflict. The request could not be completed due to a conflict.',
      500: 'Server error. Please try again later.',
      502: 'Bad gateway. Please try again later.',
      503: 'Service unavailable. Please try again later.',
      504: 'Gateway timeout. Please try again later.'
    };
    return errorMessages[status] || `Error ${status}: Please try again later.`;
  }
}

