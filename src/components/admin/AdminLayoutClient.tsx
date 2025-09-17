'use client';

import { ReactNode, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Package, Tag, ShoppingCart, BarChart3 } from 'lucide-react';
import AdminHeader from '@/components/admin/AdminHeader';
import AdminTabs from '@/components/admin/AdminTabs';
import productsData from '@/data/products.json';
import categoriesData from '@/data/categories.json';
import tabsData from '@/data/tabs.json';
import { DashboardStats } from '@/types/admin';

type AdminLayoutClientProps = {
  children: ReactNode;
  dashboardStats: DashboardStats | null;
};

export default function AdminLayoutClient({ children, dashboardStats }: AdminLayoutClientProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [products] = useState(productsData);
  const [categories] = useState(categoriesData);

  // Mock orders data
  const [orders] = useState([
    {
      id: 'ORD-001',
      customer: 'John Doe',
      email: 'john@example.com',
      items: ['Premium Tonkotsu Ramen', 'Spicy Miso Ramen'],
      total: 35.98,
      status: 'pending',
      date: '2024-01-15',
      address: '123 Main St, City, State',
    },
    {
      id: 'ORD-002',
      customer: 'Jane Smith',
      email: 'jane@example.com',
      items: ['Vegetarian Ramen', 'Seafood Ramen'],
      total: 32.99,
      status: 'shipped',
      date: '2024-01-14',
      address: '456 Oak Ave, City, State',
    },
    {
      id: 'ORD-003',
      customer: 'Mike Johnson',
      email: 'mike@example.com',
      items: ['Premium Tonkotsu Ramen'],
      total: 18.99,
      status: 'delivered',
      date: '2024-01-13',
      address: '789 Pine Rd, City, State',
    },
  ]);

  // Map icon strings to actual components
  const iconMap = {
    Package,
    Tag,
    ShoppingCart,
    BarChart3,
  };

  const tabs = tabsData.map((tab) => ({
    ...tab,
    icon: iconMap[tab.icon as keyof typeof iconMap],
    total: tab.total as keyof DashboardStats,
    count:
      tab.id === 'products'
        ? products.length
        : tab.id === 'categories'
          ? categories.length
          : tab.id === 'orders'
            ? orders.length
            : null,
  }));

  // Get current active tab from pathname
  const activeTab = pathname.split('/').pop() || 'products';

  const setActiveTab = (tabId: string) => {
    router.push(`/admin/${tabId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <AdminHeader />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {tabs.map((tab) => (
            <div
              key={tab.id}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => setActiveTab(tab.id)}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{tab.label}</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {dashboardStats?.[tab.total] !== null ? dashboardStats?.[tab.total] : '—'}
                  </p>
                </div>
                <div
                  className={`p-3 rounded-lg ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-pink-500 to-orange-500'
                      : 'bg-gray-100'
                  }`}
                >
                  <tab.icon
                    className={`w-6 h-6 ${activeTab === tab.id ? 'text-white' : 'text-gray-600'}`}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-6">
          <AdminTabs
            tabs={tabs}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            dashboardStats={dashboardStats}
          />

          <main className="p-6">{children}</main>
        </div>
      </div>
    </div>
  );
}
