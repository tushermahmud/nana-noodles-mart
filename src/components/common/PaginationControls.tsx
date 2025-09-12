'use client';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import type { Pagination as PaginationType } from '@/types/common';

type Props = {
  pagination: PaginationType;
};

export default function PaginationControls({ pagination }: Props) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const { currentPage, totalPages, hasPrevPage, hasNextPage, limit } = pagination;

  const buildHref = (targetPage: number) => {
    const sp = new URLSearchParams(searchParams?.toString() ?? '');
    sp.set('page', String(targetPage));
    if (!sp.get('pageSize') && limit) sp.set('pageSize', String(limit));
    return `${pathname}?${sp.toString()}`;
  };

  return (
    <div className="mt-6 flex items-center justify-between">
      <div className="text-sm text-muted-foreground">
        Page {currentPage} of {totalPages}
      </div>
      <div className="flex items-center gap-2">
        {hasPrevPage ? (
          <Link
            href={buildHref(Math.max(1, currentPage - 1))}
            className="px-3 py-1 border rounded-md hover:bg-accent"
          >
            Previous
          </Link>
        ) : (
          <span className="px-3 py-1 border rounded-md opacity-50">Previous</span>
        )}
        {hasNextPage ? (
          <Link
            href={buildHref(Math.min(totalPages, currentPage + 1))}
            className="px-3 py-1 border rounded-md hover:bg-accent"
          >
            Next
          </Link>
        ) : (
          <span className="px-3 py-1 border rounded-md opacity-50">Next</span>
        )}
      </div>
    </div>
  );
}
