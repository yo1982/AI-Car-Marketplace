
export interface Car {
  id: number;
  make: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  fuelType: 'Gasoline' | 'Diesel' | 'Electric' | 'Hybrid';
  transmission: 'Automatic' | 'Manual';
  imageUrl: string;
  features: string[];
  type: 'SUV' | 'Sedan' | 'Truck' | 'Coupe' | 'Convertible' | 'Hatchback';
}

export interface FilterCriteria {
  make: string;
  model: string;
  minPrice: string;
  maxPrice: string;
  minYear: string;
}

export interface AiFilterCriteria {
  type?: string;
  make?: string;
  minPrice?: number;
  maxPrice?: number;
  minYear?: number;
  features?: string[];
}
