import { Component, OnInit, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatChipsModule } from '@angular/material/chips';
import { CategoryService } from '../../core/services/category.service';
import { ProductService } from '../../core/services/product.service';
import { Category } from '../../core/models/category.model';
import { Product } from '../../core/models/product.model';

@Component({
  selector: 'app-categories',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule, ReactiveFormsModule, MatCardModule, MatTableModule,
    MatButtonModule, MatIconModule, MatFormFieldModule, MatInputModule,
    MatSnackBarModule, MatExpansionModule, MatChipsModule
  ],
  template: `
    <div>
      <div class="page-header">
        <h2 class="page-title">Categorias</h2>
        <button mat-raised-button color="primary" (click)="openForm()">
          <mat-icon>add</mat-icon> Nova Categoria
        </button>
      </div>

      <mat-card *ngIf="showForm" class="form-card">
        <mat-card-header>
          <mat-card-title>{{ editingId ? 'Editar Categoria' : 'Nova Categoria' }}</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <form [formGroup]="form" (ngSubmit)="onSubmit()" class="form-grid">
            <mat-form-field appearance="outline">
              <mat-label>Nome</mat-label>
              <input matInput formControlName="name">
            </mat-form-field>
            <mat-form-field appearance="outline">
              <mat-label>Descrição</mat-label>
              <input matInput formControlName="description">
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

      <mat-accordion class="categories-accordion">
        <mat-expansion-panel
          *ngFor="let category of categories"
          (opened)="loadProducts(category.id)"
          class="category-panel">

          <mat-expansion-panel-header>
            <mat-panel-title class="panel-title">
              <mat-icon class="category-icon">category</mat-icon>
              {{ category.name }}
            </mat-panel-title>
            <mat-panel-description>
              {{ category.description || 'Sem descrição' }}
            </mat-panel-description>
          </mat-expansion-panel-header>

          <div class="panel-content">
            <div class="panel-actions">
              <button mat-stroked-button color="primary" (click)="editCategory(category); $event.stopPropagation()">
                <mat-icon>edit</mat-icon> Editar
              </button>
              <button mat-stroked-button color="warn" (click)="deleteCategory(category.id); $event.stopPropagation()">
                <mat-icon>delete</mat-icon> Excluir
              </button>
            </div>

            <h4 class="products-title">Produtos desta categoria</h4>

            <div *ngIf="!productsByCategory[category.id]" class="loading">
              Carregando produtos...
            </div>

            <div *ngIf="productsByCategory[category.id]?.length === 0" class="empty">
              Nenhum produto nesta categoria.
            </div>

            <table mat-table [dataSource]="getProducts(category.id)"
                *ngIf="hasProducts(category.id)" class="products-table">

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
    .form-actions { grid-column: 1 / -1; display: flex; justify-content: flex-end; gap: 8px; }
    .categories-accordion { display: flex; flex-direction: column; gap: 8px; }
    .category-panel { border-radius: 8px !important; }
    .panel-title { display: flex; align-items: center; gap: 8px; font-weight: 500; color: #1B2A4A; }
    .category-icon { color: #1E5FA8; font-size: 20px; width: 20px; height: 20px; }
    .panel-content { padding-top: 8px; }
    .panel-actions { display: flex; gap: 8px; margin-bottom: 16px; }
    .products-title { color: #1B2A4A; margin: 0 0 12px; font-size: 14px; font-weight: 500; }
    .products-table { width: 100%; }
    .loading, .empty { color: #666; font-size: 14px; padding: 16px 0; }
  `]
})
export class CategoriesComponent implements OnInit {
  categories: Category[] = [];
  productsByCategory: { [key: string]: Product[] } = {};
  showForm = false;
  editingId: string | null = null;
  form: FormGroup;

  constructor(
    private categoryService: CategoryService,
    private productService: ProductService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private cdr: ChangeDetectorRef
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      description: ['']
    });
  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.categoryService.getAll().subscribe(data => {
      this.categories = data;
      this.cdr.detectChanges();
    });
  }

  loadProducts(categoryId: string): void {
    if (this.productsByCategory[categoryId] !== undefined) return;

    this.productService.getAll().subscribe(data => {
      this.productsByCategory[categoryId] = data.filter(p => p.categoryId === categoryId);
      this.cdr.detectChanges();
    });
  }
  
  getProducts(categoryId: string): Product[] {
    return this.productsByCategory[categoryId] ?? [];
  }

  hasProducts(categoryId: string): boolean {
    return (this.productsByCategory[categoryId]?.length ?? 0) > 0;
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

  editCategory(category: Category): void {
    this.showForm = true;
    this.editingId = category.id;
    this.form.patchValue(category);
    this.cdr.detectChanges();
  }

  onSubmit(): void {
    if (this.form.invalid) return;
    const data = this.form.value;

    if (this.editingId) {
      this.categoryService.update(this.editingId, data).subscribe(() => {
        this.snackBar.open('Categoria atualizada!', 'OK', { duration: 3000 });
        this.closeForm();
        this.loadData();
      });
    } else {
      this.categoryService.create(data).subscribe(() => {
        this.snackBar.open('Categoria criada!', 'OK', { duration: 3000 });
        this.closeForm();
        this.loadData();
      });
    }
  }

  deleteCategory(id: string): void {
    if (!confirm('Deseja excluir esta categoria?')) return;
    this.categoryService.delete(id).subscribe(() => {
      this.snackBar.open('Categoria excluída!', 'OK', { duration: 3000 });
      this.loadData();
    });
  }
}