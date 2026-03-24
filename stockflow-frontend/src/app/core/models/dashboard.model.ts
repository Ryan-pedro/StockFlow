export interface Dashboard {
  totalProducts: number;
  totalStockItems: number;
  lowStockCount: number;
  movementsToday: number;
  lowStockProducts: LowStockProduct[];
  recentMovements: RecentMovement[];
}

export interface LowStockProduct {
  id: string;
  name: string;
  code: string;
  stockQuantity: number;
  minimumStock: number;
  categoryName: string;
}

export interface RecentMovement {
  id: string;
  productName: string;
  type: string;
  quantity: number;
  totalValue: number;
  movementDate: Date;
  userName: string;
}