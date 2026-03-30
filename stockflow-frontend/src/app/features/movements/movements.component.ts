import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { MovementService } from '../../core/services/movement.service';
import { ProductService } from '../../core/services/product.service';
import { Movement } from '../../core/models/movement.model';
import { Product } from '../../core/models/product.model';
import { AuthService } from '../../core/services/auth.service';
import { MatDivider } from "@angular/material/divider";

@Component({
  selector: 'app-movements',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule, MatCardModule, MatTableModule,
    MatButtonModule, MatIconModule, MatChipsModule, MatFormFieldModule,
    MatInputModule, MatSelectModule, MatSnackBarModule,
    MatDivider
],
template: `
    <div>
      <div class="page-header">
        <div class="title-group">
          <mat-icon class="title-icon">swap_horiz</mat-icon>
          <h2 class="page-title">Movimentações</h2>
        </div>
        <button mat-raised-button color="primary" (click)="openForm()">
          <mat-icon>add</mat-icon> Nova Movimentação
        </button>
      </div>

      <mat-card *ngIf="showForm" class="form-card">
        <mat-card-header>
          <mat-card-title>
            <div class="card-title">
              <mat-icon>add_circle</mat-icon>
              Registrar Movimentação
            </div>
          </mat-card-title>
        </mat-card-header>
        <mat-divider></mat-divider>
        <mat-card-content>
          <form [formGroup]="form" (ngSubmit)="onSubmit()" class="form-grid">
            <mat-form-field appearance="outline">
              <mat-label>Produto</mat-label>
              <mat-icon matPrefix>inventory</mat-icon>
              <mat-select formControlName="productId">
                <mat-option *ngFor="let p of products" [value]="p.id">
                  {{ p.name }} (Estoque: {{ p.stockQuantity }})
                </mat-option>
              </mat-select>
            </mat-form-field>
            <mat-form-field appearance="outline">
              <mat-label>Tipo</mat-label>
              <mat-icon matPrefix>compare_arrows</mat-icon>
              <mat-select formControlName="type">
                <mat-option value="Entry">
                  <mat-icon>arrow_downward</mat-icon> Entrada
                </mat-option>
                <mat-option value="Exit">
                  <mat-icon>arrow_upward</mat-icon> Saída
                </mat-option>
              </mat-select>
            </mat-form-field>
            <mat-form-field appearance="outline">
              <mat-label>Quantidade</mat-label>
              <mat-icon matPrefix>pin</mat-icon>
              <input matInput formControlName="quantity" type="number">
            </mat-form-field>
            <mat-form-field appearance="outline">
              <mat-label>Preço Unitário</mat-label>
              <mat-icon matPrefix>attach_money</mat-icon>
              <input matInput formControlName="unitPrice" type="number" step="0.01">
            </mat-form-field>
            <mat-form-field appearance="outline" class="full-col">
              <mat-label>Observações</mat-label>
              <mat-icon matPrefix>notes</mat-icon>
              <textarea matInput formControlName="notes" rows="2"></textarea>
            </mat-form-field>
            <div class="form-actions">
              <button mat-button type="button" (click)="closeForm()">
                <mat-icon>close</mat-icon> Cancelar
              </button>
              <button mat-raised-button color="primary" type="submit" [disabled]="form.invalid">
                <mat-icon>save</mat-icon> Registrar
              </button>
            </div>
          </form>
        </mat-card-content>
      </mat-card>

      <mat-card class="table-card">
        <mat-card-header>
          <mat-card-title>
            <div class="card-title">
              <mat-icon>history</mat-icon>
              Histórico de Movimentações
            </div>
          </mat-card-title>
        </mat-card-header>
        <mat-divider></mat-divider>
        <mat-card-content>
          <table mat-table [dataSource]="movements" class="full-width">
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
                <div class="header-cell"><mat-icon>pin</mat-icon> Quantidade</div>
              </th>
              <td mat-cell *matCellDef="let m">{{ m.quantity }}</td>
            </ng-container>
            <ng-container matColumnDef="totalValue">
              <th mat-header-cell *matHeaderCellDef>
                <div class="header-cell"><mat-icon>attach_money</mat-icon> Total</div>
              </th>
              <td mat-cell *matCellDef="let m">{{ m.totalValue | currency:'BRL' }}</td>
            </ng-container>
            <ng-container matColumnDef="userName">
              <th mat-header-cell *matHeaderCellDef>
                <div class="header-cell"><mat-icon>person</mat-icon> Usuário</div>
              </th>
              <td mat-cell *matCellDef="let m">{{ m.userName }}</td>
            </ng-container>
            <ng-container matColumnDef="movementDate">
              <th mat-header-cell *matHeaderCellDef>
                <div class="header-cell"><mat-icon>calendar_today</mat-icon> Data</div>
              </th>
              <td mat-cell *matCellDef="let m">{{ m.movementDate | date:'dd/MM/yyyy HH:mm' }}</td>
            </ng-container>
            <tr mat-header-row *matHeaderRowDef="columns"></tr>
            <tr mat-row *matRowDef="let row; columns: columns" class="table-row"></tr>
          </table>
        </mat-card-content>
      </mat-card>
    </div>
  `,
styles: [`
    .page-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; }
    .title-group { display: flex; align-items: center; gap: 10px; }
    .title-icon { font-size: 28px; width: 28px; height: 28px; color: #1B2A4A; }
    .page-title { margin: 0; color: #1B2A4A; font-size: 24px; font-weight: 600; }
    .card-title { display: flex; align-items: center; gap: 8px; font-size: 16px; }
    .full-width { width: 100%; }
    .form-card { margin-bottom: 24px; border-radius: 12px !important; }
    .table-card { border-radius: 12px !important; }
    .form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; padding-top: 16px; }
    .full-col { grid-column: 1 / -1; }
    .form-actions { grid-column: 1 / -1; display: flex; justify-content: flex-end; gap: 8px; }
    .header-cell { display: flex; align-items: center; gap: 4px; font-size: 13px; }
    .header-cell mat-icon { font-size: 16px; width: 16px; height: 16px; opacity: 0.7; }
    .table-row:hover { background: #F0F3F7; }
  `]
})
export class MovementsComponent implements OnInit {
  movements: Movement[] = [];
  products: Product[] = [];
  columns = ['productName', 'type', 'quantity', 'totalValue', 'userName', 'movementDate'];
  showForm = false;
  form: FormGroup;

