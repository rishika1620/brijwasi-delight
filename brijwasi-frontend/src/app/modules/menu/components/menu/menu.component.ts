import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CartService } from '@modules/cart/services/cart.service';
import { MenuItem } from '@modules/menu/models/menu.model';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit, OnDestroy {
  menuItems: MenuItem[] = [];
  filteredItems: MenuItem[] = [];
  categories: any[] = [];
  selectedCategory = 'all';
  searchQuery = '';
  loading = false;
  private destroy$ = new Subject<void>();

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.loadMenu();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private loadMenu(): void {
    this.loading = true;
    // Simulated menu items
    this.menuItems = [
      {
        id: '1',
        name: 'Biryani Special',
        description: 'Fragrant basmati rice with tender meat',
        price: 250,
        imageUrl: 'assets/images/biryani.jpg',
        categoryId: 'biryani',
        rating: 4.5,
        vegetarian: false
      },
      {
        id: '2',
        name: 'Paneer Biryani',
        description: 'Aromatic rice with cottage cheese',
        price: 220,
        imageUrl: 'assets/images/paneer-biryani.jpg',
        categoryId: 'biryani',
        rating: 4.3,
        vegetarian: true
      },
      {
        id: '3',
        name: 'Butter Chicken',
        description: 'Creamy chicken in tomato butter sauce',
        price: 320,
        imageUrl: 'assets/images/butter-chicken.jpg',
        categoryId: 'curries',
        rating: 4.7,
        vegetarian: false
      },
      {
        id: '4',
        name: 'Paneer Butter Masala',
        description: 'Cottage cheese in rich tomato sauce',
        price: 280,
        imageUrl: 'assets/images/paneer-butter-masala.jpg',
        categoryId: 'curries',
        rating: 4.6,
        vegetarian: true
      },
      {
        id: '5',
        name: 'Butter Naan',
        description: 'Soft Indian bread with butter',
        price: 80,
        imageUrl: 'assets/images/naan.jpg',
        categoryId: 'bread',
        rating: 4.4,
        vegetarian: true
      },
      {
        id: '6',
        name: 'Paneer Tikka',
        description: 'Grilled cottage cheese with spices',
        price: 280,
        imageUrl: 'assets/images/paneer-tikka.jpg',
        categoryId: 'appetizers',
        rating: 4.6,
        vegetarian: true
      }
    ];

    this.categories = [
      { id: 'all', name: 'All Items' },
      { id: 'biryani', name: 'Biryani' },
      { id: 'curries', name: 'Curries' },
      { id: 'bread', name: 'Bread' },
      { id: 'appetizers', name: 'Appetizers' }
    ];

    this.filteredItems = this.menuItems;
    this.loading = false;
  }

  filterByCategory(categoryId: string): void {
    this.selectedCategory = categoryId;
    this.applyFilters();
  }

  search(query: string): void {
    this.searchQuery = query;
    this.applyFilters();
  }

  private applyFilters(): void {
    this.filteredItems = this.menuItems.filter(item => {
      const matchesCategory = this.selectedCategory === 'all' || item.categoryId === this.selectedCategory;
      const matchesSearch = !this.searchQuery || 
        item.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(this.searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }

  addToCart(item: MenuItem): void {
    this.cartService.addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      quantity: 1,
      image: item.imageUrl || 'assets/images/placeholder.jpg',
      description: item.description
    });
  }
}
