'use client';
import { Plus } from 'lucide-react';
import { Button } from '../ui/button';

export const ProductsActions = () => {
  return (
    <div className="flex space-x-3">
      <Button
        size="sm"
        className="bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600"
        onClick={() => {}}
      >
        <Plus className="w-4 h-4 mr-2" />
        Add Product
      </Button>
    </div>
  );
};
