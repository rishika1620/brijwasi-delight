import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-button',
  template: `
    <button 
      [class]="'btn btn-' + variant + ' btn-' + size"
      [disabled]="disabled || loading"
      (click)="onClick.emit()"
    >
      <span *ngIf="!loading">{{ label }}</span>
      <span *ngIf="loading" class="loader"></span>
    </button>
  `,
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {
  @Input() label: string = 'Button';
  @Input() variant: 'primary' | 'secondary' | 'danger' = 'primary';
  @Input() size: 'sm' | 'md' | 'lg' = 'md';
  @Input() disabled: boolean = false;
  @Input() loading: boolean = false;

  @Output() onClick = new EventEmitter<void>();
}
