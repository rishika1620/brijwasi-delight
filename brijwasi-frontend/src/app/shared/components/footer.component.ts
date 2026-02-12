import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  template: `
    <footer class="footer">
      <div class="footer-container">
        <div class="footer-section">
          <h3>About Us</h3>
          <p>Brijwasi Delight is your go-to food delivery platform for authentic Indian cuisine.</p>
        </div>

        <div class="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li><a routerLink="/home">Home</a></li>
            <li><a routerLink="/menu">Menu</a></li>
            <li><a routerLink="/about">About</a></li>
            <li><a routerLink="/contact">Contact</a></li>
          </ul>
        </div>

        <div class="footer-section">
          <h3>Support</h3>
          <ul>
            <li><a href="#">FAQ</a></li>
            <li><a href="#">Contact Us</a></li>
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">Terms & Conditions</a></li>
          </ul>
        </div>

        <div class="footer-section">
          <h3>Follow Us</h3>
          <div class="social-links">
            <a href="#" class="social-icon">f</a>
            <a href="#" class="social-icon">t</a>
            <a href="#" class="social-icon">i</a>
          </div>
        </div>
      </div>

      <div class="footer-bottom">
        <p>&copy; 2024 Brijwasi Delight. All rights reserved.</p>
      </div>
    </footer>
  `,
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {}
