import { getAdminCategories } from '@/fetchers/admin';
import CategoriesClient from '@/components/admin/CategoriesClient';
import { Category } from '@/types/products';

export default async function CategoriesPage() {
  const categoriesRes = await getAdminCategories();
  const categories = categoriesRes?.data ?? [];
  console.log(categories);

  return <CategoriesClient categories={categories as Category[]} />;
}
