'use client';
import { Button } from '../ui/button';
import { Eye, Edit, Trash2 } from 'lucide-react';
import { Category, Product } from '@/types/products';
import { useState } from 'react';
import ProductForm from './ProductForm';
import AdminPagination from '@/components/common/AdminPagination';
import Image from 'next/image';
import { deleteProduct } from '@/actions/products';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { getErrorMessage } from '@/lib/errorUtils';

type ProductsSectionProps = {
  filteredProducts: Product[];
  count: number;
  categories: Category[];
};

export const ProductsSection = ({
  filteredProducts,
  count,
  categories,
}: ProductsSectionProps) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingItem, setEditingItem] = useState<Product | null>(null);
  const router = useRouter();
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);


  const handleSaveProduct = (productData: any) => {
    // TODO: trigger a revalidation/fetch from parent if needed
    setEditingItem(null);
    setShowAddModal(false);
  };

  const handleEditItem = (item: Product) => {
    setEditingItem(item);
    setShowAddModal(true);
  };

  const openDeleteConfirm = (id?: string) => {
    if (!id) return;
    setPendingDeleteId(id);
    setConfirmOpen(true);
  };

  const onConfirmDelete = async () => {
    try {
      if (!pendingDeleteId) return;
      const res = await deleteProduct(pendingDeleteId);
      setConfirmOpen(false);
      setPendingDeleteId(null);
      toast.success(res?.message ?? 'Product deleted successfully');
      if (res?.isSuccess) {
        router.refresh();
      }
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
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
              <th className="text-left py-3 px-4 font-medium text-gray-900">Original Price</th>
              <th className="text-left py-3 px-4 font-medium text-gray-900">Stock</th>
              <th className="text-left py-3 px-4 font-medium text-gray-900">Status</th>
              <th className="text-left py-3 px-4 font-medium text-gray-900">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((product: Product) => {
              const imgSrc = product.imageUrl || product.image || '/placeholder.png';
              return (
                <tr key={product?.id ?? ''} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-4 px-4">
                    <div className="flex items-center">
                      <Image
                        src={imgSrc}
                        alt={product?.name ?? ''}
                        className="w-20 h-20 rounded-lg object-cover mr-3"
                        width={100}
                        height={80}
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
                    <span className="font-medium text-gray-900">${product?.price ?? 0}</span>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <span className="font-medium text-gray-900">${product?.original_price ?? 0}</span>
                  </td>
                  <td className="py-4 px-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        (product?.quantity ?? 0) > 0
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {product?.quantity ?? 0 > 0 ? 'In Stock' : 'Out of Stock'}
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
                      <Button variant="outline" size="sm" onClick={() => handleEditItem(product)}>
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-red-600 hover:text-red-700"
                        onClick={() => openDeleteConfirm(product?.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <AdminPagination totalCount={count} defaultPageSize={5} />

      {showAddModal && (
        <ProductForm
          isOpen={showAddModal}
          onClose={() => {
            setShowAddModal(false);
            setEditingItem(null);
          }}
          product={editingItem ?? undefined}
          categories={categories}
          onSave={handleSaveProduct}
        />
      )}

      {confirmOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/50" onClick={() => setConfirmOpen(false)} />
          <div className="relative w-full max-w-sm rounded-lg bg-white p-6 shadow-xl">
            <h3 className="text-lg font-semibold text-gray-900">Delete product?</h3>
            <p className="mt-2 text-sm text-gray-600">This action cannot be undone.</p>
            <div className="mt-5 flex justify-end gap-3">
              <Button variant="outline" onClick={() => setConfirmOpen(false)}>
                Cancel
              </Button>
              <Button className="bg-red-600 text-white hover:bg-red-700" onClick={onConfirmDelete}>
                Delete
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
