import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { DashboardService } from '../../core/services/dashboard.service';
import { Dashboard } from '../../core/models/dashboard.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule, MatTableModule, MatChipsModule, MatDividerModule],
  template: `
    <div class="dashboard">

      <div class="page-header">
        <div class="title-group">
          <mat-icon class="title-icon">dashboard</mat-icon>
          <h2 class="page-title">Dashboard</h2>
        </div>
      </div>

      <div class="cards-grid" *ngIf="data">
        <mat-card class="stat-card blue">
          <div class="stat-icon-wrap"><mat-icon>inventory_2</mat-icon></div>
          <div class="stat-info">
            <span class="stat-label">Total de Produtos</span>
            <span class="stat-value">{{ data.totalProducts }}</span>
          </div>
        </mat-card>
        <mat-card class="stat-card teal">
          <div class="stat-icon-wrap"><mat-icon>storage</mat-icon></div>
          <div class="stat-info">
            <span class="stat-label">Itens em Estoque</span>
            <span class="stat-value">{{ data.totalStockItems }}</span>
          </div>
        </mat-card>
        <mat-card class="stat-card orange">
          <div class="stat-icon-wrap"><mat-icon>warning_amber</mat-icon></div>
          <div class="stat-info">
            <span class="stat-label">Estoque Baixo</span>
            <span class="stat-value">{{ data.lowStockCount }}</span>
          </div>
        </mat-card>
        <mat-card class="stat-card green">
          <div class="stat-icon-wrap"><mat-icon>swap_horiz</mat-icon></div>
          <div class="stat-info">
            <span class="stat-label">Movimentações Hoje</span>
            <span class="stat-value">{{ data.movementsToday }}</span>
          </div>
        </mat-card>
      </div>

      <div class="tables-grid" *ngIf="data">
        <mat-card class="table-card">
          <mat-card-header>
            <mat-card-title>
              <div class="card-title">
                <mat-icon color="warn">warning</mat-icon>
                Produtos com Estoque Baixo
              </div>
            </mat-card-title>
          </mat-card-header>
          <mat-divider></mat-divider>
          <mat-card-content>
            <div *ngIf="data.lowStockProducts.length === 0" class="empty-state">
              <mat-icon>check_circle</mat-icon>
              <span>Nenhum produto com estoque baixo</span>
            </div>
            <table mat-table [dataSource]="data.lowStockProducts" class="full-width"
              *ngIf="data.lowStockProducts.length > 0">
              <ng-container matColumnDef="name">
                <th mat-header-cell *matHeaderCellDef>
                  <div class="header-cell"><mat-icon>inventory</mat-icon> Produto</div>
                </th>
                <td mat-cell *matCellDef="let p">{{ p.name }}</td>
              </ng-container>
              <ng-container matColumnDef="stockQuantity">
                <th mat-header-cell *matHeaderCellDef>
                  <div class="header-cell"><mat-icon>storage</mat-icon> Estoque</div>
                </th>
                <td mat-cell *matCellDef="let p">
                  <mat-chip color="warn" highlighted>{{ p.stockQuantity }}</mat-chip>
                </td>
              </ng-container>
              <ng-container matColumnDef="minimumStock">
                <th mat-header-cell *matHeaderCellDef>
                  <div class="header-cell"><mat-icon>remove_circle_outline</mat-icon> Mínimo</div>
                </th>
                <td mat-cell *matCellDef="let p">{{ p.minimumStock }}</td>
              </ng-container>
              <tr mat-header-row *matHeaderRowDef="['name','stockQuantity','minimumStock']"></tr>
              <tr mat-row *matRowDef="let row; columns: ['name','stockQuantity','minimumStock']"></tr>
            </table>
          </mat-card-content>
        </mat-card>

        <mat-card class="table-card">
          <mat-card-header>
            <mat-card-title>
              <div class="card-title">
                <mat-icon color="primary">swap_horiz</mat-icon>
                Movimentações Recentes
              </div>
            </mat-card-title>
          </mat-card-header>
          <mat-divider></mat-divider>
          <mat-card-content>
            <div *ngIf="data.recentMovements.length === 0" class="empty-state">
              <mat-icon>inbox</mat-icon>
              <span>Nenhuma movimentação recente</span>
            </div>
            <table mat-table [dataSource]="data.recentMovements" class="full-width"
              *ngIf="data.recentMovements.length > 0">
              <ng-container matColumnDef="productName">
                <th mat-header-cell *matHeaderCellDef>
                  <div class="header-cell"><mat-icon>inventory</mat-icon> Produto</div>
                </th>
                <td mat-cell *matCellDef="let m">{{ m.productName }}</td>
              </ng-container>
              <ng-container matColumnDef="type">
                <th mat-header-cell *matHeaderCellDef>
                  <div class="header-cell"><mat-icon>compare_arrows</mat-icon> Tipo</div>
                </th>
                <td mat-cell *matCellDef="let m">
                  <mat-chip [color]="m.type === 'Entry' ? 'primary' : 'warn'" highlighted>
                    <mat-icon>{{ m.type === 'Entry' ? 'arrow_downward' : 'arrow_upward' }}</mat-icon>
                    {{ m.type === 'Entry' ? 'Entrada' : 'Saída' }}
                  </mat-chip>
                </td>
              </ng-container>
              <ng-container matColumnDef="quantity">
                <th mat-header-cell *matHeaderCellDef>
                  <div class="header-cell"><mat-icon>pin</mat-icon> Qtd</div>
                </th>
                <td mat-cell *matCellDef="let m">{{ m.quantity }}</td>
              </ng-container>
              <tr mat-header-row *matHeaderRowDef="['productName','type','quantity']"></tr>
              <tr mat-row *matRowDef="let row; columns: ['productName','type','quantity']"></tr>
            </table>
          </mat-card-content>
        </mat-card>
      </div>
    </div>
  `,
  styles: [`
    .page-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; }
    .title-group { display: flex; align-items: center; gap: 10px; }
    .title-icon { font-size: 28px; width: 28px; height: 28px; color: #1B2A4A; }
    .page-title { margin: 0; color: #1B2A4A; font-size: 24px; font-weight: 600; }
    .cards-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin-bottom: 24px; }
    .stat-card { display: flex; align-items: center; gap: 16px; padding: 20px !important; color: white; border-radius: 12px !important; }
    .stat-icon-wrap { background: rgba(255,255,255,0.2); border-radius: 50%; padding: 10px; display: flex; }
    .stat-icon-wrap mat-icon { font-size: 28px; width: 28px; height: 28px; }
    .stat-card.blue { background: #0873ed; }
    .stat-card.teal { background: #18c8c8; }
    .stat-card.orange { background: #ff0000e7; }
    .stat-card.green { background: #09a829; }
    .stat-label { display: block; font-size: 13px; opacity: 0.85; }
    .stat-value { display: block; font-size: 28px; font-weight: 700; }
    .tables-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
    .table-card { border-radius: 12px !important; }
    .card-title { display: flex; align-items: center; gap: 8px; font-size: 16px; }
    .header-cell { display: flex; align-items: center; gap: 4px; font-size: 13px; }
    .header-cell mat-icon { font-size: 16px; width: 16px; height: 16px; opacity: 0.7; }
    .full-width { width: 100%; }
    .empty-state { display: flex; align-items: center; gap: 8px; padding: 24px 0; color: #888; justify-content: center; }
    .empty-state mat-icon { color: #09a829; }
  `]
})
export class DashboardComponent implements OnInit {
  data?: Dashboard;

  constructor(
    private dashboardService: DashboardService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.dashboardService.get().subscribe(data => {
      this.data = data;
      this.cdr.detectChanges();
    });
  }
}