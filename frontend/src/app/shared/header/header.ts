import { CommonModule } from '@angular/common';
import { Component, computed, effect, inject } from '@angular/core';
import { SessionService } from '../../core/services/session';
import { Login } from '../components/login/login';
import { CartStore } from '@/core/services/cart-store';
import { AuthService } from '@/core/services/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, Login],
  templateUrl: './header.html',
})
export class HeaderComponent {
  auth = inject(AuthService);
  session = inject(SessionService);
  cartStore = inject(CartStore);
  router = inject(Router);

  constructor() {
    effect(() => {
      console.log('user:', this.session.user());
    });
  }
  isMenuOpen = false;
  isCartCount = 3;
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  profileToggle = false;

  setProfileToggle(value: boolean) {
    this.profileToggle = value;
  }
  // if click on cart icon, redirect to cart page
  goToCart() {
    window.location.href = '/cart';
  }

  // if click on logo, redirect to home page
  goToHome() {
    window.location.href = '/';
  }

  //if click icon user toggle login modal
  isLoginModalOpen = false;
  toggleLogin() {
    this.isLoginModalOpen = !this.isLoginModalOpen;
  }

  async signOut() {
    await this.auth.logout();
    await this.session.clearUser();
    this.goToHome();
  }

  closeLogin = () => {
    this.isLoginModalOpen = false;
  };

  // cart item count
  cartItemCount = computed(() => this.cartStore.totalItems().toLocaleString('en-US'));

  // navigate to cart page
  navigateToCart() {
    this.router.navigate(['/cart']);
  }
}
