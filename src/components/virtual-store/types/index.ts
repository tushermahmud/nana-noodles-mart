import { Product } from "@/types/products";

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
