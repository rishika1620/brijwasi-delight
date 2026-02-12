/**
 * Menu category model
 */
export interface MenuCategory {
  id: string;
  name: string;
  description?: string;
  icon?: string;
  displayOrder: number;
}

/**
 * Menu item model
 */
export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  categoryId: string;
  imageUrl?: string;
  rating?: number;
  availableAddons?: Addon[];
  vegetarian: boolean;
  spiceLevel?: 'MILD' | 'MEDIUM' | 'HOT' | 'VERY_HOT';
  createdAt?: string;
}

/**
 * Add-on/Extra for menu items
 */
export interface Addon {
  id: string;
  name: string;
  price: number;
  available: boolean;
}

/**
 * Menu item with quantity (for cart)
 */
export interface CartItem {
  id: string;
  menuItem: MenuItem;
  quantity: number;
  selectedAddons: Addon[];
  customNotes?: string;
  subtotal: number;
}
