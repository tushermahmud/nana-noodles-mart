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
  const page = params.page || '1';
  const limit = params.limit || '10';
  const search = params.search || '';

  // Fetch orders from the backend
  const ordersRes = await getOrders({
    page: parseInt(page),
    limit: parseInt(limit),
    q: search,
  });
  const orders = ordersRes?.data?.data?.rows || [];
  console.log('orders', orders);

  return <OrdersClient initialOrders={orders as unknown as OrderDetails[]} />;
}
