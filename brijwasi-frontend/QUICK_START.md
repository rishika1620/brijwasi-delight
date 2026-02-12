# Brijwasi Delight Frontend - Quick Start Guide

## ✅ What Has Been Created

### Project Structure
A complete, production-ready Angular 17 project with:
- ✅ Modular architecture with 8 feature modules
- ✅ Core services, guards, and interceptors
- ✅ Shared reusable UI components
- ✅ Complete TypeScript configuration
- ✅ Global SCSS styling with Zomato/Swiggy-inspired design
- ✅ Environment configuration for dev and prod

### Core Modules
1. **Auth Module** - Login & Registration
2. **Home Module** - Dashboard/Homepage
3. **Menu Module** - Browse menu items
4. **Cart Module** - Shopping cart
5. **Order Module** - Order management
6. **Payment Module** - Payment processing
7. **Notification Module** - Notifications
8. **Profile Module** - User profile

### Core Features Implemented
- ✅ JWT-based authentication service
- ✅ HTTP interceptor for token management
- ✅ Auth guard for protected routes
- ✅ Base API service for all HTTP calls
- ✅ Models for all domain entities
- ✅ Responsive Navbar with user menu
- ✅ Footer component
- ✅ Reusable UI components (Button, Card, Modal, Loader)
- ✅ Lazy-loaded feature modules
- ✅ Global styles with color scheme

## 🚀 Getting Started

### 1. Install Dependencies
```bash
cd d:\BrijwasiDelight\brijwasi-frontend
npm install
```

### 2. Configure API Base URL
Edit `src/environments/environment.ts`:
```typescript
apiBaseUrl: 'http://localhost:8080' // Your backend API Gateway URL
```

### 3. Start Development Server
```bash
npm start
```
The app will open at `http://localhost:4200`

## 📁 Project Organization

```
src/app/
├── core/                          # Core infrastructure
│   ├── guards/auth.guard.ts       # Route protection
│   ├── interceptors/jwt.interceptor.ts  # Token management
│   └── services/api.service.ts    # Base HTTP service
│
├── shared/                        # Shared across modules
│   ├── components/                # Reusable UI components
│   │   ├── button.component.ts
│   │   ├── card.component.ts
│   │   ├── modal.component.ts
│   │   ├── loader.component.ts
│   │   ├── navbar.component.ts
│   │   └── footer.component.ts
│   ├── models/api.model.ts        # API interfaces
│   └── shared.module.ts           # Shared module
│
├── modules/                       # Feature modules (lazy-loaded)
│   ├── auth/
│   │   ├── models/auth.model.ts
│   │   ├── services/auth.service.ts
│   │   └── auth.module.ts
│   ├── home/home.module.ts
│   ├── menu/
│   │   ├── models/menu.model.ts
│   │   └── menu.module.ts
│   ├── cart/cart.module.ts
│   ├── order/
│   │   ├── models/order.model.ts
│   │   └── order.module.ts
│   ├── payment/
│   │   ├── models/payment.model.ts
│   │   └── payment.module.ts
│   ├── notification/
│   │   ├── models/notification.model.ts
│   │   └── notification.module.ts
│   └── profile/profile.module.ts
│
├── app-routing.module.ts          # Main routing
├── app.module.ts                  # Root module
├── app.component.ts               # Root component
└── core.module.ts                 # Core configuration
```

## 🎨 Design System

### Colors
- **Primary**: `#FF6B35` (Orange) - Main CTA
- **Secondary**: `#F7F7F7` (Light Gray) - Backgrounds
- **Text**: `#333333` (Dark Gray)
- **Border**: `#E0E0E0` (Light Border)
- **Danger**: `#DC3545` (Red) - Delete actions

### Component Library

#### Button
```html
<app-button
  label="Add to Cart"
  variant="primary"
  size="lg"
  (onClick)="addToCart()"
></app-button>
```
Variants: `primary | secondary | danger`
Sizes: `sm | md | lg`

#### Card
```html
<app-card variant="elevated">
  <h3>Menu Item</h3>
  <p>₹299</p>
  <app-button label="Add" (onClick)="add()"></app-button>
</app-card>
```
Variants: `default | flat | elevated`

