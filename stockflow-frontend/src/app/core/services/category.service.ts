import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { Category } from '../models/category.model';

@Injectable({ providedIn: 'root' })
export class CategoryService {
  private path = '/categories';

  constructor(private api: ApiService) {}

  getAll(): Observable<Category[]> {
    return this.api.get<Category[]>(this.path);
  }

  create(category: Partial<Category>): Observable<Category> {
    return this.api.post<Category>(this.path, category);
  }

  update(id: string, category: Partial<Category>): Observable<Category> {
    return this.api.put<Category>(`${this.path}/${id}`, category);
  }

  delete(id: string): Observable<void> {
    return this.api.delete<void>(`${this.path}/${id}`);
  }
}