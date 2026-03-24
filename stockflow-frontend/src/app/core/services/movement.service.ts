import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { Movement } from '../models/movement.model';

@Injectable({ providedIn: 'root' })
export class MovementService {
  private path = '/movements';

  constructor(private api: ApiService) {}

  getAll(productId?: string): Observable<Movement[]> {
    const query = productId ? `?productId=${productId}` : '';
    return this.api.get<Movement[]>(`${this.path}${query}`);
  }

  register(movement: Partial<Movement>): Observable<Movement> {
    return this.api.post<Movement>(this.path, movement);
  }
}