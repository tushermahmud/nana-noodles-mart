'use client';

import { useRouter } from 'next/navigation';
import CategoryForm from '@/components/admin/CategoryForm';
import { Button } from '@/components/ui/button';
import { CreateCategoryInput, createCategorySchema } from '@/schemas/category.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { ImageUploader } from '@/components/ui/image-uploader';
import { CATEGORY_COLORS } from '@/data/categoryColors';
import { ArrowLeft } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { getErrorMessage } from '@/lib/errorUtils';
import { createCategory } from '@/actions/admin';

export default function CreateCategoryPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm({
    resolver: zodResolver(createCategorySchema),
    defaultValues: {
      name: '',
      description: '',
      image: '',
      icon: 'Package',
      color: CATEGORY_COLORS[0]?.label,
    },
  });
  const selectedColor =
    CATEGORY_COLORS.find((c) => c.label === form.watch('color')) || CATEGORY_COLORS[0];

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
  const onSubmit = async (data: CreateCategoryInput) => {
    setIsSubmitting(true);
    try {
      const values = form.getValues();
      const formData = new FormData();
      formData.append('name', values.name);
      formData.append('description', values.description);
      formData.append('icon', values.icon);
      formData.append('color', values.color);

      if (values.image?.startsWith('data:')) {
        const response = await fetch(values.image);
        const blob = await response.blob();
        const file = new File([blob], 'category-image.jpg', { type: blob.type });
        formData.append('image', file);
      } else if (values.image) {
        formData.append('image', values.image);
      }

      const result = await createCategory(formData);

      if (result?.success) {
        toast.success(result?.message ?? 'Category created successfully');
        router.push('/admin/categories');
        router.refresh();
      } else {
        toast.error(result?.message ?? 'Failed to create category');
      }
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Create Category</h1>
          <p className="text-sm text-gray-600">Add a new category to organize your products</p>
        </div>

        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => router.back()}
                className="flex items-center space-x-2"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </Button>
              <h2 className="text-2xl font-bold text-gray-900">Add New Category</h2>
            </div>
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
                  <p className="text-red-500 text-sm mt-1">
                    {form.formState.errors.name.message as string}
                  </p>
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
                <p className="text-red-500 text-sm mt-1">
                  {form.formState.errors.description.message as string}
                </p>
              )}
            </div>

            {/* Image Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category Image *
              </label>
              <ImageUploader
                value={form.watch('image')}
                onChange={(url) => form.setValue('image', url)}
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
                    <div
                      className={`w-full h-8 rounded bg-gradient-to-r ${colorOption.gradient} mb-2`}
                    ></div>
                    <p className="text-xs text-gray-600 text-center">{colorOption.label}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Preview Card (uses derived bg/border) */}
            <div
              className={`rounded-lg p-4 border ${selectedColor.border} bg-gradient-to-r ${selectedColor.bg}`}
            >
              <p className="text-sm text-gray-700">Preview with selected background and border</p>
            </div>

            {/* Form Actions */}
            <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-2 bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600 text-white disabled:opacity-50"
              >
                {isSubmitting ? 'Creating...' : 'Add Category'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
