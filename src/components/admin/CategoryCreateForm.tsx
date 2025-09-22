'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ImageUploader } from '@/components/ui/image-uploader';
import { createCategory } from '@/actions/admin';
import { createCategorySchema } from '@/schemas/category.schema';
import { z } from 'zod';
import { toast } from 'sonner';
import { getErrorMessage } from '@/lib/errorUtils';

// Static color options for categories
export const CATEGORY_COLORS = [
  { label: 'Pink', bg: 'from-pink-500 to-pink-600', color: '#EC4899' },
  { label: 'Orange', bg: 'from-orange-500 to-orange-600', color: '#F97316' },
  { label: 'Red', bg: 'from-red-500 to-red-600', color: '#EF4444' },
  { label: 'Blue', bg: 'from-blue-500 to-blue-600', color: '#3B82F6' },
  { label: 'Green', bg: 'from-green-500 to-green-600', color: '#10B981' },
  { label: 'Purple', bg: 'from-purple-500 to-purple-600', color: '#8B5CF6' },
  { label: 'Yellow', bg: 'from-yellow-500 to-yellow-600', color: '#F59E0B' },
  { label: 'Indigo', bg: 'from-indigo-500 to-indigo-600', color: '#6366F1' },
];

// Static icon options for categories
const CATEGORY_ICONS = [
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

export const CategoryCreateForm = () => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    image: '',
    icon: 'Package',
    color: 'Pink',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: '',
      }));
    }
  };

  const validateForm = () => {
    try {
      const validationData = {
        name: formData.name,
        description: formData.description,
        image: formData.image,
        icon: formData.icon,
        color: formData.color,
      };

      createCategorySchema.parse(validationData);
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};
        error.issues.forEach((err) => {
          const field = err.path[0] as string;
          newErrors[field] = err.message;
        });
        setErrors(newErrors);
      }
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const validationData = {
        name: formData.name,
        description: formData.description,
        image: formData.image,
        icon: formData.icon,
        color: formData.color,
      };

      const validatedData = createCategorySchema.parse(validationData);
      const formDataToSend = new FormData();
      formDataToSend.append('name', validatedData.name);
      formDataToSend.append('description', validatedData.description);
      formDataToSend.append('icon', validatedData.icon);
      formDataToSend.append('color', validatedData.color);

      if (validatedData.image.startsWith('data:')) {
        const response = await fetch(validatedData.image);
        const blob = await response.blob();
        const file = new File([blob], 'category-image.jpg', { type: blob.type });
        formDataToSend.append('image', file);
      } else {
        formDataToSend.append('image', validatedData.image);
      }

      const result = await createCategory(formDataToSend);

      if (result?.isSuccess) {
        toast.success(result.message ?? 'Category created successfully');
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
    <div className="bg-white rounded-2xl shadow-lg border border-gray-200">
      <div className="p-8">
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

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category Name *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent ${
                  errors.name ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter category name"
              />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Icon *</label>
              <select
                value={formData.icon}
                onChange={(e) => handleInputChange('icon', e.target.value)}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent ${
                  errors.icon ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                {CATEGORY_ICONS.map((icon: string) => (
                  <option key={icon} value={icon}>
                    {icon}
                  </option>
                ))}
              </select>
              {errors.icon && <p className="text-red-500 text-sm mt-1">{errors.icon}</p>}
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Description *</label>
            <textarea
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              rows={4}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent ${
                errors.description ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter category description"
            />
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">{errors.description}</p>
            )}
          </div>

          {/* Color Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Color *</label>
            <div className="grid grid-cols-4 gap-3">
              {CATEGORY_COLORS.map((color) => (
                <button
                  key={color.label}
                  type="button"
                  onClick={() => handleInputChange('color', color.label)}
                  className={`p-3 rounded-lg border-2 transition-all ${
                    formData.color === color.label
                      ? 'border-gray-900 ring-2 ring-pink-500'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className={`w-full h-8 rounded bg-gradient-to-r ${color.bg}`}></div>
                  <p className="text-xs text-gray-600 mt-1">{color.label}</p>
                </button>
              ))}
            </div>
            {errors.color && <p className="text-red-500 text-sm mt-1">{errors.color}</p>}
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Category Image *</label>
            <ImageUploader
              value={formData.image}
              onChange={(url) => handleInputChange('image', url)}
              error={errors.image}
            />
          </div>

          {/* Form Actions */}
          <div className="flex justify-end space-x-4 pt-8 border-t border-gray-200">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
              className="px-8 py-3"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="px-8 py-3 bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600 text-white disabled:opacity-50"
            >
              {isSubmitting ? 'Creating...' : 'Create Category'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
