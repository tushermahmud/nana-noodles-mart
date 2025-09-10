'use client';
import { Button } from '../ui/button';
import { Eye, Edit, Trash2 } from 'lucide-react';
import { Product } from '@/types/products';
import { useState } from 'react';
import ProductForm from './ProductForm';

type ProductsSectionProps = {
  filteredProducts: Product[];
};

export const ProductsSection = ({ filteredProducts }: ProductsSectionProps) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  const handleSaveProduct = (productData: any) => {
    if (editingItem) {
      //setProducts(prev => prev.map(p => p.id === productData.id ? productData : p));
    } else {
      //setProducts(prev => [...prev, productData]);
    }
    setEditingItem(null);
  };
  const handleEditItem = (item: any) => {
    setEditingItem(item);
    setShowAddModal(true);
  };
  return (
    <>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-4 font-medium text-gray-900">Product</th>
              <th className="text-left py-3 px-4 font-medium text-gray-900">Category</th>
              <th className="text-left py-3 px-4 font-medium text-gray-900">Price</th>
              <th className="text-left py-3 px-4 font-medium text-gray-900">Stock</th>
              <th className="text-left py-3 px-4 font-medium text-gray-900">Status</th>
              <th className="text-left py-3 px-4 font-medium text-gray-900">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((product) => (
              <tr key={product?.id ?? ''} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="py-4 px-4">
                  <div className="flex items-center">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-12 h-12 rounded-lg object-cover mr-3"
                    />
                    <div>
                      <p className="font-medium text-gray-900">{product.name}</p>
                      <p className="text-sm text-gray-500 truncate max-w-xs">
                        {product.description}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                    {product?.category?.name ?? ''}
                  </span>
                </td>
                <td className="py-4 px-4">
                  <span className="font-medium text-gray-900">${product.price}</span>
                </td>
                <td className="py-4 px-4">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      product.stock > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
                  </span>
                </td>
                <td className="py-4 px-4">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      (product?.popular ?? false)
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {product.popular ? 'Popular' : 'Regular'}
                  </span>
                </td>
                <td className="py-4 px-4">
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleEditItem(product)}>
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showAddModal && (
        <ProductForm
          isOpen={showAddModal}
          onClose={() => {
            setShowAddModal(false);
            setEditingItem(null);
          }}
          product={editingItem}
          categories={[]}
          onSave={handleSaveProduct}
        />
      )}
    </>
  );
};
