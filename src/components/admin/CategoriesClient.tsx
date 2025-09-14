'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Edit,
  Trash2,
  Plus,
  Package,
  ChefHat,
  Flame,
  Leaf,
  Fish,
  Crown,
  Star,
  Heart,
  Zap,
  Shield,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import CategoryForm from '@/components/admin/CategoryForm';
import Link from 'next/link';
import { Category } from '@/types/products';
import { CATEGORY_COLORS } from '@/data/categoryColors';
import { deleteCategory } from '@/actions/admin';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { getErrorMessage } from '@/lib/errorUtils';

type CategoriesClientProps = {
  categories: Category[];
};

const CategoriesClient = ({ categories }: CategoriesClientProps) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);
  const router = useRouter();

  const iconMap = {
    Package,
    ChefHat,
    Flame,
    Leaf,
    Fish,
    Crown,
    Star,
    Heart,
    Zap,
    Shield,
  };

  const getIcon = (iconName?: string) => {
    const IconComponent = iconMap[iconName as keyof typeof iconMap] || Package;
    return IconComponent;
  };

  const getBgColor = (colorName?: string) => {
    const ColorComponent = CATEGORY_COLORS.find((c) => c.label === colorName);
    return ColorComponent?.bg || 'from-pink-500 to-orange-500';
  };


  const handleEditItem = (item: any) => {
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
      const res = await deleteCategory(pendingDeleteId);
      setConfirmOpen(false);
      setPendingDeleteId(null);
      toast.success((res as any)?.message ?? 'Category deleted successfully');
      if (res?.isSuccess) {
        router.refresh();
      }
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  return (
    <>
      {/* Actions */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Categories</h2>
          <p className="text-sm text-gray-600">Manage your product categories</p>
        </div>
        <div className="flex space-x-3">
          <Link href="/admin/categories/create">
            <Button
              size="sm"
              className="bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Category
            </Button>
          </Link>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category: Category) => (
          <motion.div
            key={category.id}
            whileHover={{ scale: 1.02 }}
            className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-lg bg-gradient-to-r ${getBgColor(category?.color)}`}>
                {(() => {
                  const IconComponent = getIcon(category.icon);
                  return <IconComponent className="w-6 h-6 text-white" />;
                })()}
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" onClick={() => handleEditItem(category)}>
                  <Edit className="w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-red-600 hover:text-red-700"
                  onClick={() => openDeleteConfirm(category?.id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{category.name}</h3>
            <p className="text-sm text-gray-600 mb-4">{category.description}</p>
            {category.features && category.features.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {category.features.map((feature: string, index: number) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                  >
                    {feature}
                  </span>
                ))}
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Edit Category Modal */}
      {showAddModal && (
        <CategoryForm
          isOpen={showAddModal}
          onClose={() => {
            setShowAddModal(false);
            setEditingItem(null);
          }}
          onSave={() => {}}
          category={editingItem as unknown as Category}
        />
      )}

      {confirmOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/50" onClick={() => setConfirmOpen(false)} />
          <div className="relative w-full max-w-sm rounded-lg bg-white p-6 shadow-xl">
            <h3 className="text-lg font-semibold text-gray-900">Delete category?</h3>
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

export default CategoriesClient;
