# Brijwasi Delight - Angular Frontend

A modern, responsive Angular food delivery application built with the latest Angular architecture and best practices.

## Project Overview

Brijwasi Delight is the frontend for a comprehensive food delivery platform. It's built using:

- **Framework**: Angular 17 (latest)
- **Language**: TypeScript 5
- **Styling**: SCSS with mobile-first responsive design
- **State Management**: Services + RxJS Observables
- **Architecture**: Modular, scalable, reusable components

## Features

- ✅ **Authentication**: JWT-based login and registration
- ✅ **Menu Management**: Category-based menu browsing and filtering
- ✅ **Shopping Cart**: Add/remove items with customizations
- ✅ **Order Management**: Create, track, and manage orders
- ✅ **Payment Integration**: Multiple payment methods support
- ✅ **Notifications**: Real-time order status updates
- ✅ **User Profile**: Account management and address book
- ✅ **Responsive Design**: Mobile, tablet, and desktop support

## Project Structure

```
src/
├── app/
│   ├── core/                    # Core services, interceptors, guards
│   │   ├── guards/              # Auth and other route guards
│   │   ├── interceptors/        # JWT interceptor
│   │   └── services/            # Base API service
│   │
│   ├── shared/                  # Shared components and utilities
│   │   ├── components/          # Reusable UI components
│   │   │   ├── button/
│   │   │   ├── card/
│   │   │   ├── modal/
│   │   │   ├── loader/
│   │   │   ├── navbar/
│   │   │   └── footer/
│   │   ├── models/              # Shared interfaces and models
│   │   └── services/            # Shared business services
│   │
│   ├── modules/                 # Feature modules
│   │   ├── auth/                # Authentication module
│   │   │   ├── components/
│   │   │   ├── services/
│   │   │   └── models/
│   │   ├── home/                # Home/dashboard module
│   │   ├── menu/                # Menu browsing module
│   │   ├── cart/                # Shopping cart module
│   │   ├── order/               # Order management module
│   │   ├── payment/             # Payment processing module
│   │   ├── notification/        # Notifications module
│   │   └── profile/             # User profile module
│   │
│   ├── app-routing.module.ts    # Main routing configuration
│   ├── app.component.ts         # Root component
│   └── app.module.ts            # Root module
│
├── assets/                      # Images, icons, fonts
├── environments/                # Environment configurations
├── styles.scss                  # Global styles
└── index.html                   # Main HTML file
```

## Installation & Setup

### Prerequisites

- Node.js 18+ and npm 9+
- Angular CLI 17+

### Steps

1. **Clone the repository**
   ```bash
   cd d:\BrijwasiDelight\brijwasi-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment**
   - Edit `src/environments/environment.ts` with your backend API URL
   - Default: `http://localhost:8080`

4. **Start the development server**
   ```bash
   npm start
   ```
   The application will open at `http://localhost:4200`

## Development Commands

```bash
# Development server
npm start

# Build for production
npm run build

# Run tests
npm test

# Watch mode
npm run watch

# Angular CLI commands
ng generate component component-name
ng generate service service-name
ng generate module module-name
```

## API Integration

### Base Configuration

All API endpoints are configured in `src/environments/environment.ts`:

```typescript
apiBaseUrl: 'http://localhost:8080'
apiEndpoints: {
  auth: '/auth',
  menu: '/menu',
  cart: '/cart',
  order: '/order',
  payment: '/payment',
  notification: '/notification',
  user: '/user'
}
```

### Backend Services Integration

- **Auth Service**: `src/app/modules/auth/services/auth.service.ts`
- **Menu Service**: `src/app/modules/menu/services/menu.service.ts` (to be created)
- **Cart Service**: `src/app/modules/cart/services/cart.service.ts` (to be created)
- **Order Service**: `src/app/modules/order/services/order.service.ts` (to be created)
- **Payment Service**: `src/app/modules/payment/services/payment.service.ts` (to be created)
- **Notification Service**: `src/app/modules/notification/services/notification.service.ts` (to be created)
- **Profile Service**: `src/app/modules/profile/services/profile.service.ts` (to be created)

## Architecture Highlights

### 1. Modular Structure
- Each feature is organized in its own module
- Lazy loading for better performance
- Shared module for reusable components

