# Virtual Store Components

This directory contains the refactored Virtual Store components, organized into a clean, modular structure for better maintainability and reusability.

## 📁 Directory Structure

```
virtual-store/
├── basket/                 # Basket-related components
│   ├── Basket.tsx         # Individual basket container
│   ├── BasketGrid.tsx     # Grid layout for baskets
│   └── ProductCard.tsx    # Individual product card
├── modal/                 # Modal components
│   └── ProductModal.tsx   # Product details modal
├── hooks/                 # Custom hooks
│   └── useVirtualStore.ts # Virtual store state management
├── types/                 # TypeScript type definitions
│   └── index.ts          # All type definitions
├── VirtualStore.tsx       # Main virtual store component
├── VirtualStoreHeader.tsx # Header component
├── CallToAction.tsx       # Call-to-action section
├── Shelf.tsx             # Individual shelf component
├── index.ts              # Barrel exports
└── README.md             # This file
```

## 🧩 Components

### Main Components

- **VirtualStore**: Main container component that orchestrates all other components
- **VirtualStoreHeader**: Reusable header with title and subtitle
- **CallToAction**: Reusable call-to-action section with customizable content
- **Shelf**: Individual shelf component that can be reused for different product categories

### Basket Components

- **Basket**: Individual basket container that holds up to 3 products
- **BasketGrid**: Grid layout that organizes baskets in a responsive grid
- **ProductCard**: Individual product card with hover effects and click handlers

### Modal Components

- **ProductModal**: Detailed product view modal with add-to-cart functionality

### Hooks

- **useVirtualStore**: Custom hook for managing virtual store state (modal, selected product)

## 🎯 Key Features

### ✅ Clean Architecture

- **Separation of Concerns**: Each component has a single responsibility
- **Reusability**: Components can be easily reused in different contexts
- **Type Safety**: Full TypeScript support with proper type definitions
- **Modularity**: Easy to maintain and extend

### ✅ Performance Optimized

- **Lazy Loading**: Components are loaded only when needed
- **Memoization**: Optimized re-renders with proper React patterns
- **Efficient State Management**: Custom hooks for state management

### ✅ Responsive Design

- **Mobile-First**: Responsive grid layouts
- **Flexible Components**: Adapt to different screen sizes
- **Touch-Friendly**: Optimized for mobile interactions

## 🚀 Usage

### Basic Usage

```tsx
import { VirtualStore } from "@/components/virtual-store";

// Use with default configuration
<VirtualStore />;
```

### Advanced Usage

```tsx
import { VirtualStore } from "@/components/virtual-store";

// Use with custom products and shelves
<VirtualStore products={customProducts} shelves={customShelves} />;
```

### Individual Components

```tsx
import {
  VirtualStoreHeader,
  CallToAction,
  BasketGrid,
  ProductModal,
} from "@/components/virtual-store";

// Use individual components
<VirtualStoreHeader title="Custom Title" subtitle="Custom subtitle" />;
```

## 🔧 Customization

### Customizing Products

```tsx
const customProducts = [
  {
    id: 1,
    name: "Custom Ramen",
    price: 15.99,
    // ... other product properties
  },
];

<VirtualStore products={customProducts} />;
```

### Customizing Shelves

```tsx
const customShelves: ShelfData[] = [
  {
    id: "custom",
    name: "Custom Category",
    description: "Custom description",
    icon: CustomIcon,
    color: "from-blue-500 to-purple-500",
    products: customProducts,
  },
];

<VirtualStore shelves={customShelves} />;
```

## 🎨 Styling

The components use Tailwind CSS classes and maintain consistency with the overall design system:

- **Colors**: Pink/orange gradient theme
- **Animations**: Framer Motion for smooth transitions
- **Responsive**: Mobile-first responsive design
- **Accessibility**: Proper ARIA labels and keyboard navigation

## 🔄 Migration from Old Component

The old `VirtualStore.tsx` component has been completely refactored. The new structure provides:

1. **Better Maintainability**: Smaller, focused components
2. **Improved Reusability**: Components can be used independently
3. **Enhanced Type Safety**: Full TypeScript support
4. **Better Performance**: Optimized rendering and state management
5. **Easier Testing**: Smaller components are easier to test

## 📝 Future Enhancements

- [ ] Add unit tests for all components
- [ ] Add Storybook stories for component documentation
- [ ] Add animation customization options
- [ ] Add accessibility improvements
- [ ] Add performance monitoring
