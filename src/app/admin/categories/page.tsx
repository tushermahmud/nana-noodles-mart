export const dynamic = 'force-dynamic';
import { getAdminByCategories } from '@/fetchers/admin';
import CategoriesClient from '@/components/admin/CategoriesClient';
import { Category } from '@/types/products';

export default async function CategoriesPage() {
  const categoriesRes = await getAdminByCategories();
  const categories = categoriesRes?.data ?? [];

  return <CategoriesClient categories={categories as Category[]} />;
}