#### Modal
```html
<app-modal
  [isOpen]="showModal"
  title="Customize Item"
  (close)="handleClose()"
  (confirm)="handleConfirm()"
>
  <app-checkbox>Add Extra Cheese</app-checkbox>
</app-modal>
```

#### Loader
```html
<app-loader size="md" message="Loading menu..."></app-loader>
```

## 🔐 Authentication Flow

1. User navigates to `/auth/login`
2. Enters credentials
3. Backend validates and returns JWT token
4. AuthService stores token in localStorage
5. JwtInterceptor attaches token to all subsequent requests
6. AuthGuard protects routes that require authentication
7. On token expiry (401 response), auto-logout and redirect to login

## 🌐 API Integration

All API calls go through the `ApiService` base class:

```typescript
// Example: Login
this.apiService.post<AuthResponse>('/auth/login', credentials)
  .subscribe(response => {
    // Handle response
  });
```

The interceptor automatically:
- Adds `Authorization: Bearer <token>` header
- Retries failed requests once
- Handles 401 errors with logout

## 📊 Models Structure

All models are defined in the `models/` folder of each module:

```typescript
// auth.model.ts
export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}
```

## 🚦 Routing

Lazy-loaded routing configuration in `app-routing.module.ts`:

```typescript
{
  path: 'menu',
  canActivate: [AuthGuard],
  loadChildren: () => import('@modules/menu/menu.module').then(m => m.MenuModule)
}
```

## 📱 Responsive Design

- **Mobile First**: Built with mobile as the primary target
- **Breakpoints**: 
  - Mobile: < 480px
  - Tablet: 480px - 768px
  - Desktop: > 768px
- **Layout**: CSS Grid and Flexbox

## 🎯 Next Steps

### To Complete the Frontend:

1. **Auth Module** (Next Priority)
   - Create LoginComponent
   - Create RegisterComponent
   - Add form validation
   - Link to backend auth endpoints

2. **Home Module**
   - Display featured menu items
   - Category filters
   - Search functionality

3. **Menu Module**
   - Menu listing with categories
   - Item detail view
   - Customization modal

4. **Cart Module**
   - Cart item management
   - Cart summary
   - Checkout form

5. **Order Module**
   - Order listing (current & past)
   - Order details page
   - Status timeline

6. **Payment Module**
   - Payment method selection
   - Payment form
   - Order confirmation

7. **Notification Module**
   - Fetch and display notifications
   - Mark as read functionality

8. **Profile Module**
   - User profile display
   - Address management
   - Order history

## 🔨 Development Commands

```bash
# Start dev server
npm start

# Build for production
npm run build

# Run tests
npm test

# Generate new component
ng generate component modules/home/components/home-page

# Generate new service
ng generate service modules/menu/services/menu

# Generate new module
ng generate module modules/home
```

## 🐛 Troubleshooting

### Cannot find module '@app/*'
- Ensure path aliases in `tsconfig.json` are correctly set
- Run `npm install` to update node_modules

### CORS errors
- Check backend API Gateway CORS configuration
- Ensure origin `http://localhost:4200` is whitelisted

### Module not found
- Verify module imports in `.module.ts` files
- Check lazy loading routes in `app-routing.module.ts`

### Token not being sent
- Check browser localStorage for `brijwasi_auth_token`
- Verify JWT Interceptor is registered in CoreModule
- Check network tab in DevTools to see request headers

## 📚 Resource Links

- [Angular Documentation](https://angular.io/docs)
- [RxJS Documentation](https://rxjs.dev/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [SCSS Documentation](https://sass-lang.com/documentation)

## ✨ Key Features Ready to Use

✅ Complete type safety with TypeScript
✅ Modular, scalable architecture
✅ Reusable component library
✅ JWT authentication
✅ Error handling
✅ Responsive design
✅ Global styling system
✅ Lazy-loaded modules
✅ Route guards
✅ HTTP interceptors

## 🎓 Architecture Principles

- **Single Responsibility**: Each service/component has one purpose
- **DRY**: No code duplication
- **Testable**: Services can be unit tested
- **Scalable**: Easy to add new features and modules
- **Maintainable**: Clear folder structure and naming conventions
- **Reusable**: Shared components for consistency

---

**You're all set! The foundation is solid. Now focus on implementing the feature modules! 🎉**

For questions or issues, refer to the main [README.md](./README.md) or the Angular documentation.
