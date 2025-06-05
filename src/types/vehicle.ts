
export interface Vehicle {
  id: string;
  brand: string;
  model: string;
  year: number;
  plate: string;
  color: string;
  mileage: number;
  fuelType: 'gasoline' | 'ethanol' | 'flex' | 'diesel' | 'electric' | 'hybrid';
  lastMaintenance?: string;
  nextMaintenance?: string;
  documents: {
    registration: boolean;
    insurance: boolean;
    inspection: boolean;
  };
  status: 'active' | 'maintenance' | 'inactive';
  imageUrl?: string;
  createdAt: string;
}
