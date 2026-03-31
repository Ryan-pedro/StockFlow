import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AuthService } from '../../../core/services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule, MatCardModule, MatFormFieldModule,
    MatInputModule, MatButtonModule, MatIconModule, MatProgressSpinnerModule
  ],
  template: `
    <div class="login-container">
      <mat-card class="login-card">
        <div class="login-logo">
          <img src="logo.png" alt="StockFlow" class="logo-img">
          <p>Bem-vindo ao <i>StockFlow Inventory Management</i></p>
        </div>
        <mat-card-content>
          <form [formGroup]="form" (ngSubmit)="onSubmit()">
            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Email</mat-label>
              <input matInput formControlName="email" type="email" placeholder="admin@stockflow.com">
              <mat-icon matSuffix>email</mat-icon>
            </mat-form-field>
            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Senha</mat-label>
              <input matInput formControlName="password" [type]="hidePassword ? 'password' : 'text'">
              <button mat-icon-button matSuffix type="button" (click)="hidePassword = !hidePassword">
                <mat-icon>{{ hidePassword ? 'visibility_off' : 'visibility' }}</mat-icon>
              </button>
            </mat-form-field>
            <div *ngIf="errorMessage" class="error-message">{{ errorMessage }}</div>
            <button mat-raised-button color="primary" type="submit"
              class="full-width login-btn" [disabled]="loading">
              <mat-spinner *ngIf="loading" diameter="20"></mat-spinner>
              <span *ngIf="!loading">Entrar</span>
            </button>
          </form>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .login-container {
      height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #F0F3F7;
    }
    .login-card {
      width: 400px;
      padding: 32px;
    }
    .login-logo {
      text-align: center;
      margin-bottom: 24px;
    }
    .login-logo mat-icon {
      font-size: 48px;
      width: 48px;
      height: 48px;
      color: #1B2A4A;
    }
    .login-logo h1 {
      margin: 8px 0 4px;
      color: #1B2A4A;
      font-size: 28px;
    }
    .login-logo p {
      color: #666;
      font-size: 14px;
      margin: 0;
    }
    .full-width { width: 100%; }
    .login-btn { height: 48px; margin-top: 8px; }
    .error-message {
      color: #f44336;
      font-size: 14px;
      margin-bottom: 8px;
      text-align: center;
    }
    .login-logo img.logo-img {
      width: 200px;
      margin-bottom: 8px;
      animation: fadeIn 0.8s ease;
      filter: brightness(0);
    }
    @keyframes fadeIn {
      from { opacity: 0; transform: scale(0.9); }
      to   { opacity: 1; transform: scale(1); }
    }
  `]
})
export class LoginComponent {
  form: FormGroup;
  loading = false;
  hidePassword = true;
  errorMessage = '';

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.form.invalid) return;
    this.loading = true;
    this.errorMessage = '';

    this.authService.login(this.form.value).subscribe({
      next: () => this.router.navigate(['/dashboard']),
      error: (err) => {
        this.errorMessage = 'Email ou senha inválidos.';
        this.loading = false;
      }
    });
  }
}