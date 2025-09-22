import { getOrders } from '@/fetchers/orders';
import OrdersClient from '@/components/admin/OrdersClient';
import { OrderDetails } from '@/types/orders';

type Props = {
  searchParams?: Promise<{
    page?: string;
    limit?: string;
    search?: string;
  }>;
};

export default async function OrdersPage({ searchParams }: Props) {
  const params = (await searchParams) || {};
  const page = params.page ?? '1';
  const limit = params.limit || '5';
  const search = params.search || '';

  const ordersRes = await getOrders({
    page: parseInt(page),
    limit: parseInt(limit),
    q: search,
  });
  const orders = ordersRes?.data?.data?.rows || [];
  const count = ordersRes?.data?.data?.count || 0;
  return <OrdersClient initialOrders={orders as unknown as OrderDetails[]} count={count} />;
}
