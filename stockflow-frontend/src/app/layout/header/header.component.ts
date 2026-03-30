import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatDividerModule,
  ],
  template: `
    <mat-toolbar class="header">
      <!-- Lado esquerdo -->
      <div class="header-left">
        <span class="system-tagline">Inventory Management System</span>
      </div>

      <span class="spacer"></span>

      <!-- Status -->
      <div class="status-badge">
        <span class="status-dot"></span>
        Sistema Online
      </div>

      <!-- Usuário -->
      <button mat-button [matMenuTriggerFor]="userMenu" class="user-btn">
        <div class="user-avatar">{{ getInitials() }}</div>
        <div class="user-info">
          <span class="user-name">{{ user?.name }}</span>
          <span class="user-role">{{ user?.role === 'Admin' ? 'Administrador' : 'Operador' }}</span>
        </div>
        <mat-icon>arrow_drop_down</mat-icon>
      </button>

      <mat-menu #userMenu="matMenu" class="user-menu">
        <div class="menu-header" (click)="$event.stopPropagation()">
          <div class="menu-avatar">{{ getInitials() }}</div>
          <div class="menu-user-info">
            <span class="menu-name">{{ user?.name }}</span>
            <span class="menu-email">{{ user?.email }}</span>
            <span class="menu-role-badge">
              <mat-icon>{{ user?.role === 'Admin' ? 'shield' : 'person' }}</mat-icon>
              {{ user?.role === 'Admin' ? 'Administrador' : 'Operador' }}
            </span>
          </div>
        </div>

        <mat-divider></mat-divider>

        <button mat-menu-item disabled>
          <mat-icon>access_time</mat-icon>
          <span>Sessão expira em {{ getExpiresIn() }}</span>
        </button>

        <mat-divider></mat-divider>

        <button mat-menu-item (click)="logout()">
          <mat-icon color="warn">logout</mat-icon>
          <span style="color: #f44336">Sair</span>
        </button>
      </mat-menu>
    </mat-toolbar>
  `,
  styles: [
    `
      .header {
        background: white;
        border-bottom: 1px solid #e0e0e0;
        height: 64px;
        padding: 0 24px;
        box-shadow: 0 1px 4px rgba(0, 0, 0, 0.06);
      }
      :host ::ng-deep .user-btn .mdc-button__label {
        display: flex;
        align-items: center;
        gap: 10px;
      }
      .spacer {
        flex: 1;
      }
      .header-left {
        display: flex;
        align-items: center;
      }
      .system-tagline {
        font-family: 'Montserrat', sans-serif;
        font-size: 14px;
        font-weight: 700;
        color: #1b2a4a;
        letter-spacing: 3px;
        text-transform: uppercase;
        opacity: 0.9;
      }
      .status-badge {
        display: flex;
        align-items: center;
        gap: 6px;
        background: #e8f5e9;
        color: #2e7d32;
        font-size: 12px;
        font-weight: 500;
        padding: 4px 12px;
        border-radius: 20px;
        margin-right: 16px;
      }
      .status-dot {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: #09a829;
        animation: pulse 2s infinite;
      }
      @keyframes pulse {
        0% {
          opacity: 1;
        }
        50% {
          opacity: 0.4;
        }
        100% {
          opacity: 1;
        }
      }
      .user-btn {
        display: flex;
        align-items: center;
        gap: 10px;
        height: 48px;
        border-radius: 24px !important;
        padding: 0 12px !important;
        transition: background 0.2s;
      }
      .user-btn:hover {
        background: #f0f3f7 !important;
      }
      .user-avatar {
        width: 36px;
        height: 36px;
        border-radius: 50%;
        background: #1b2a4a;
        color: white;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 700;
        font-size: 14px;
      }
      .user-info {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        line-height: 1.3;
        text-align: left;
      }
      .user-name {
        font-size: 14px;
        font-weight: 600;
        color: #1b2a4a;
        line-height: 1.2;
      }
      .user-role {
        font-size: 11px;
        color: #888;
        line-height: 1.2;
      }
      .menu-header {
        padding: 16px;
        display: flex;
        align-items: center;
        gap: 12px;
        min-width: 260px;
      }
      .menu-avatar {
        width: 48px;
        height: 48px;
        border-radius: 50%;
        background: #1b2a4a;
        color: white;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 700;
        font-size: 18px;
        flex-shrink: 0;
      }
      .menu-user-info {
        display: flex;
        flex-direction: column;
        gap: 2px;
      }
      .menu-name {
        font-size: 15px;
        font-weight: 600;
        color: #1b2a4a;
      }
      .menu-email {
        font-size: 12px;
        color: #888;
      }
      .menu-role-badge {
        display: flex;
        align-items: center;
        gap: 4px;
        font-size: 11px;
        color: #1e5fa8;
        font-weight: 500;
        margin-top: 4px;
      }
      .menu-role-badge mat-icon {
        font-size: 14px;
        width: 14px;
        height: 14px;
      }
    `,
  ],
})
export class HeaderComponent implements OnInit, OnDestroy {
  user: any;
  currentDate = new Date();
  currentTime = '';
  private timer: any;

  constructor(private authService: AuthService) {
    this.user = this.authService.getUser();
  }

  ngOnInit(): void {
    this.updateTime();
    this.timer = setInterval(() => {
      this.currentDate = new Date();
      this.updateTime();
    }, 1000);
  }

  ngOnDestroy(): void {
    clearInterval(this.timer);
  }

  updateTime(): void {
    const now = new Date();
    this.currentTime = now.toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  }

  getInitials(): string {
    if (!this.user?.name) return 'U';
    return this.user.name
      .split(' ')
      .map((n: string) => n[0])
      .slice(0, 2)
      .join('')
      .toUpperCase();
  }

  getExpiresIn(): string {
    if (!this.user?.expiresAt) return '—';
    const expires = new Date(this.user.expiresAt);
    const now = new Date();
    const diff = expires.getTime() - now.getTime();
    const hours = Math.floor(diff / 3600000);
    const minutes = Math.floor((diff % 3600000) / 60000);
    return `${hours}h ${minutes}min`;
  }

  logout(): void {
    this.authService.logout();
  }
}
