import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent {
  teamMembers = [
    {
      name: 'Raj Kumar',
      role: 'Founder & CEO',
      image: '👨‍💼'
    },
    {
      name: 'Priya Singh',
      role: 'Operations Manager',
      image: '👩‍💼'
    },
    {
      name: 'Amit Patel',
      role: 'Head Chef',
      image: '👨‍🍳'
    },
    {
      name: 'Sarah Johnson',
      role: 'Customer Service Lead',
      image: '👩‍💻'
    }
  ];

  features = [
    {
      icon: '⚡',
      title: 'Fast Delivery',
      description: 'Get your food delivered hot and fresh within 30 minutes'
    },
    {
      icon: '🍽️',
      title: 'Authentic Recipes',
      description: 'Traditional Indian cuisine prepared with the finest ingredients'
    },
    {
      icon: '💳',
      title: 'Easy Payment',
      description: 'Multiple payment options for your convenience'
    },
    {
      icon: '⭐',
      title: 'Quality Guarantee',
      description: 'Highest standards of hygiene and food quality'
    }
  ];
}
