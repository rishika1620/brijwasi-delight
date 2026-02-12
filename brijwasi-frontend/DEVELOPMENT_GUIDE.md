# Component & Service Development Guide

## Creating New Components

### Standard Component Structure

```
src/app/modules/[module]/components/[component-name]/
├── [component-name].component.ts
├── [component-name].component.html
└── [component-name].component.scss
```

### Component Template

**[component-name].component.ts**
```typescript
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'app-[component-name]',
  templateUrl: './[component-name].component.html',
  styleUrls: ['./[component-name].component.scss']
})
export class [ComponentName]Component implements OnInit {
  @Input() data: any;
  @Output() action = new EventEmitter<any>();

  constructor() {}

  ngOnInit(): void {
    // Component initialization
  }

  handleAction(value: any): void {
    this.action.emit(value);
  }
}
```

**[component-name].component.html**
```html
<div class="component-container">
  <h2>{{ data?.title }}</h2>
  <button (click)="handleAction('clicked')">Click Me</button>
</div>
```

**[component-name].component.scss**
```scss
.component-container {
  padding: 16px;
  border-radius: 8px;
  background-color: white;
}
```

## Creating New Services

### Standard Service Structure

```
src/app/modules/[module]/services/
└── [feature].service.ts
```

### Service Template

```typescript
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '@core/services/api.service';
import { environment } from '@environments/environment';
import { ApiResponse } from '@shared/models/api.model';

/**
 * Service for [Feature] operations
 */
@Injectable({
  providedIn: 'root'
})
export class [Feature]Service {
  private endpoint = environment.apiEndpoints.[feature];

  constructor(private apiService: ApiService) {}

  /**
   * Get all items
   */
  getAll(): Observable<ApiResponse<any[]>> {
    return this.apiService.get<any[]>(this.endpoint);
  }

  /**
   * Get item by id
   */
  getById(id: string): Observable<ApiResponse<any>> {
    return this.apiService.get<any>(`${this.endpoint}/${id}`);
  }

  /**
   * Create new item
   */
  create(data: any): Observable<ApiResponse<any>> {
    return this.apiService.post<any>(this.endpoint, data);
  }

  /**
   * Update item
   */
  update(id: string, data: any): Observable<ApiResponse<any>> {
    return this.apiService.put<any>(`${this.endpoint}/${id}`, data);
  }

  /**
   * Delete item
   */
  delete(id: string): Observable<ApiResponse<void>> {
    return this.apiService.delete<void>(`${this.endpoint}/${id}`);
  }
}
```

## Creating New Models

### Model/Interface Template

```typescript
// File: src/app/modules/[module]/models/[feature].model.ts

/**
 * Description of the entity
 */
export interface [Entity] {
  id: string;
  name: string;
  description: string;
  // ... other properties
  createdAt?: string;
  updatedAt?: string;
}

/**
 * Request DTO
 */
export interface Create[Entity]Request {
  name: string;
  description: string;
  // ... other properties
}

/**
 * Response DTO
 */
export interface [Entity]Response {
  id: string;
  name: string;
  description: string;
  // ... other properties
}

/**
 * Enum example
 */
export enum [EntityStatus] {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE'
}
```

## Module Integration

### Adding Components to Module

```typescript
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { [Feature]RoutingModule } from './[feature]-routing.module';
import { [Component]Component } from './components/[component]/[component].component';

const COMPONENTS = [
  [Component]Component
];

@NgModule({
  declarations: [...COMPONENTS],
  imports: [
    CommonModule,
    SharedModule,
    [Feature]RoutingModule
  ]
})
export class [Feature]Module {}
```

### Adding Routes to Module

```typescript
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { [Component]Component } from './components/[component]/[component].component';

const routes: Routes = [
  {
    path: '',
    component: [Component]Component
  },
  {
    path: ':id',
    component: [DetailComponent]Component
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class [Feature]RoutingModule {}
```

## Best Practices

### 1. Component Communication

**Parent to Child (via @Input)**
```typescript
// Parent component
<app-child [data]="parentData"></app-child>

// Child component
@Input() data: any;
```

**Child to Parent (via @Output)**
```typescript
// Child component
@Output() eventEmitter = new EventEmitter<any>();

onClick() {
  this.eventEmitter.emit(value);
}

// Parent component
<app-child (eventEmitter)="handleEvent($event)"></app-child>
```

