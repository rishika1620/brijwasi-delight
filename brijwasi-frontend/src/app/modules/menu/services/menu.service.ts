import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '@core/services/api.service';
import { MenuItem, MenuCategory } from '@modules/menu/models/menu.model';
import { ApiResponse } from '@shared/models/api.model';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  constructor(private apiService: ApiService) {}

  /**
   * Get all menu items
   */
  getMenuItems(): Observable<ApiResponse<MenuItem[]>> {
    return this.apiService.get<MenuItem[]>('/menu/items');
  }

  /**
   * Get menu items by category
   */
  getItemsByCategory(categoryId: string): Observable<ApiResponse<MenuItem[]>> {
    return this.apiService.get<MenuItem[]>(`/menu/category/${categoryId}`);
  }

  /**
   * Get menu item by id
   */
  getMenuItem(itemId: string): Observable<ApiResponse<MenuItem>> {
    return this.apiService.get<MenuItem>(`/menu/items/${itemId}`);
  }

  /**
   * Get all categories
   */
  getCategories(): Observable<ApiResponse<MenuCategory[]>> {
    return this.apiService.get<MenuCategory[]>('/menu/categories');
  }

  /**
   * Search menu items
   */
  searchItems(query: string): Observable<ApiResponse<MenuItem[]>> {
    return this.apiService.get<MenuItem[]>(`/menu/search?q=${query}`);
  }
}
