import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { NotificationRoutingModule } from './notification-routing.module';
import { NotificationCenterComponent } from './components/notification-center/notification-center.component';

@NgModule({
  declarations: [NotificationCenterComponent],
  imports: [CommonModule, SharedModule, NotificationRoutingModule]
})
export class NotificationModule {}
