'use client';
import { Search } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export const SearchInput = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const initialQ = useMemo(() => searchParams.get('q') || '', [searchParams]);
  const [searchTerm, setSearchTerm] = useState(initialQ);

  useEffect(() => {
    const handler = setTimeout(() => {
      const q = searchTerm.trim();
      const params = new URLSearchParams(searchParams.toString());
      if (q) {
        params.set('search', q);
      } else {
        params.delete('search');
      }
      const next = `${pathname}?${params.toString()}`.replace(/\?$/, '');
      // Avoid pushing the same URL
      if (next !== `${pathname}?${searchParams.toString()}`.replace(/\?$/, '')) {
        router.push(next);
      }
    }, 500);
    return () => clearTimeout(handler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm]);

  const onKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === 'Enter') {
      const q = searchTerm.trim();
      const params = new URLSearchParams(searchParams.toString());
      if (q) {
        params.set('search', q);
      } else {
        params.delete('search');
      }
      const next = `${pathname}?${params.toString()}`.replace(/\?$/, '');
      router.push(next);
    }
  };

  return (
    <div className="relative flex-1 max-w-md">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
      <input
        type="text"
        placeholder="Search products..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={onKeyDown}
        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
      />
    </div>
  );
};
