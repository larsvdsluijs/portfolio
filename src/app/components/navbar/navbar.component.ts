import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  isMenuOpen = false;

  constructor(private router: Router) {}

  goTo(route: string) {
    this.router.navigate([route]);
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
    document.body.style.overflow = this.isMenuOpen ? 'hidden' : '';
    
    // Reset transformatie van de hamburger menu button
    const menuBtn = document.querySelector('.mobile-menu-btn') as HTMLElement;
    if (menuBtn) {
      if (!this.isMenuOpen) {
        // Reset transformatie wanneer menu wordt gesloten
        menuBtn.style.transform = 'rotate(0deg)';
      }
    }
  }

  closeMenu() {
    this.isMenuOpen = false;
    document.body.style.overflow = '';
    
    // Reset transformatie van de hamburger menu button
    const menuBtn = document.querySelector('.mobile-menu-btn') as HTMLElement;
    if (menuBtn) {
      menuBtn.style.transform = 'rotate(0deg)';
    }
  }
}
