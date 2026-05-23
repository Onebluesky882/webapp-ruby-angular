import { Component, inject } from '@angular/core';
import { Login } from '@/shared/components/login/login';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [Login],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class LoginComponent {
  router = inject(Router);
  close = false;

  setClose() {
    this.close = !this.close;
    if (this.close) {
      this.router.navigate(['/']);
    }
  }
}
