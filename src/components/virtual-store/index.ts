// Main components
export { default as VirtualStore } from './VirtualStore';
export { default as VirtualStoreHeader } from './VirtualStoreHeader';
export { default as CallToAction } from './CallToAction';
export { default as Shelf } from './Shelf';

// Basket components
export { default as Basket } from './basket/Basket';
export { default as BasketGrid } from './basket/BasketGrid';
export { default as ProductCard } from './basket/ProductCard';

// Modal components
export { default as ProductModal } from './modal/ProductModal';

// Hooks
export { useVirtualStore } from './hooks/useVirtualStore';

// Types
export type { Product, ShelfData, BasketProduct, VirtualStoreProps } from '@/types/products';
