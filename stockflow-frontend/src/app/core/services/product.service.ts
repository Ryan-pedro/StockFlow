import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { Product } from '../models/product.model';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private path = '/products';

  constructor(private api: ApiService) {}

  getAll(): Observable<Product[]> {
    return this.api.get<Product[]>(this.path);
  }

  getById(id: string): Observable<Product> {
    return this.api.get<Product>(`${this.path}/${id}`);
  }

  create(product: Partial<Product>): Observable<Product> {
    return this.api.post<Product>(this.path, product);
  }

  update(id: string, product: Partial<Product>): Observable<Product> {
    return this.api.put<Product>(`${this.path}/${id}`, product);
  }

  delete(id: string): Observable<void> {
    return this.api.delete<void>(`${this.path}/${id}`);
  }
}