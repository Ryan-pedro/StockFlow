import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { Supplier } from '../models/supplier.model';

@Injectable({ providedIn: 'root' })
export class SupplierService {
  private path = '/suppliers';

  constructor(private api: ApiService) {}

  getAll(): Observable<Supplier[]> {
    return this.api.get<Supplier[]>(this.path);
  }

  create(supplier: Partial<Supplier>): Observable<Supplier> {
    return this.api.post<Supplier>(this.path, supplier);
  }

  update(id: string, supplier: Partial<Supplier>): Observable<Supplier> {
    return this.api.put<Supplier>(`${this.path}/${id}`, supplier);
  }

  delete(id: string): Observable<void> {
    return this.api.delete<void>(`${this.path}/${id}`);
  }
}