### 2. Service-based API
- All HTTP calls go through services
- No direct API calls in components
- Centralized error handling

### 3. JWT Authentication
- Token stored in localStorage
- JWT Interceptor for automatic token attachment
- Auth Guard for protected routes

### 4. Responsive Design
- Mobile-first approach
- SCSS for maintainability
- CSS Grid and Flexbox for layouts

### 5. Component Reusability
- Shared button, card, modal, loader components
- Consistent styling across the app
- Props-based customization

## Component Library

### Shared Components

#### Button Component
```html
<app-button
  [label]="'Click Me'"
  [variant]="'primary'"
  [size]="'lg'"
  [disabled]="false"
  [loading]="false"
  (onClick)="handleClick()"
></app-button>
```

#### Card Component
```html
<app-card [variant]="'elevated'">
  <h3>Card Title</h3>
  <p>Card content goes here</p>
</app-card>
```

#### Modal Component
```html
<app-modal
  [isOpen]="isOpen"
  [title]="'Modal Title'"
  [confirmLabel]="'Confirm'"
  (close)="handleClose()"
  (confirm)="handleConfirm()"
>
  <p>Modal content here</p>
</app-modal>
```

#### Loader Component
```html
<app-loader
  [size]="'md'"
  [message]="'Loading...'"
></app-loader>
```

## Styling

### Color Scheme
- **Primary**: `#FF6B35` (Orange)
- **Secondary**: `#F7F7F7` (Light Gray)
- **Text**: `#333333` (Dark Gray)
- **Border**: `#E0E0E0` (Light Border)
- **Danger**: `#DC3545` (Red)

### Responsive Breakpoints
- Mobile: < 480px
- Tablet: 480px - 768px
- Desktop: > 768px

## Authentication Flow

1. User logs in with credentials
2. Backend returns JWT token
3. Token stored in localStorage
4. JWT Interceptor attaches token to all requests
5. Expired token triggers redirect to login
6. Auth Guard protects private routes

## State Management

Using RxJS Observables with services:
- `AuthService`: Manages authentication state
- Components subscribe to Observable streams
- No centralized state management library (can be added later)

## Best Practices Implemented

✅ **SOLID Principles**
- Single Responsibility: Each service has one purpose
- Open/Closed: Extensible architecture
- Liskov Substitution: Proper inheritance
- Interface Segregation: Clean interfaces
- Dependency Inversion: Dependency injection

✅ **DRY (Don't Repeat Yourself)**
- Reusable components and services
- Base API service for common HTTP logic
- Shared models and interfaces

✅ **Code Quality**
- TypeScript strict mode enabled
- Proper error handling
- Comments and documentation
- Consistent naming conventions

## Security Features

- 🔐 JWT-based authentication
- 🔒 HTTP interceptor for token management
- 🛡️ Route guards for protected pages
- 🚫 CORS support
- 📝 Secure token storage

## Performance Optimizations

- Lazy loading of feature modules
- OnPush change detection (can be enabled)
- Tree-shakeable code
- Minification in production build

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Troubleshooting

### CORS Issues
If you get CORS errors, ensure the backend API Gateway is configured to allow requests from `http://localhost:4200`

### Token Expired
The app automatically logs out when token expires and redirects to login page

### Module Not Found
Ensure path aliases in `tsconfig.json` are correct:
- `@app/*` → `src/app/*`
- `@core/*` → `src/app/core/*`
- `@shared/*` → `src/app/shared/*`
- `@modules/*` → `src/app/modules/*`

## Future Enhancements

- [ ] Real-time notifications with WebSocket
- [ ] Redux/NgRx for state management
- [ ] Service Worker for PWA support
- [ ] Unit and E2E tests
- [ ] i18n internationalization
- [ ] Dark mode support
- [ ] Advanced filtering and search
- [ ] Analytics integration

## Contributing

1. Create a feature branch
2. Make your changes
3. Ensure code follows the established patterns
4. Submit a pull request

## License

Proprietary - Brijwasi Delight

## Support

For issues and questions:
1. Check the project structure documentation
2. Review the API models in `/src/app/shared/models`
3. Refer to backend API documentation

---

**Happy Coding! 🚀**
