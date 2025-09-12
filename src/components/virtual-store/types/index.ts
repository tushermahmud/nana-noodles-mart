export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  category_id: number;
  popular: boolean;
  inStock: boolean;
  spiceLevel: number;
  features: string[];
}

export interface ShelfData {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<any>;
  color: string;
  products: Product[];
}

export interface BasketProduct {
  product: Product;
  position: 'first' | 'second' | 'third';
}

export interface VirtualStoreProps {
  products?: Product[];
  shelves?: ShelfData[];
}
