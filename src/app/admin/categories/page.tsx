"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Plus,
  Edit,
  Trash2,
  Package
} from "lucide-react";
import { Button } from "@/components/ui/button";
import CategoryForm from "@/components/admin/CategoryForm";
import categoriesData from "@/data/categories.json";

const CategoriesPage = () => {
  const [categories, setCategories] = useState(categoriesData);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  const handleSaveCategory = (categoryData: any) => {
    if (editingItem) {
      setCategories(prev => prev.map(c => c.id === categoryData.id ? categoryData : c));
    } else {
      setCategories(prev => [...prev, categoryData]);
    }
    setEditingItem(null);
  };

  const handleEditItem = (item: any) => {
    setEditingItem(item);
    setShowAddModal(true);
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
          <Button 
            size="sm" 
            className="bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600"
            onClick={() => setShowAddModal(true)}
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Category
          </Button>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <motion.div
            key={category.id}
            whileHover={{ scale: 1.02 }}
            className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-lg bg-gradient-to-r ${category.color}`}>
                <Package className="w-6 h-6 text-white" />
              </div>
              <div className="flex space-x-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleEditItem(category)}
                >
                  <Edit className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{category.name}</h3>
            <p className="text-sm text-gray-600 mb-4">{category.count} products</p>
            <div className="flex flex-wrap gap-2">
              {category.features.map((feature, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                >
                  {feature}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Category Form Modal */}
      {showAddModal && (
        <CategoryForm
          isOpen={showAddModal}
          onClose={() => {
            setShowAddModal(false);
            setEditingItem(null);
          }}
          category={editingItem}
          onSave={handleSaveCategory}
        />
      )}
    </>
  );
};

export default CategoriesPage;
