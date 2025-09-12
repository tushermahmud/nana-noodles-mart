'use client';

import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { X, Package, ChefHat, Flame, Leaf, Fish, Crown, Star, Heart, Zap, Shield } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { ImageUploader } from '@/components/ui/image-uploader';
import { updateCategorySchema } from '@/schemas/category.schema';
import { CATEGORY_COLORS } from '@/data/categoryColors';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { getErrorMessage } from '@/lib/errorUtils';
import { updateCategory } from '@/actions/admin';
import { Category } from '@/types/products';
import { BASE_URL } from '@/config/env';

interface CategoryFormProps {
  isOpen: boolean;
  onClose: () => void;
  category: Category; // Required for update
  onSave: (category: any) => void;
  inline?: boolean; // when true, render as inline section (no modal)
}

const CategoryForm = ({ isOpen, onClose, category, onSave, inline = false }: CategoryFormProps) => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const defaultColorLabel = useMemo(() => {
    if (category?.color) return category.color as string;
    return CATEGORY_COLORS[0]?.label || 'Pink to Orange';
  }, [category?.color]);

  const rawImage = (category?.imageUrl ?? category?.image ?? '') as string;
  const normalizedImage =
    rawImage && !/^https?:|^data:/.test(rawImage)
      ? `${BASE_URL.replace('/api', '')}/public/storage/${rawImage}`
      : rawImage;

  const [previewImage, setPreviewImage] = useState<string>(normalizedImage);

  const form = useForm({
    resolver: zodResolver(updateCategorySchema),
    defaultValues: {
      id: category?.id || '',
      name: category?.name || '',
      description: category?.description || '',
      image: normalizedImage,
      icon: (category?.icon as string) || 'Package',
      color: defaultColorLabel,
    },
  });

  const selectedColor = CATEGORY_COLORS.find((c) => c.label === form.watch('color')) || CATEGORY_COLORS[0];

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
  } as const;

  const getIcon = (iconName?: string) => {
    const IconComponent = iconMap[iconName as keyof typeof iconMap] || Package;
    return IconComponent;
  };

  const iconOptions = [
    'Package',
    'ChefHat',
    'Flame',
    'Leaf',
    'Fish',
    'Crown',
    'Star',
    'Heart',
    'Zap',
    'Shield',
  ];

  const onSubmit = async (_data: any) => {
    setIsSubmitting(true);
    try {
      const values = form.getValues();
      const formData = new FormData();
      formData.append('id', values.id || '');
      formData.append('name', values.name || '');
      formData.append('description', values.description || '');
      formData.append('icon', values.icon || '');
      formData.append('color', values.color || '');

      const imageToSend = previewImage || values.image;
      if (imageToSend && imageToSend.startsWith('data:')) {
        const blob = await fetch(imageToSend).then((r) => r.blob());
        const file = new File([blob], 'category-image.jpg', { type: blob.type });
        formData.append('image', file);
      }

      const result = await updateCategory(values.id || '', formData);

      if (result?.success) {
        toast.success(result?.message ?? 'Category updated successfully');
        onSave(result?.data ?? values);
        onClose();
      } else {
        toast.error(result?.message ?? 'Failed to update category');
      }
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setIsSubmitting(false);
    }
  };

  const content = (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">
          Edit Category
        </h2>
        {!inline && (
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-2xl font-bold">
            <X className="w-6 h-6" />
          </button>
        )}
      </div>

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Basic Information */}
        <div className="grid grid-cols-1 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category Name *
            </label>
            <input
              type="text"
              {...form.register('name')}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent ${
                form.formState.errors.name ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter category name"
            />
            {form.formState.errors.name && (
              <p className="text-red-500 text-sm mt-1">{form.formState.errors.name.message as string}</p>
            )}
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Description *</label>
          <textarea
            {...form.register('description')}
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent ${
              form.formState.errors.description ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Write a short description"
            rows={4}
          />
          {form.formState.errors.description && (
            <p className="text-red-500 text-sm mt-1">{form.formState.errors.description.message as string}</p>
          )}
        </div>

        {/* Image Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Category Image *</label>
          <ImageUploader
            value={previewImage}
            onChange={(url) => setPreviewImage(url)}
            error={(form.formState.errors.image?.message as string) || undefined}
          />
        </div>

        {/* Icon Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Icon</label>
          <select
            {...form.register('icon')}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
          >
            {iconOptions.map((icon) => (
              <option key={icon} value={icon}>
                {icon}
              </option>
            ))}
          </select>
        </div>

        {/* Color Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Color Theme</label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {CATEGORY_COLORS.map((colorOption) => (
              <button
                key={colorOption.label}
                type="button"
                onClick={() => form.setValue('color', colorOption.label)}
                className={`p-3 rounded-lg border-2 transition-all ${
                  form.watch('color') === colorOption.label
                    ? 'border-gray-900 ring-2 ring-pink-500'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className={`w-full h-8 rounded bg-gradient-to-r ${colorOption.gradient} mb-2`}></div>
                <p className="text-xs text-gray-600 text-center">{colorOption.label}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Preview Card (uses derived bg/border) */}
        <div className={`rounded-lg p-4 border ${selectedColor.border} bg-gradient-to-r ${selectedColor.bg}`}>
          <p className="text-sm text-gray-700">Preview with selected background and border</p>
        </div>

        {/* Form Actions */}
        <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
          <Button type="button" variant="outline" onClick={onClose} className="px-6 py-2">
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-2 bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600 text-white disabled:opacity-50"
          >
            {isSubmitting ? 'Updating...' : 'Update Category'}
          </Button>
        </div>
      </form>
    </div>
  );

  if (inline) {
    return (
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm">
        {content}
      </div>
    );
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
      >
        {content}
      </motion.div>
    </div>
  );
};

export default CategoryForm;
