'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { updateProductSchema } from '@/schemas/product.schema';
import { z } from 'zod';
import { Category, Product } from '@/types/products';
import { ImageUploader } from '@/components/ui/image-uploader';
import { BASE_URL } from '@/config/env';
import { updateProduct } from '@/actions/products';
import { toast } from 'sonner';
import { getErrorMessage } from '@/lib/errorUtils';
interface ProductFormProps {
  isOpen: boolean;
  onClose: () => void;
  product?: Product;
  categories: Category[];
  onSave: (product: Product) => void;
}

const ProductForm = ({ isOpen, onClose, product, categories, onSave }: ProductFormProps) => {
  const rawImage = (product?.imageUrl ?? product?.image ?? '') as string;
  const normalizedImage =
    rawImage && !/^https?:|^data:/.test(rawImage)
      ? `${BASE_URL.replace('/api', '')}/public/storage/${rawImage}`
      : rawImage;

  const [formData, setFormData] = useState({
    id: product?.id || Date.now(),
    name: product?.name || '',
    description: product?.description || '',
    price: product?.price || '',
    image: normalizedImage,
    categoryId: product?.categoryId || '',
    imageUrl: product?.imageUrl || '',
    popular: product?.popular || false,
    spice_level: product?.spice_level || 1,
    features: Array.isArray(product?.features)
      ? product.features
      : typeof product?.features === 'string'
        ? product.features
            .split(/[\,\n]/)
            .map((s: string) => s.trim())
            .filter(Boolean)
        : [''],
    original_price: product?.original_price || '',
    quantity: product?.quantity || '',
  });

  const [errors, setErrors] = useState<any>({});

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev: any) => ({
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
      const dataForValidation = {
        id: String(formData.id),
        name: formData.name,
          categoryId:
            formData.categoryId && formData.categoryId !== 'undefined'
              ? formData.categoryId
              : undefined,
        description: formData.description,
        price: Number(formData.price),
        image: formData.image,
        quantity: (formData.quantity) ? Number(formData.quantity) : 0,
        spice_level: Number(formData.spice_level ?? '1'),
        features: (formData.features || []).filter((f: string) => f.trim() !== ''),
        popular: !!formData.popular,
        original_price:
          formData.original_price === 0 || formData.original_price === 0.00
            ? undefined
            : Number(formData.original_price),

        // Optional fields omitted if not needed by backend
      } as any;
      updateProductSchema.parse(dataForValidation);
      setErrors({});
      return { ok: true, data: dataForValidation } as const;
    } catch (e) {
      if (e instanceof z.ZodError) {
        const fieldErrors: Record<string, string> = {};
        e.issues.forEach((issue) => {
          const key = String(issue.path[0] ?? 'form');
          fieldErrors[key] = issue.message;
        });
        setErrors(fieldErrors);
      }
      return { ok: false } as const;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = validateForm();
    if (!result.ok) return;
    // Build FormData to mirror Postman request
    const fd = new FormData();
    fd.append('name', result.data.name);
    if (result.data.categoryId && result.data.categoryId !== 'undefined') {
      fd.append('categoryId', result.data.categoryId);
    }
    fd.append('description', result.data.description);
    fd.append('price', String(result.data.price));
    if (result.data.quantity !== undefined) {
      fd.append('quantity', String(result.data.quantity));
    }
    if (result.data.original_price !== undefined) {
      fd.append('original_price', String(result.data.original_price));
    }
    if ((formData as any).quantity !== undefined) {
      fd.append('quantity', String(result.data.quantity));
    }
    if (result.data.original_price !== undefined) {
      fd.append('original_price', String(result.data.original_price));
    }
    fd.append('spice_level', String(result.data.spice_level));
    if (result.data.features && (result.data.features as string[]).length > 0) {
      fd.append('features', (result.data.features as string[]).join(','));
    }
    fd.append('popular', String(result.data.popular));

    // Image: only append if user changed it to a data URL; otherwise skip to preserve existing server value
    const imageToSend = formData.imageUrl || formData.image;
    if (imageToSend && imageToSend.startsWith('data:')) {
      const blob = await fetch(imageToSend).then((r) => r.blob());
      const file = new File([blob], 'product-image.jpg', { type: blob.type });
      fd.append('image', file);
    }
    try {
      const res = await updateProduct(String(formData.id), fd);
      if (res?.isSuccess) {
        onSave({ ...formData, ...result.data } as unknown as Product);
        toast.success(res?.message ?? 'Product updated successfully');
        onClose();
      } else {
        setErrors((prev: any) => ({ ...prev, form: res?.message || 'Failed to update product' }));
        toast.error(res?.message ?? 'Failed to update product');
      }
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
      >
        <div className="p-6">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              {product ? 'Edit Product' : 'Add New Product'}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 text-2xl font-bold"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Product Name *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent ${
                    errors.name ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter product name"
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category *</label>
                <select
                  value={formData.categoryId && formData.categoryId !== 'undefined' ? formData.categoryId : 'undefined'}
                  onChange={(e) =>
                    handleInputChange(
                      'categoryId',
                      e.target.value === 'undefined' ? '' : e.target.value
                    )
                  }
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent ${
                    errors.categoryId ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value={'undefined'}>All products (default)</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
                {errors.categoryId && (
                  <p className="text-red-500 text-sm mt-1">{errors.categoryId}</p>
                )}
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Description *</label>
              <textarea
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                rows={3}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent ${
                  errors.description ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter product description"
              />
              {errors.description && (
                <p className="text-red-500 text-sm mt-1">{errors.description}</p>
              )}
            </div>

            {/* Pricing */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Price *</label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.price}
                  onChange={(e) => handleInputChange('price', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent ${
                    errors.price ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="0.00"
                />
                {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Original Price (Optional)
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.original_price ?? 0.00}
                  onChange={(e) => handleInputChange('original_price', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  placeholder="0.00"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Quantity *</label>
              <input
                type="number"
                value={formData.quantity ?? 0}
                onChange={(e) => handleInputChange('quantity', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                placeholder="Enter quantity"
              />
            </div>

            {/* Image Uploader */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Product Image *
              </label>
              <ImageUploader
                value={formData.imageUrl ?? ''}
                onChange={(url) => handleInputChange('imageUrl', url)}
                error={errors.image}
              />
            </div>

            {/* Product Settings */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Spice Level</label>
                <select
                  value={formData.spice_level}
                  onChange={(e) => handleInputChange('spice_level', parseInt(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                >
                  <option value={1}>Mild (1)</option>
                  <option value={2}>Medium (2)</option>
                  <option value={3}>Spicy (3)</option>
                  <option value={4}>Hot (4)</option>
                  <option value={5}>Extra Hot (5)</option>
                </select>
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
              <div className="space-y-2">
                {formData.features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={feature}
                      onChange={(e) => handleFeatureChange(index, e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                      placeholder="Enter feature"
                    />
                    {formData.features.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeFeature(index)}
                        className="p-2 text-red-600 hover:text-red-700"
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
                  <Plus className="w-4 h-4 mr-1" />
                  Add Feature
                </button>
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
              <Button type="button" variant="outline" onClick={onClose} className="px-6 py-2">
                Cancel
              </Button>
              <Button
                type="submit"
                className="px-6 py-2 bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600 text-white"
              >
                {product ? 'Update Product' : 'Add Product'}
              </Button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default ProductForm;
