import { Product } from "./products";

export interface CartItem {
  cart_id: string;  
  created_at: string;
  id: string;
  product_id: string;
  quantity: number;
  unit_price: string;
  updated_at: string;
  product: Product;
}

export interface Cart {
  cart: CartItem[];
}



