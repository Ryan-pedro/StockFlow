import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatChipsModule } from '@angular/material/chips';
import { DashboardService } from '../../core/services/dashboard.service';
import { Dashboard } from '../../core/models/dashboard.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule, MatTableModule, MatChipsModule],
  template: `
    <div class="dashboard">
      <h2 class="page-title">Dashboard</h2>

      <div class="cards-grid" *ngIf="data">
        <mat-card class="stat-card blue">
          <mat-icon>inventory</mat-icon>
          <div>
            <span class="stat-label">Total de Produtos</span>
            <span class="stat-value">{{ data.totalProducts }}</span>
          </div>
        </mat-card>
        <mat-card class="stat-card teal">
          <mat-icon>storage</mat-icon>
          <div>
            <span class="stat-label">Itens em Estoque</span>
            <span class="stat-value">{{ data.totalStockItems }}</span>
          </div>
        </mat-card>
        <mat-card class="stat-card orange">
          <mat-icon>warning</mat-icon>
          <div>
            <span class="stat-label">Estoque Baixo</span>
            <span class="stat-value">{{ data.lowStockCount }}</span>
          </div>
        </mat-card>
        <mat-card class="stat-card green">
          <mat-icon>swap_horiz</mat-icon>
          <div>
            <span class="stat-label">Movimentações Hoje</span>
            <span class="stat-value">{{ data.movementsToday }}</span>
          </div>
        </mat-card>
      </div>

      <div class="tables-grid" *ngIf="data">
        <mat-card>
          <mat-card-header>
            <mat-card-title>Produtos com Estoque Baixo</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <table mat-table [dataSource]="data.lowStockProducts" class="full-width">
              <ng-container matColumnDef="name">
                <th mat-header-cell *matHeaderCellDef>Produto</th>
                <td mat-cell *matCellDef="let p">{{ p.name }}</td>
              </ng-container>
              <ng-container matColumnDef="stockQuantity">
                <th mat-header-cell *matHeaderCellDef>Estoque</th>
                <td mat-cell *matCellDef="let p">
                  <mat-chip color="warn" highlighted>{{ p.stockQuantity }}</mat-chip>
                </td>
              </ng-container>
              <ng-container matColumnDef="minimumStock">
                <th mat-header-cell *matHeaderCellDef>Mínimo</th>
                <td mat-cell *matCellDef="let p">{{ p.minimumStock }}</td>
              </ng-container>
              <tr mat-header-row *matHeaderRowDef="['name','stockQuantity','minimumStock']"></tr>
              <tr mat-row *matRowDef="let row; columns: ['name','stockQuantity','minimumStock']"></tr>
            </table>
          </mat-card-content>
        </mat-card>

        <mat-card>
          <mat-card-header>
            <mat-card-title>Movimentações Recentes</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <table mat-table [dataSource]="data.recentMovements" class="full-width">
              <ng-container matColumnDef="productName">
                <th mat-header-cell *matHeaderCellDef>Produto</th>
                <td mat-cell *matCellDef="let m">{{ m.productName }}</td>
              </ng-container>
              <ng-container matColumnDef="type">
                <th mat-header-cell *matHeaderCellDef>Tipo</th>
                <td mat-cell *matCellDef="let m">
                  <mat-chip [color]="m.type === 'Entry' ? 'primary' : 'warn'" highlighted>
                    {{ m.type === 'Entry' ? 'Entrada' : 'Saída' }}
                  </mat-chip>
                </td>
              </ng-container>
              <ng-container matColumnDef="quantity">
                <th mat-header-cell *matHeaderCellDef>Qtd</th>
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
    .page-title { margin: 0 0 24px; color: #1B2A4A; font-size: 24px; }
    .cards-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin-bottom: 24px; }
    .stat-card { display: flex; align-items: center; gap: 16px; padding: 20px !important; color: white; }
    .stat-card mat-icon { font-size: 36px; width: 36px; height: 36px; opacity: 0.9; }
    .stat-card.blue { background: #1E5FA8; }
    .stat-card.teal { background: #17A8A8; }
    .stat-card.orange { background: #E07B2A; }
    .stat-card.green { background: #1A7A4A; }
    .stat-label { display: block; font-size: 13px; opacity: 0.85; }
    .stat-value { display: block; font-size: 28px; font-weight: 700; }
    .tables-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
    .full-width { width: 100%; }
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