export interface Product {
  id: string;
  name: string;
  code: string;
  unitPrice: number;
  stockQuantity: number;
  minimumStock: number;
  description?: string;
  isActive: boolean;
  isLowStock: boolean;
  createdAt: Date;
  updatedAt?: Date;
  categoryId: string;
  categoryName: string;
  supplierId?: string;
  supplierName?: string;
}