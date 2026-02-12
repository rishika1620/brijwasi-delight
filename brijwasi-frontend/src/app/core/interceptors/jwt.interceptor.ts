//Here is my interceptor: import { Injectable } from '@angular/core'; 
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http'; 
import { Observable, throwError } from 'rxjs'; 
import { catchError, retry } from 'rxjs/operators'; 
import { AuthService } from '@modules/auth/services/auth.service'; 
import { Router } from '@angular/router'; 
import { environment } from '@environments/environment';
import { Injectable } from '@angular/core';
@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  private readonly PUBLIC_URLS = [
    '/auth/login',
    '/auth/register',
    '/auth/forgot-password',
    '/auth/reset-password'
  ];

  constructor( private authService: AuthService, private router: Router ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {

    // ✅ 1️⃣ Do NOT attach token for OPTIONS (CORS preflight)
    if (request.method === 'OPTIONS') {
      return next.handle(request);
    }

    // ✅ 2️⃣ Do NOT attach token for public auth APIs
    if (this.PUBLIC_URLS.some(url => request.url.includes(url))) {
      return next.handle(request);
    }

    // ✅ 3️⃣ Attach token ONLY for protected APIs
    const token = this.authService.getToken();
    if (token) {
      request = this.addToken(request, token);
    }

    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          this.authService.logout();
          this.router.navigate(['/auth/login']);
        }
        return throwError(() => error);
      })
    );
  }

  private addToken(request: HttpRequest<any>, token: string) {
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }
}
