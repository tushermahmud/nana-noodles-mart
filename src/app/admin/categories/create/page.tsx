import { CategoryCreateForm } from '@/components/admin/CategoryCreateForm';

export default function CreateCategoryPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Create New Category</h1>
          <p className="text-gray-600 mt-2">Add a new category to organize your products</p>
        </div>

        <CategoryCreateForm />
      </div>
    </div>
  );
}