import CategoryDetailsClient from '@/components/categories/CategoryDetailsClient';
import categoriesData from '@/data/categories.json';
import productsData from '@/data/products.json';

type CategoryPageProps = {
  params: { id: string };
};

export default async function CategoryPage({ params }: CategoryPageProps) {
  const categoryId = parseInt(params.id);
  const category = categoriesData.find((c) => c.id === categoryId) || null;
  if (!category) {
    return (
      <div className="min-h-screen bg-white">
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex items-center justify-center pt-32">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Category not found</h2>
            <a
              href="/products"
              className="bg-pink-600 hover:bg-pink-700 text-white px-6 py-3 rounded-lg"
            >
              Back to Products
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <CategoryDetailsClient category={category} products={productsData as any[]} />
    </div>
  );
}
