import { Component, OnInit, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDividerModule } from '@angular/material/divider';
import { MatChipsModule } from '@angular/material/chips';
import { MatTableModule } from '@angular/material/table';
import { SupplierService } from '../../core/services/supplier.service';
import { ProductService } from '../../core/services/product.service';
import { Supplier } from '../../core/models/supplier.model';
import { Product } from '../../core/models/product.model';

@Component({
  selector: 'app-suppliers',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule, ReactiveFormsModule, MatCardModule, MatButtonModule,
    MatIconModule, MatFormFieldModule, MatInputModule, MatSnackBarModule,
    MatExpansionModule, MatDividerModule, MatChipsModule, MatTableModule
  ],
  template: `
    <div>
      <div class="page-header">
        <h2 class="page-title">Fornecedores</h2>
        <button mat-raised-button color="primary" (click)="openForm()">
          <mat-icon>add</mat-icon> Novo Fornecedor
        </button>
      </div>

      <mat-card *ngIf="showForm" class="form-card">
        <mat-card-header>
          <mat-card-title>{{ editingId ? 'Editar Fornecedor' : 'Novo Fornecedor' }}</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <form [formGroup]="form" (ngSubmit)="onSubmit()" class="form-grid">
            <mat-form-field appearance="outline">
              <mat-label>Nome</mat-label>
              <input matInput formControlName="name">
            </mat-form-field>
            <mat-form-field appearance="outline">
              <mat-label>CNPJ</mat-label>
              <input matInput formControlName="cnpj">
            </mat-form-field>
            <mat-form-field appearance="outline">
              <mat-label>Email</mat-label>
              <input matInput formControlName="email" type="email">
            </mat-form-field>
            <mat-form-field appearance="outline">
              <mat-label>Telefone</mat-label>
              <input matInput formControlName="phone">
            </mat-form-field>
            <mat-form-field appearance="outline" class="full-col">
              <mat-label>Endereço</mat-label>
              <input matInput formControlName="address">
            </mat-form-field>
            <div class="form-actions">
              <button mat-button type="button" (click)="closeForm()">Cancelar</button>
              <button mat-raised-button color="primary" type="submit" [disabled]="form.invalid">
                {{ editingId ? 'Salvar' : 'Criar' }}
              </button>
            </div>
          </form>
        </mat-card-content>
      </mat-card>

      <mat-accordion class="suppliers-accordion">
        <mat-expansion-panel
          *ngFor="let supplier of suppliers"
          (opened)="loadProducts(supplier.id)"
          class="supplier-panel">

      <mat-expansion-panel-header>
        <mat-panel-title class="panel-title">
          <mat-icon class="supplier-icon">local_shipping</mat-icon>
            {{ supplier.name }}
        </mat-panel-title>
      </mat-expansion-panel-header>

          <div class="panel-content">

            <!-- Informações detalhadas -->
            <div class="info-grid">
              <div class="info-item">
                <mat-icon>email</mat-icon>
                <div>
                  <span class="info-label">Email</span>
                  <span class="info-value">{{ supplier.email || 'Não informado' }}</span>
                </div>
              </div>
              <div class="info-item">
                <mat-icon>phone</mat-icon>
                <div>
                  <span class="info-label">Telefone</span>
                  <span class="info-value">{{ supplier.phone || 'Não informado' }}</span>
                </div>
              </div>
              <div class="info-item">
                <mat-icon>location_on</mat-icon>
                <div>
                  <span class="info-label">Endereço</span>
                  <span class="info-value">{{ supplier.address || 'Não informado' }}</span>
                </div>
              </div>
              <div class="info-item">
                <mat-icon>badge</mat-icon>
                <div>
                  <span class="info-label">CNPJ</span>
                  <span class="info-value">{{ supplier.cnpj || 'Não informado' }}</span>
                </div>
              </div>
            </div>

            <mat-divider class="divider"></mat-divider>

            <!-- Ações -->
            <div class="panel-actions">
              <button mat-stroked-button color="primary" (click)="editSupplier(supplier); $event.stopPropagation()">
                <mat-icon>edit</mat-icon> Editar
              </button>
              <button mat-stroked-button color="warn" (click)="deleteSupplier(supplier.id); $event.stopPropagation()">
                <mat-icon>delete</mat-icon> Excluir
              </button>
            </div>

            <mat-divider class="divider"></mat-divider>

            <!-- Produtos do fornecedor -->
            <h4 class="products-title">
              <mat-icon>inventory</mat-icon>
              Produtos fornecidos
            </h4>

            <div *ngIf="!productsBySupplier[supplier.id]" class="loading">
              Carregando produtos...
            </div>

            <div *ngIf="productsBySupplier[supplier.id]?.length === 0" class="empty">
              Nenhum produto vinculado a este fornecedor.
            </div>

            <table mat-table [dataSource]="getProducts(supplier.id)"
              *ngIf="hasProducts(supplier.id)" class="products-table">
              <ng-container matColumnDef="name">
                <th mat-header-cell *matHeaderCellDef>Nome</th>
                <td mat-cell *matCellDef="let p">{{ p.name }}</td>
              </ng-container>
              <ng-container matColumnDef="code">
                <th mat-header-cell *matHeaderCellDef>Código</th>
                <td mat-cell *matCellDef="let p">{{ p.code }}</td>
              </ng-container>
              <ng-container matColumnDef="stock">
                <th mat-header-cell *matHeaderCellDef>Estoque</th>
                <td mat-cell *matCellDef="let p">
                  <mat-chip [color]="p.isLowStock ? 'warn' : 'primary'" highlighted>
                    {{ p.stockQuantity }}
                  </mat-chip>
                </td>
              </ng-container>
              <ng-container matColumnDef="price">
                <th mat-header-cell *matHeaderCellDef>Preço</th>
                <td mat-cell *matCellDef="let p">{{ p.unitPrice | currency:'BRL' }}</td>
              </ng-container>
              <tr mat-header-row *matHeaderRowDef="['name','code','stock','price']"></tr>
              <tr mat-row *matRowDef="let row; columns: ['name','code','stock','price']"></tr>
            </table>
          </div>
        </mat-expansion-panel>
      </mat-accordion>
    </div>
  `,
  styles: [`
    .page-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; }
    .page-title { margin: 0; color: #1B2A4A; font-size: 24px; }
    .form-card { margin-bottom: 24px; }
    .form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; padding-top: 16px; }
    .full-col { grid-column: 1 / -1; }
    .form-actions { grid-column: 1 / -1; display: flex; justify-content: flex-end; gap: 8px; }
    .suppliers-accordion { display: flex; flex-direction: column; gap: 8px; }
    .supplier-panel { border-radius: 8px !important; }
    .panel-title { display: flex; align-items: center; gap: 8px; font-weight: 500; color: #1B2A4A; }
    .supplier-icon { color: #1E5FA8; font-size: 20px; width: 20px; height: 20px; }
    .panel-content { padding-top: 8px; }
    .info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 16px; }
    .info-item { display: flex; align-items: flex-start; gap: 12px; }
    .info-item mat-icon { color: #1E5FA8; margin-top: 2px; }
    .info-label { display: block; font-size: 11px; color: #888; text-transform: uppercase; letter-spacing: 0.5px; }
    .info-value { display: block; font-size: 14px; color: #1B2A4A; font-weight: 500; }
    .divider { margin: 16px 0 !important; }
    .panel-actions { display: flex; gap: 8px; margin-bottom: 4px; }
    .products-title { display: flex; align-items: center; gap: 8px; color: #1B2A4A; margin: 0 0 12px; font-size: 14px; font-weight: 500; }
    .products-title mat-icon { font-size: 18px; width: 18px; height: 18px; color: #1E5FA8; }
    .products-table { width: 100%; }
    .loading, .empty { color: #666; font-size: 14px; padding: 16px 0; }
  `]
})
export class SuppliersComponent implements OnInit {
  suppliers: Supplier[] = [];
  productsBySupplier: { [key: string]: Product[] } = {};
  showForm = false;
  editingId: string | null = null;
  form: FormGroup;

