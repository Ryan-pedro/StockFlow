export interface Movement {
  id: string;
  type: 'Entry' | 'Exit';
  quantity: number;
  unitPrice: number;
  totalValue: number;
  notes?: string;
  movementDate: Date;
  productId: string;
  productName: string;
  productCode: string;
  userId: string;
  userName: string;
}