  constructor(
    private movementService: MovementService,
    private productService: ProductService,
    private authService: AuthService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private cdr: ChangeDetectorRef
  ) {
    this.form = this.fb.group({
      productId: ['', Validators.required],
      type: ['', Validators.required],
      quantity: [1, [Validators.required, Validators.min(1)]],
      unitPrice: [0, [Validators.required, Validators.min(0)]],
      notes: ['']
    });
  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.movementService.getAll().subscribe({
      next: data => { 
        console.log('Movements:', data);
        this.movements = data; 
        this.cdr.detectChanges(); 
      },
      error: err => console.error('Error:', err)
    });
    this.productService.getAll().subscribe(data => { 
      this.products = data; 
      this.cdr.detectChanges(); 
    });
  }

  openForm(): void {
    this.showForm = true;
    this.form.reset({ quantity: 1, unitPrice: 0 });
    this.cdr.detectChanges();
  }

  closeForm(): void {
    this.showForm = false;
    this.form.reset();
    this.cdr.detectChanges();
  }

  onSubmit(): void {
    if (this.form.invalid) return;
    const user = this.authService.getUser();
    const data = {
      ...this.form.value,
      userId: user?.name
    };

    this.movementService.register(data).subscribe({
      next: () => {
        this.snackBar.open('Movimentação registrada!', 'OK', { duration: 3000 });
        this.closeForm();
        this.loadData();
      },
      error: (err) => {
        this.snackBar.open(err?.error?.message || 'Erro ao registrar.', 'OK', { duration: 4000 });
      }
    });
  }
}