
export interface QuoteItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

export interface Quote {
  id: string;
  workshopName: string;
  workshopId: string;
  vehicleModel: string;
  vehiclePlate: string;
  serviceType: string;
  description: string;
  items: QuoteItem[];
  laborCost: number;
  totalParts: number;
  totalLabor: number;
  totalAmount: number;
  estimatedDuration: string;
  createdAt: string;
  expiresAt: string;
  status: 'pending' | 'approved' | 'rejected' | 'expired';
  notes?: string;
}
