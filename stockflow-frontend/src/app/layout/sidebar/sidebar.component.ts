import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, MatListModule, MatIconModule],
  template: `
    <div class="sidebar">
      <div class="sidebar-logo">
        <img src="logo.png" alt="StockFlow" class="logo-img">
      </div>
      <mat-nav-list>
        <a mat-list-item routerLink="/dashboard" routerLinkActive="active">
          <mat-icon matListItemIcon>dashboard</mat-icon>
          <span matListItemTitle>Dashboard</span>
        </a>
        <a mat-list-item routerLink="/products" routerLinkActive="active">
          <mat-icon matListItemIcon>inventory</mat-icon>
          <span matListItemTitle>Produtos</span>
        </a>
        <a mat-list-item routerLink="/movements" routerLinkActive="active">
          <mat-icon matListItemIcon>swap_horiz</mat-icon>
          <span matListItemTitle>Movimentações</span>
        </a>
        <a mat-list-item routerLink="/categories" routerLinkActive="active">
          <mat-icon matListItemIcon>category</mat-icon>
          <span matListItemTitle>Categorias</span>
        </a>
        <a mat-list-item routerLink="/suppliers" routerLinkActive="active">
          <mat-icon matListItemIcon>local_shipping</mat-icon>
          <span matListItemTitle>Fornecedores</span>
        </a>
      </mat-nav-list>
    </div>
  `,
styles: [`
    .sidebar {
      width: 240px;
      height: 100vh;
      background: #000000;
      color: white;
      display: flex;
      flex-direction: column;
    }
    .sidebar-logo {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px 16px;
      border-bottom: 1px solid rgba(255,255,255,0.1);
    }
    .logo-img {
      width: 180px;
      object-fit: contain;
      animation: fadeInDown 0.6s ease;
      transition: transform 0.3s ease;
    }
    .logo-img:hover {
      transform: scale(1.08);
    }
    @keyframes fadeInDown {
      from { opacity: 0; transform: translateY(-20px); }
      to   { opacity: 2; transform: translateY(0); }
    }
    mat-nav-list a {
      color: white !important;
      margin: 4px 8px;
      border-radius: 8px;
      transition: all 0.2s ease !important;
    }
    mat-nav-list a.active {
      background: rgba(255,255,255,0.15) !important;
      color: white !important;
    }
    mat-nav-list a:hover {
      background: rgba(255, 255, 255, 0.14) !important;
      color: rgba(255,255,255,0.7) !important;
    }
    mat-nav-list mat-icon {
      color: white !important;
    }
    :host ::ng-deep .mdc-list-item__primary-text {
      color: white !important;
    }
  `]
})
export class SidebarComponent {
  constructor(public authService: AuthService) {}
}