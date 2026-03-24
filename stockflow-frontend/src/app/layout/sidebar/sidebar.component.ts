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
        <mat-icon>inventory_2</mat-icon>
        <span>StockFlow</span>
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
      background: #1B2A4A;
      color: white;
      display: flex;
      flex-direction: column;
    }
    .sidebar-logo {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 24px 16px;
      font-size: 20px;
      font-weight: 700;
      border-bottom: 1px solid rgba(255,255,255,0.1);
    }
    mat-nav-list a {
      color: rgba(255,255,255,0.7) !important;
      margin: 4px 8px;
      border-radius: 8px;
    }
    mat-nav-list a.active {
      background: rgba(255,255,255,0.15) !important;
      color: white !important;
    }
    mat-nav-list a:hover {
      background: rgba(255,255,255,0.1) !important;
      color: white !important;
    }
  `]
})
export class SidebarComponent {
  constructor(public authService: AuthService) {}
}