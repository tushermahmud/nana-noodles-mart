'use client';

import AdminPagination from '@/components/common/AdminPagination';
import { PaymentTransaction } from '@/types/payments';
import { Calendar, DollarSign, Mail } from 'lucide-react';

type Props = {
  rows: PaymentTransaction[];
  count: number;
};

export default function TransactionsSection({ rows, count }: Props) {
  const formatCurrency = (amount: number, currency: string) =>
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: (currency || 'usd').toUpperCase(),
    }).format(amount);

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });

  return (
    <>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-4 font-medium text-gray-900">Transaction</th>
              <th className="text-left py-3 px-4 font-medium text-gray-900">User</th>
              <th className="text-left py-3 px-4 font-medium text-gray-900">Amount</th>
              <th className="text-left py-3 px-4 font-medium text-gray-900">Status</th>
              <th className="text-left py-3 px-4 font-medium text-gray-900">Created</th>
              <th className="text-left py-3 px-4 font-medium text-gray-900">Items</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((tx) => (
              <tr key={tx.id} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="py-4 px-4">
                  <div className="text-sm text-gray-900 break-all">#{tx.id}</div>
                  <div className="text-xs text-gray-500">{tx.provider ?? 'stripe'}</div>
                </td>
                <td className="py-4 px-4">
                  <div className="flex items-center text-sm text-gray-700">
                    <Mail className="w-4 h-4 mr-2 text-pink-600" /> {tx.user?.email}
                  </div>
                </td>
                <td className="py-4 px-4">
                  <div className="flex items-center text-sm text-gray-900">
                    <DollarSign className="w-4 h-4 mr-1" /> {formatCurrency(tx.amount, tx.currency)}
                  </div>
                </td>
                <td className="py-4 px-4">
                  {(() => {
                    const isSuccess = tx.status === 'succeed' || tx.status === 'succeeded';
                    const cls = isSuccess
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800';
                    const label = isSuccess ? 'Succeeded' : 'Failed';
                    return (
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${cls}`}
                      >
                        {label}
                      </span>
                    );
                  })()}
                </td>
                <td className="py-4 px-4">
                  <div className="flex items-center text-sm text-gray-700">
                    <Calendar className="w-4 h-4 mr-2" /> {formatDate(tx.created_at)}
                  </div>
                </td>
                <td className="py-4 px-4 text-sm text-gray-700">{tx.order_items?.length ?? 0}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <AdminPagination totalCount={count} defaultPageSize={5} />
    </>
  );
}
