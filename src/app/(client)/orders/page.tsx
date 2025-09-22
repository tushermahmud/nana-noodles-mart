export const dynamic = 'force-dynamic';
import { getCurrentUser } from '@/fetchers/auth';
import { getOrders } from '@/fetchers/orders';
import OrdersClient from '@/components/orders/OrdersClient';
import { redirect } from 'next/navigation';
import { userDashboardOrders } from '@/actions/products';

export default async function OrdersPage() {
  const ordersRes = await userDashboardOrders();
  const orders = ordersRes?.data?.data || [];

  return <OrdersClient initialOrders={orders as any} />;
}
