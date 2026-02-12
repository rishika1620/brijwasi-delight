import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <app-navbar></app-navbar>
    <main class="main-content">
      <router-outlet></router-outlet>
    </main>
    <app-error-notification></app-error-notification>
  `,
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Brijwasi Delight';
}
