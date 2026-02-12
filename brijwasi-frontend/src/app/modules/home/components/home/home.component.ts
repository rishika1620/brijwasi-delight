import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

interface FeaturedItem {
  id: string;
  name: string;
  image: string;
  rating: number;
  price: number;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  featuredItems: FeaturedItem[] = [];
  categories: any[] = [];
  loading = false;
  private destroy$ = new Subject<void>();

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.loadFeaturedItems();
    this.loadCategories();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private loadFeaturedItems(): void {
    // Load featured items
    this.featuredItems = [
      {
        id: '1',
        name: 'Biryani Special',
        image: 'assets/images/biryani.jpg',
        rating: 4.5,
        price: 250
      },
      {
        id: '2',
        name: 'Butter Chicken',
        image: 'assets/images/butter-chicken.jpg',
        rating: 4.7,
        price: 320
      },
      {
        id: '3',
        name: 'Naan Bread',
        image: 'assets/images/naan.jpg',
        rating: 4.3,
        price: 80
      },
      {
        id: '4',
        name: 'Paneer Tikka',
        image: 'assets/images/paneer-tikka.jpg',
        rating: 4.6,
        price: 280
      }
    ];
  }

  private loadCategories(): void {
    this.categories = [
      { id: 1, name: 'Biryani', icon: '🍛' },
      { id: 2, name: 'Curries', icon: '🍲' },
      { id: 3, name: 'Bread', icon: '🥖' },
      { id: 4, name: 'Appetizers', icon: '🥗' },
      { id: 5, name: 'Desserts', icon: '🍰' },
      { id: 6, name: 'Beverages', icon: '🥤' }
    ];
  }

  viewMenu(): void {
    this.router.navigate(['/menu']);
  }

  viewItem(itemId: string): void {
    this.router.navigate(['/menu', itemId]);
  }
}
