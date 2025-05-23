export interface Product {
    id: string;
    name: string;
    price: number;
    category: string;
    description?: string;
    imageUrl: string;
    inStock: boolean;
  }