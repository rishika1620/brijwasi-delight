import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ApiService } from './services/api.service';
import { JwtInterceptor } from './interceptors/jwt.interceptor';
import { AuthGuard } from './guards/auth.guard';
import { ErrorNotificationComponent } from './components/error-notification/error-notification.component';

@NgModule({
  declarations: [
    ErrorNotificationComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  exports: [
    ErrorNotificationComponent
  ],
  providers: [
    ApiService,
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    }
  ]
})
export class CoreModule { }
