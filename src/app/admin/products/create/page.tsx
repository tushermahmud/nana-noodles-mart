export const dynamic = 'force-dynamic';
import { ProductCreateForm } from '@/components/admin/ProductCreateForm';
import { getAdminByCategories } from '@/fetchers/admin';

export default async function CreateProductPage() {
  const categoriesRes = await getAdminByCategories();
  const categories = categoriesRes?.data ?? [];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Create New Product</h1>
          <p className="text-gray-600 mt-2">Add a new product to your inventory</p>
        </div>

        <ProductCreateForm categories={categories} />
      </div>
    </div>
  );
}
