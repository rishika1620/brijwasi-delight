import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  description?: string;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems = new BehaviorSubject<CartItem[]>(this.getCartFromStorage());
  public cartItems$ = this.cartItems.asObservable();

  private cartCount = new BehaviorSubject<number>(this.getCartCount());
  public cartCount$ = this.cartCount.asObservable();

  constructor() {}

  /**
   * Add item to cart
   */
  addToCart(item: CartItem): void {
    const currentCart = this.cartItems.value;
    const existingItem = currentCart.find(i => i.id === item.id);

    if (existingItem) {
      existingItem.quantity += item.quantity;
    } else {
      currentCart.push(item);
    }

    this.updateCart(currentCart);
  }

  /**
   * Remove item from cart
   */
  removeFromCart(itemId: string): void {
    const currentCart = this.cartItems.value.filter(i => i.id !== itemId);
    this.updateCart(currentCart);
  }

  /**
   * Update item quantity
   */
  updateQuantity(itemId: string, quantity: number): void {
    if (quantity <= 0) {
      this.removeFromCart(itemId);
      return;
    }

    const currentCart = this.cartItems.value;
    const item = currentCart.find(i => i.id === itemId);
    if (item) {
      item.quantity = quantity;
      this.updateCart(currentCart);
    }
  }

  /**
   * Clear cart
   */
  clearCart(): void {
    this.updateCart([]);
  }

  /**
   * Get cart items
   */
  getCartItems(): CartItem[] {
    return this.cartItems.value;
  }

  /**
   * Get total price
   */
  getTotalPrice(): number {
    return this.cartItems.value.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  }

  /**
   * Get cart count
   */
  getCartCount(): number {
    return this.cartItems.value.reduce((sum, item) => sum + item.quantity, 0);
  }

  /**
   * Update cart and notify subscribers
   */
  private updateCart(items: CartItem[]): void {
    this.cartItems.next(items);
    this.cartCount.next(this.getCartCount());
    localStorage.setItem('cart', JSON.stringify(items));
  }

  /**
   * Get cart from localStorage
   */
  private getCartFromStorage(): CartItem[] {
    const cart = localStorage.getItem('cart');
    return cart ? JSON.parse(cart) : [];
  }
}
