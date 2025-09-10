'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Plus, Trash2, Palette } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CategoryFormProps {
  isOpen: boolean;
  onClose: () => void;
  category?: any;
  onSave: (category: any) => void;
}

const CategoryForm = ({ isOpen, onClose, category, onSave }: CategoryFormProps) => {
  const [formData, setFormData] = useState({
    id: category?.id || Date.now(),
    name: category?.name || '',
    image: category?.image || '',
    count: category?.count || 0,
    icon: category?.icon || 'Package',
    color: category?.color || 'from-pink-500 to-orange-500',
    bgColor: category?.bgColor || 'from-pink-100 to-orange-100',
    borderColor: category?.borderColor || 'border-pink-200',
    popular: category?.popular || false,
    features: category?.features || [''],
  });

  const [errors, setErrors] = useState<any>({});

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

  const colorOptions = [
    {
      value: 'from-pink-500 to-orange-500',
      label: 'Pink to Orange',
      bg: 'from-pink-100 to-orange-100',
      border: 'border-pink-200',
    },
    {
      value: 'from-red-500 to-orange-500',
      label: 'Red to Orange',
      bg: 'from-red-100 to-orange-100',
      border: 'border-red-200',
    },
    {
      value: 'from-green-500 to-emerald-500',
      label: 'Green to Emerald',
      bg: 'from-green-100 to-emerald-100',
      border: 'border-green-200',
    },
    {
      value: 'from-blue-500 to-cyan-500',
      label: 'Blue to Cyan',
      bg: 'from-blue-100 to-cyan-100',
      border: 'border-blue-200',
    },
    {
      value: 'from-purple-500 to-pink-500',
      label: 'Purple to Pink',
      bg: 'from-purple-100 to-pink-100',
      border: 'border-purple-200',
    },
    {
      value: 'from-yellow-500 to-orange-500',
      label: 'Yellow to Orange',
      bg: 'from-yellow-100 to-orange-100',
      border: 'border-yellow-200',
    },
    {
      value: 'from-indigo-500 to-purple-500',
      label: 'Indigo to Purple',
      bg: 'from-indigo-100 to-purple-100',
      border: 'border-indigo-200',
    },
    {
      value: 'from-teal-500 to-green-500',
      label: 'Teal to Green',
      bg: 'from-teal-100 to-green-100',
      border: 'border-teal-200',
    },
  ];

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: '',
      }));
    }
  };

  const handleColorChange = (colorOption: any) => {
    setFormData((prev) => ({
      ...prev,
      color: colorOption.value,
      bgColor: colorOption.bg,
      borderColor: colorOption.border,
    }));
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
    const newErrors: any = {};

    if (!formData.name.trim()) newErrors.name = 'Category name is required';
    if (!formData.image.trim()) newErrors.image = 'Image URL is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      const categoryData = {
        ...formData,
        features: formData.features.filter((f) => f.trim() !== ''),
      };

      onSave(categoryData);
      onClose();
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
              {category ? 'Edit Category' : 'Add New Category'}
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
                  Category Name *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent ${
                    errors.name ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter category name"
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Product Count
                </label>
                <input
                  type="number"
                  value={formData.count}
                  onChange={(e) => handleInputChange('count', parseInt(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  placeholder="0"
                />
              </div>
            </div>

            {/* Image URL */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Image URL *</label>
              <input
                type="url"
                value={formData.image}
                onChange={(e) => handleInputChange('image', e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent ${
                  errors.image ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="https://example.com/image.jpg"
              />
              {errors.image && <p className="text-red-500 text-sm mt-1">{errors.image}</p>}
            </div>

            {/* Icon Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Icon</label>
              <select
                value={formData.icon}
                onChange={(e) => handleInputChange('icon', e.target.value)}
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
                {colorOptions.map((colorOption) => (
                  <button
                    key={colorOption.value}
                    type="button"
                    onClick={() => handleColorChange(colorOption)}
                    className={`p-3 rounded-lg border-2 transition-all ${
                      formData.color === colorOption.value
                        ? 'border-gray-900 ring-2 ring-pink-500'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div
                      className={`w-full h-8 rounded bg-gradient-to-r ${colorOption.value} mb-2`}
                    ></div>
                    <p className="text-xs text-gray-600 text-center">{colorOption.label}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Popular Toggle */}
            <div className="flex items-center space-x-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.popular}
                  onChange={(e) => handleInputChange('popular', e.target.checked)}
                  className="w-4 h-4 text-pink-600 border-gray-300 rounded focus:ring-pink-500"
                />
                <span className="ml-2 text-sm font-medium text-gray-700">Popular Category</span>
              </label>
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

            {/* Preview */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Preview</label>
              <div className="bg-white border border-gray-200 rounded-xl p-4">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-lg bg-gradient-to-r ${formData.color}`}>
                    <div className="w-6 h-6 bg-white rounded"></div>
                  </div>
                  <div className="flex space-x-2">
                    <button type="button" className="p-1 text-gray-400">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                        <path
                          fillRule="evenodd"
                          d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                    <button type="button" className="p-1 text-gray-400">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"
                          clipRule="evenodd"
                        />
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {formData.name || 'Category Name'}
                </h3>
                <p className="text-sm text-gray-600 mb-4">{formData.count} products</p>
                <div className="flex flex-wrap gap-2">
                  {formData.features
                    .filter((f) => f.trim() !== '')
                    .map((feature, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                      >
                        {feature}
                      </span>
                    ))}
                </div>
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
                {category ? 'Update Category' : 'Add Category'}
              </Button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default CategoryForm;
