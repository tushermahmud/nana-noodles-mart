export const dynamic = 'force-dynamic';
import { getPaymentTransactions } from '@/fetchers/payments';
import TransactionsSection from '@/components/admin/TransactionsSection';

type Props = {
  searchParams: Promise<{ page?: string; pageSize?: string; search?: string }>;
};

export default async function AdminTransactions({ searchParams }: Props) {
  const params = await searchParams;
  const page = Number.parseInt(params?.page ?? '1');
  const limit = Number.parseInt(params?.pageSize ?? '5');

  const txRes = await getPaymentTransactions({ page, limit });
  const rows = txRes?.data?.data?.rows ?? [];
  const count = txRes?.data?.data?.count ?? 0;

  return <TransactionsSection rows={rows} count={count} />;
}
