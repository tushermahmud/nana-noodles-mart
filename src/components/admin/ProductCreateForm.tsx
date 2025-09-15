'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Plus, Trash2, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ImageUploader } from '@/components/ui/image-uploader';
import { createProduct } from '@/actions/products';
import { createProductSchema } from '@/schemas/product.schema';
import { z } from 'zod';
import { toast } from 'sonner';
import { getErrorMessage } from '@/lib/errorUtils';
import { Category } from '@/types/products';

interface ProductCreateFormProps {
  categories: Category[];
}

export const ProductCreateForm = ({ categories }: ProductCreateFormProps) => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    categoryId: '',
    description: '',
    price: '',
    original_price: '',
    image: '',
    quantity: '',
    spice_level: '',
    features: [''] as string[],
    popular: false,
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

  const handleFeatureChange = (index: number, value: string) => {
    const newFeatures = [...formData.features];
    newFeatures[index] = value;
    setFormData((prev) => ({
      ...prev,
      features: newFeatures,
    }));
  };

  const addFeature = () => {
    if (formData.features.filter((f) => f.trim() !== '').length >= 3) {
      setErrors((prev) => ({ ...prev, features: 'You can add at most 3 features' }));
      return;
    }
    setFormData((prev) => ({
      ...prev,
      features: [...prev.features, ''],
    }));
  };

  const removeFeature = (index: number) => {
    if (formData.features.length > 1) {
      const newFeatures = formData.features.filter((_, i) => i !== index);
      setFormData((prev) => ({
        ...prev,
        features: newFeatures,
      }));
    }
  };

  const validateForm = () => {
    try {
      const validationData = {
        name: formData.name,
        categoryId: formData.categoryId,
        description: formData.description,
        price: parseFloat(formData.price) || 0,
        image: formData.image,
        quantity: parseInt(formData.quantity) || 0,
        spice_level: formData.spice_level,
        features: formData.features.filter((f) => f.trim() !== ''),
        popular: formData.popular,
        original_price: parseFloat(formData.original_price) || 0
      };

      createProductSchema.parse(validationData);
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
        categoryId: formData.categoryId,
        description: formData.description,
        price: parseFloat(formData.price),
        image: formData.image,
        quantity: parseInt(formData.quantity),
        spice_level: formData.spice_level,
        features: formData.features.filter((f) => f.trim() !== ''),
        popular: formData.popular,
        original_price: parseFloat(formData.original_price ?? '0') || 0
      };

      const validatedData = createProductSchema.parse(validationData);
      const productData = new FormData();
      productData.append('name', validatedData.name);
      productData.append('categoryId', validatedData.categoryId);
      productData.append('description', validatedData.description);
      productData.append('price', validatedData.price.toString());
      productData.append('original_price', validatedData.original_price?.toString() ?? '0');
      productData.append('quantity', validatedData.quantity.toString());
      productData.append('spice_level', validatedData.spice_level.toString());
      if (validatedData.features && validatedData.features.length > 0) {
        const featuresString = validatedData.features.join(',');
        productData.append('features', featuresString);
      }
      productData.append('popular', validatedData.popular.toString());

      if (validatedData.image.startsWith('data:')) {
        const response = await fetch(validatedData.image);
        const blob = await response.blob();
        const file = new File([blob], 'product-image.jpg', { type: blob.type });
        productData.append('image', file);
      } else {
        productData.append('image', validatedData.image);
      }

      const result = await createProduct(productData);

      if (result?.isSuccess) {
        toast.success(result?.message ?? 'Product created successfully');
        router.push('/admin/products');
        router.refresh();
      } else {
        toast.error(result?.message ?? 'Failed to create product');
      }
    } catch (error) {
      console.error(error);
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
            <h2 className="text-2xl font-bold text-gray-900">Add New Product</h2>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Product Name *</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent ${
                  errors.name ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter product name"
              />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category (optional)
              </label>
              <select
                value={formData.categoryId}
                onChange={(e) => handleInputChange('categoryId', e.target.value)}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent ${
                  errors.categoryId ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <option value="">All products (default)</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
              {errors.categoryId && <p className="text-red-500 text-sm mt-1">{errors.categoryId}</p>}
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
              placeholder="Enter product description"
            />
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">{errors.description}</p>
            )}
          </div>

          {/* Pricing and Quantity */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Price *</label>
              <input
                type="number"
                step="0.01"
                value={formData.price}
                onChange={(e) => handleInputChange('price', e.target.value)}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent ${
                  errors.price ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="0.00"
              />
              {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Original Price (optional)</label>
              <input
                type="number"
                step="0.01"
                value={formData.original_price}
                onChange={(e) => handleInputChange('original_price', e.target.value)}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent ${
                  errors.original_price ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="0.00"
              />
              {errors.original_price && (
                <p className="text-red-500 text-sm mt-1">{errors.original_price}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Quantity *</label>
              <input
                type="number"
                value={formData.quantity}
                onChange={(e) => handleInputChange('quantity', e.target.value)}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent ${
                  errors.quantity ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="0"
              />
              {errors.quantity && <p className="text-red-500 text-sm mt-1">{errors.quantity}</p>}
            </div>
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Product Image *</label>
            <ImageUploader
              value={formData.image}
              onChange={(url) => handleInputChange('image', url)}
              error={errors.image}
            />
          </div>

          {/* Product Settings */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Spice Level *</label>
              <select
                value={formData.spice_level}
                onChange={(e) => handleInputChange('spice_level', Number(e.target.value))}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent ${
                  errors.spice_level ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <option value={1}>1 - Mild</option>
                <option value={2}>2 - Medium</option>
                <option value={3}>3 - Spicy</option>
                <option value={4}>4 - Very Spicy</option>
                <option value={5}>5 - Extra Hot</option>
              </select>
              {errors.spice_level && (
                <p className="text-red-500 text-sm mt-1">{errors.spice_level}</p>
              )}
            </div>

            <div className="flex items-center space-x-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.popular}
                  onChange={(e) => handleInputChange('popular', e.target.checked)}
                  className="w-4 h-4 text-pink-600 border-gray-300 rounded focus:ring-pink-500"
                />
                <span className="ml-2 text-sm font-medium text-gray-700">Popular</span>
              </label>
            </div>
          </div>

          {/* Features */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Features</label>
            <div className="space-y-3">
              {formData.features.map((feature, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <input
                    type="text"
                    value={feature}
                    onChange={(e) => handleFeatureChange(index, e.target.value)}
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    placeholder="Enter feature"
                  />
                  {formData.features.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeFeature(index)}
                      className="p-3 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={addFeature}
                className="flex items-center text-pink-600 hover:text-pink-700 text-sm font-medium"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Feature
              </button>
              {errors.features && <p className="text-red-500 text-sm mt-1">{errors.features}</p>}
            </div>
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
              {isSubmitting ? 'Creating...' : 'Create Product'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
