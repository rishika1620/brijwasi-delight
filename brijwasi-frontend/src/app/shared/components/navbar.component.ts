import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@modules/auth/services/auth.service';
import { User } from '@modules/auth/models/auth.model';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  template: `
    <nav class="navbar">
      <div class="navbar-container">
        <div class="navbar-brand">
          <a routerLink="/" class="logo">
            <span class="logo-icon">🍜</span>
            <span class="logo-text">Brijwasi Delight</span>
          </a>
        </div>

        <div class="navbar-menu">
          <a routerLink="/home" routerLinkActive="active" class="nav-link">Home</a>
          <a routerLink="/menu" routerLinkActive="active" class="nav-link">Menu</a>
          <a routerLink="/orders" routerLinkActive="active" class="nav-link">Orders</a>
          <a routerLink="/notifications" routerLinkActive="active" class="nav-link">
            Notifications
            <span class="badge">0</span>
          </a>
          <a routerLink="/about" routerLinkActive="active" class="nav-link">About Us</a>
        </div>

        <div class="navbar-right">
          <div class="cart-icon" routerLink="/cart">
            <span class="icon">🛒</span>
            <span class="badge" *ngIf="cartCount > 0">{{ cartCount }}</span>
          </div>

          <div class="user-menu" *ngIf="currentUser">
            <button class="user-avatar" (click)="toggleUserMenu()">
              {{ currentUser.username.charAt(0) }}
            </button>
            <div class="dropdown-menu" *ngIf="showUserMenu">
              <a routerLink="/profile" class="dropdown-item">My Profile</a>
              <a routerLink="/profile/addresses" class="dropdown-item">Addresses</a>
              <hr />
              <button class="dropdown-item danger" (click)="logout()">Logout</button>
            </div>
          </div>

          <div class="auth-links" *ngIf="!currentUser">
            <a routerLink="/auth/login" class="nav-link">Login</a>
            <a routerLink="/auth/register" class="nav-link btn-primary">Sign Up</a>
          </div>
        </div>
      </div>
    </nav>
  `,
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {
  currentUser: User | null = null;
  showUserMenu: boolean = false;
  cartCount: number = 0;
  private destroy$ = new Subject<void>();

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authService.currentUser$
      .pipe(takeUntil(this.destroy$))
      .subscribe(user => {
        this.currentUser = user;
      });
    
    // TODO: Subscribe to cart count from cart service
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  toggleUserMenu(): void {
    this.showUserMenu = !this.showUserMenu;
  }

  logout(): void {
    this.authService.logout();
    this.showUserMenu = false;
    this.router.navigate(['/auth/login']);
  }
}
