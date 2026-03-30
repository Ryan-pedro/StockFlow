import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { ProductService } from '../../core/services/product.service';
import { CategoryService } from '../../core/services/category.service';
import { SupplierService } from '../../core/services/supplier.service';
import { Product } from '../../core/models/product.model';
import { Category } from '../../core/models/category.model';
import { Supplier } from '../../core/models/supplier.model';
import { MatDivider } from "@angular/material/divider";

@Component({
  selector: 'app-products',
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
          <mat-icon class="title-icon">inventory_2</mat-icon>
          <h2 class="page-title">Produtos</h2>
        </div>
        <button mat-raised-button color="primary" (click)="openForm()">
          <mat-icon>add</mat-icon> Novo Produto
        </button>
      </div>

      <!-- Formulário -->
      <mat-card *ngIf="showForm" class="form-card">
        <mat-card-header>
          <mat-card-title>
            <div class="card-title">
              <mat-icon>{{ editingId ? 'edit' : 'add_circle' }}</mat-icon>
              {{ editingId ? 'Editar Produto' : 'Novo Produto' }}
            </div>
          </mat-card-title>
        </mat-card-header>
        <mat-divider></mat-divider>
        <mat-card-content>
          <form [formGroup]="form" (ngSubmit)="onSubmit()" class="form-grid">
            <mat-form-field appearance="outline">
              <mat-label>Nome</mat-label>
              <mat-icon matPrefix>label</mat-icon>
              <input matInput formControlName="name">
            </mat-form-field>
            <mat-form-field appearance="outline">
              <mat-label>Código</mat-label>
              <mat-icon matPrefix>qr_code</mat-icon>
              <input matInput formControlName="code">
            </mat-form-field>
            <mat-form-field appearance="outline">
              <mat-label>Categoria</mat-label>
              <mat-icon matPrefix>category</mat-icon>
              <mat-select formControlName="categoryId">
                <mat-option *ngFor="let c of categories" [value]="c.id">{{ c.name }}</mat-option>
              </mat-select>
            </mat-form-field>
            <mat-form-field appearance="outline">
              <mat-label>Fornecedor</mat-label>
              <mat-icon matPrefix>local_shipping</mat-icon>
              <mat-select formControlName="supplierId">
                <mat-option value="">Nenhum</mat-option>
                <mat-option *ngFor="let s of suppliers" [value]="s.id">{{ s.name }}</mat-option>
              </mat-select>
            </mat-form-field>
            <mat-form-field appearance="outline">
              <mat-label>Preço Unitário</mat-label>
              <mat-icon matPrefix>attach_money</mat-icon>
              <input matInput formControlName="unitPrice" type="number" step="0.01">
            </mat-form-field>
            <mat-form-field appearance="outline">
              <mat-label>Estoque Mínimo</mat-label>
              <mat-icon matPrefix>remove_circle_outline</mat-icon>
              <input matInput formControlName="minimumStock" type="number">
            </mat-form-field>
            <mat-form-field appearance="outline" class="full-col">
              <mat-label>Descrição</mat-label>
              <mat-icon matPrefix>description</mat-icon>
              <textarea matInput formControlName="description" rows="3"></textarea>
            </mat-form-field>
            <div class="form-actions">
              <button mat-button type="button" (click)="closeForm()">
                <mat-icon>close</mat-icon> Cancelar
              </button>
              <button mat-raised-button color="primary" type="submit" [disabled]="form.invalid">
                <mat-icon>save</mat-icon> {{ editingId ? 'Salvar' : 'Criar' }}
              </button>
            </div>
          </form>
        </mat-card-content>
      </mat-card>

      <!-- Tabela -->
      <mat-card class="table-card">
        <mat-card-header>
          <mat-card-title>
            <div class="card-title">
              <mat-icon>list</mat-icon>
              Lista de Produtos
            </div>
          </mat-card-title>
        </mat-card-header>
        <mat-divider></mat-divider>
        <mat-card-content>
          <table mat-table [dataSource]="products" class="full-width">
            <ng-container matColumnDef="name">
              <th mat-header-cell *matHeaderCellDef>
                <div class="header-cell"><mat-icon>label</mat-icon> Nome</div>
              </th>
              <td mat-cell *matCellDef="let p">{{ p.name }}</td>
            </ng-container>
            <ng-container matColumnDef="code">
              <th mat-header-cell *matHeaderCellDef>
                <div class="header-cell"><mat-icon>qr_code</mat-icon> Código</div>
              </th>
              <td mat-cell *matCellDef="let p"><code class="code-badge">{{ p.code }}</code></td>
            </ng-container>
            <ng-container matColumnDef="category">
              <th mat-header-cell *matHeaderCellDef>
                <div class="header-cell"><mat-icon>category</mat-icon> Categoria</div>
              </th>
              <td mat-cell *matCellDef="let p">{{ p.categoryName }}</td>
            </ng-container>
            <ng-container matColumnDef="stock">
              <th mat-header-cell *matHeaderCellDef>
                <div class="header-cell"><mat-icon>storage</mat-icon> Estoque</div>
              </th>
              <td mat-cell *matCellDef="let p">
                <div class="stock-cell">
                  <mat-chip [color]="p.isLowStock ? 'warn' : 'primary'" highlighted>
                    {{ p.stockQuantity }}
                  </mat-chip>
                  <mat-icon *ngIf="p.isLowStock" color="warn" class="warn-icon">warning</mat-icon>
                </div>
              </td>
            </ng-container>
            <ng-container matColumnDef="price">
              <th mat-header-cell *matHeaderCellDef>
                <div class="header-cell"><mat-icon>attach_money</mat-icon> Preço</div>
              </th>
              <td mat-cell *matCellDef="let p">{{ p.unitPrice | currency:'BRL' }}</td>
            </ng-container>
            <ng-container matColumnDef="actions">
              <th mat-header-cell *matHeaderCellDef>Ações</th>
              <td mat-cell *matCellDef="let p">
                <button mat-icon-button color="primary" (click)="editProduct(p)" matTooltip="Editar">
                  <mat-icon>edit</mat-icon>
                </button>
                <button mat-icon-button color="warn" (click)="deleteProduct(p.id)" matTooltip="Excluir">
                  <mat-icon>delete</mat-icon>
                </button>
              </td>
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
    .code-badge { background: #F0F3F7; padding: 2px 8px; border-radius: 4px; font-size: 13px; color: #1B2A4A; }
    .stock-cell { display: flex; align-items: center; gap: 6px; }
    .warn-icon { font-size: 18px; width: 18px; height: 18px; }
    .table-row:hover { background: #F0F3F7; }
  `]
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  categories: Category[] = [];
  suppliers: Supplier[] = [];
  columns = ['name', 'code', 'category', 'stock', 'price', 'actions'];
  showForm = false;
  editingId: string | null = null;
  form: FormGroup;

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private supplierService: SupplierService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private cdr: ChangeDetectorRef
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      code: ['', Validators.required],
      categoryId: ['', Validators.required],
      supplierId: [''],
      unitPrice: [0, [Validators.required, Validators.min(0)]],
      minimumStock: [0, [Validators.required, Validators.min(0)]],
      description: ['']
    });
  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.productService.getAll().subscribe(data => { this.products = data; this.cdr.detectChanges(); });
    this.categoryService.getAll().subscribe(data => { this.categories = data; this.cdr.detectChanges(); });
    this.supplierService.getAll().subscribe(data => { this.suppliers = data; this.cdr.detectChanges(); });
  }

  openForm(): void {
    this.showForm = true;
    this.editingId = null;
    this.form.reset({ unitPrice: 0, minimumStock: 0 });
    this.cdr.detectChanges();
  }

  closeForm(): void {
    this.showForm = false;
    this.editingId = null;
    this.form.reset();
    this.cdr.detectChanges();
  }

  editProduct(product: Product): void {
    this.showForm = true;
    this.editingId = product.id;
    this.form.patchValue(product);
    this.cdr.detectChanges();
  }

  onSubmit(): void {
    if (this.form.invalid) return;
    const data = this.form.value;

    if (this.editingId) {
      this.productService.update(this.editingId, data).subscribe(() => {
        this.snackBar.open('Produto atualizado!', 'OK', { duration: 3000 });
        this.closeForm();
        this.loadData();
      });
    } else {
      this.productService.create(data).subscribe(() => {
        this.snackBar.open('Produto criado!', 'OK', { duration: 3000 });
        this.closeForm();
        this.loadData();
      });
    }
  }

  deleteProduct(id: string): void {
    if (!confirm('Deseja excluir este produto?')) return;
    this.productService.delete(id).subscribe(() => {
      this.snackBar.open('Produto excluído!', 'OK', { duration: 3000 });
      this.loadData();
    });
  }
}