### 2. Service Data Sharing

```typescript
// Service
private dataSubject = new BehaviorSubject<any>(initialValue);
public data$ = this.dataSubject.asObservable();

updateData(newValue: any) {
  this.dataSubject.next(newValue);
}

// Component
this.service.data$.subscribe(data => {
  this.data = data;
});
```

### 3. Form Handling

```typescript
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

export class [Component]Component implements OnInit {
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.createForm();
  }

  createForm(): FormGroup {
    return this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  submit() {
    if (this.form.valid) {
      // Handle submission
    }
  }
}
```

### 4. Async Data Loading

```typescript
export class [Component]Component implements OnInit {
  data$ : Observable<any>;
  loading = false;
  error: string | null = null;

  constructor(private service: [Feature]Service) {}

  ngOnInit() {
    this.loading = true;
    this.data$ = this.service.getData().pipe(
      tap(() => this.loading = false),
      catchError(err => {
        this.error = err.message;
        return of([]);
      })
    );
  }
}
```

```html
<div *ngIf="loading" class="loader">
  <app-loader></app-loader>
</div>

<div *ngIf="error" class="error-message">
  {{ error }}
</div>

<div *ngFor="let item of (data$ | async)" class="item">
  {{ item.name }}
</div>
```

### 5. OnPush Change Detection

```typescript
@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ItemComponent {
  @Input() item: MenuItem;
}
```

## Styling Guidelines

### Class Naming
```scss
// Element
.component-name { }

// Variant
.component-name--variant { }

// State
.component-name.is-active { }

// Nested element
.component-name__inner { }
```

### Responsive Styling
```scss
// Mobile first
.component {
  font-size: 14px;
}

// Tablet and up
@media (min-width: 768px) {
  .component {
    font-size: 16px;
  }
}

// Desktop and up
@media (min-width: 1200px) {
  .component {
    font-size: 18px;
  }
}
```

## File Naming Conventions

- **Components**: `feature-name.component.ts`
- **Services**: `feature-name.service.ts`
- **Models**: `feature-name.model.ts`
- **Guards**: `feature-name.guard.ts`
- **Interceptors**: `feature-name.interceptor.ts`
- **Modules**: `feature-name.module.ts`
- **Routing modules**: `feature-name-routing.module.ts`

## Import Path Aliases

Use the configured path aliases for cleaner imports:

```typescript
// ✅ Good
import { ApiService } from '@core/services/api.service';
import { SharedModule } from '@shared/shared.module';
import { MenuItem } from '@modules/menu/models/menu.model';

// ❌ Avoid
import { ApiService } from '../../../core/services/api.service';
```

## Testing Patterns

### Component Test Template

```typescript
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { [Component]Component } from './[component].component';
import { SharedModule } from '@shared/shared.module';

describe('[Component]Component', () => {
  let component: [Component]Component;
  let fixture: ComponentFixture<[Component]Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ [Component]Component ],
      imports: [ SharedModule ]
    })
    .compileComponents();

    fixture = TestBed.createComponent([Component]Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
```

### Service Test Template

```typescript
import { TestBed } from '@angular/core/testing';
import { [Feature]Service } from './[feature].service';
import { ApiService } from '@core/services/api.service';

describe('[Feature]Service', () => {
  let service: [Feature]Service;
  let apiService: jasmine.SpyObj<ApiService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('ApiService', ['get', 'post']);
    TestBed.configureTestingModule({
      providers: [
        [Feature]Service,
        { provide: ApiService, useValue: spy }
      ]
    });
    service = TestBed.inject([Feature]Service);
    apiService = TestBed.inject(ApiService) as jasmine.SpyObj<ApiService>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
```

## Common Patterns

### Unsubscribe Pattern

```typescript
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

export class [Component]Component implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  constructor(private service: [Feature]Service) {}

  ngOnInit() {
    this.service.getData()
      .pipe(takeUntil(this.destroy$))
      .subscribe(data => {
        this.data = data;
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
```

### Error Handling Pattern

```typescript
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

this.service.getData()
  .pipe(
    catchError(error => {
      console.error('Error loading data:', error);
      this.showErrorMessage('Failed to load data. Please try again.');
      return of(null);
    })
  )
  .subscribe(data => {
    if (data) {
      this.data = data;
    }
  });
```

---

This guide provides templates and patterns for consistent development across the frontend application.
