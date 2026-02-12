import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-loader',
  template: `
    <div [class]="'loader-container loader-' + size">
      <div class="spinner"></div>
      <p *ngIf="message" class="loader-message">{{ message }}</p>
    </div>
  `,
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent {
  @Input() size: 'sm' | 'md' | 'lg' = 'md';
  @Input() message: string = '';
}
