import { CommonModule } from '@angular/common';
import { Component, inject, Input, input } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '@/core/services/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  private auth = inject(AuthService);
  fb = inject(FormBuilder);
  private router = inject(Router);

  loginForm = this.fb.group({
    email: [''],
    password: [''],
  });

  // use state
  showPassword = false;
  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  close = false;

  @Input({ required: true }) setClose!: () => void;

  toggleSignUp = false;

  toggleSignUpState(value: boolean) {
    this.toggleSignUp = value;
  }

  loading = false;

  setLoading(value: boolean) {
    this.loading = value;
  }

  toggleMessageConfirmEmail = false;

  setToggleMessageConfirmEmail(value: boolean) {
    this.toggleMessageConfirmEmail = value;
  }

  async onSubmitRegister() {
    const data = await this.auth.register(
      this.loginForm.value.email!,
      this.loginForm.value.password!,
    );
    // loading state
    this.setLoading(true);
    if (data) {
      this.setToggleMessageConfirmEmail(true);
      // after register success, close modal
      this.loginForm.reset();
      this.setClose();
    }
    this.setLoading(false);
  }

  async onSubmitLogin() {
    const data = await this.auth.login(this.loginForm.value.email!, this.loginForm.value.password!);
    // loading state
    this.setLoading(true);
    if (data) {
      // after register success, close modal
      this.loginForm.reset();
      this.setClose();
      this.router.navigate(['/']);
    }
    this.setLoading(false);
  }
}