  constructor(
    private supplierService: SupplierService,
    private productService: ProductService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private cdr: ChangeDetectorRef
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      cnpj: [''],
      email: ['', Validators.email],
      phone: [''],
      address: ['']
    });
  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.supplierService.getAll().subscribe(data => {
      this.suppliers = data;
      this.cdr.detectChanges();
    });
  }

  loadProducts(supplierId: string): void {
    if (this.productsBySupplier[supplierId] !== undefined) return;
    this.productService.getAll().subscribe(data => {
      this.productsBySupplier[supplierId] = data.filter(p => p.supplierId === supplierId);
      this.cdr.detectChanges();
    });
  }

  getProducts(supplierId: string): Product[] {
    return this.productsBySupplier[supplierId] ?? [];
  }

  hasProducts(supplierId: string): boolean {
    return (this.productsBySupplier[supplierId]?.length ?? 0) > 0;
  }

  openForm(): void {
    this.showForm = true;
    this.editingId = null;
    this.form.reset();
    this.cdr.detectChanges();
  }

  closeForm(): void {
    this.showForm = false;
    this.editingId = null;
    this.form.reset();
    this.cdr.detectChanges();
  }

  editSupplier(supplier: Supplier): void {
    this.showForm = true;
    this.editingId = supplier.id;
    this.form.patchValue(supplier);
    this.cdr.detectChanges();
  }

  onSubmit(): void {
    if (this.form.invalid) return;
    const data = this.form.value;

    if (this.editingId) {
      this.supplierService.update(this.editingId, data).subscribe(() => {
        this.snackBar.open('Fornecedor atualizado!', 'OK', { duration: 3000 });
        this.closeForm();
        this.loadData();
      });
    } else {
      this.supplierService.create(data).subscribe(() => {
        this.snackBar.open('Fornecedor criado!', 'OK', { duration: 3000 });
        this.closeForm();
        this.loadData();
      });
    }
  }

  deleteSupplier(id: string): void {
    if (!confirm('Deseja excluir este fornecedor?')) return;
    this.supplierService.delete(id).subscribe(() => {
      this.snackBar.open('Fornecedor excluído!', 'OK', { duration: 3000 });
      this.loadData();
    });
  }
}