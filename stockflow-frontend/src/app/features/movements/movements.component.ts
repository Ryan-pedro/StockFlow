import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MovementService } from '../../core/services/movement.service';
import { Movement } from '../../core/models/movement.model';

@Component({
  selector: 'app-movements',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatTableModule, MatButtonModule, MatIconModule, MatChipsModule],
  template: `
    <div>
      <div class="page-header">
        <h2 class="page-title">Movimentações</h2>
        <button mat-raised-button color="primary">
          <mat-icon>add</mat-icon> Nova Movimentação
        </button>
      </div>
      <mat-card>
        <mat-card-content>
          <table mat-table [dataSource]="movements" class="full-width">
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
              <th mat-header-cell *matHeaderCellDef>Quantidade</th>
              <td mat-cell *matCellDef="let m">{{ m.quantity }}</td>
            </ng-container>
            <ng-container matColumnDef="totalValue">
              <th mat-header-cell *matHeaderCellDef>Total</th>
              <td mat-cell *matCellDef="let m">{{ m.totalValue | currency:'BRL' }}</td>
            </ng-container>
            <ng-container matColumnDef="userName">
              <th mat-header-cell *matHeaderCellDef>Usuário</th>
              <td mat-cell *matCellDef="let m">{{ m.userName }}</td>
            </ng-container>
            <ng-container matColumnDef="movementDate">
              <th mat-header-cell *matHeaderCellDef>Data</th>
              <td mat-cell *matCellDef="let m">{{ m.movementDate | date:'dd/MM/yyyy HH:mm' }}</td>
            </ng-container>
            <tr mat-header-row *matHeaderRowDef="columns"></tr>
            <tr mat-row *matRowDef="let row; columns: columns"></tr>
          </table>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .page-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; }
    .page-title { margin: 0; color: #1B2A4A; font-size: 24px; }
    .full-width { width: 100%; }
  `]
})
export class MovementsComponent implements OnInit {
  movements: Movement[] = [];
  columns = ['productName', 'type', 'quantity', 'totalValue', 'userName', 'movementDate'];

  constructor(private movementService: MovementService) {}

  ngOnInit(): void {
    this.movementService.getAll().subscribe(data => this.movements = data);
  }
}