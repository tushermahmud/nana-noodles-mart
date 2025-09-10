'use client';

import { TrendingUp, TrendingDown, Users, ShoppingCart, DollarSign, Package } from 'lucide-react';

const AnalyticsPage = () => {
  return (
    <>
      {/* Analytics Overview */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Analytics Dashboard</h2>
        <p className="text-sm text-gray-600">Overview of your business performance</p>
      </div>

      {/* Main Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold mb-2">Total Revenue</h3>
              <p className="text-3xl font-bold">$12,450</p>
              <div className="flex items-center mt-2">
                <TrendingUp className="w-4 h-4 mr-1" />
                <p className="text-blue-100 text-sm">+12% from last month</p>
              </div>
            </div>
            <DollarSign className="w-12 h-12 text-blue-200" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold mb-2">Total Orders</h3>
              <p className="text-3xl font-bold">1,234</p>
              <div className="flex items-center mt-2">
                <TrendingUp className="w-4 h-4 mr-1" />
                <p className="text-green-100 text-sm">+8% from last month</p>
              </div>
            </div>
            <ShoppingCart className="w-12 h-12 text-green-200" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold mb-2">Active Customers</h3>
              <p className="text-3xl font-bold">856</p>
              <div className="flex items-center mt-2">
                <TrendingUp className="w-4 h-4 mr-1" />
                <p className="text-purple-100 text-sm">+15% from last month</p>
              </div>
            </div>
            <Users className="w-12 h-12 text-purple-200" />
          </div>
        </div>
      </div>

      {/* Additional Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Average Order Value</p>
              <p className="text-2xl font-bold text-gray-900">$28.50</p>
              <div className="flex items-center mt-1">
                <TrendingUp className="w-3 h-3 mr-1 text-green-500" />
                <p className="text-green-600 text-xs">+5.2%</p>
              </div>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <DollarSign className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Products Sold</p>
              <p className="text-2xl font-bold text-gray-900">2,847</p>
              <div className="flex items-center mt-1">
                <TrendingUp className="w-3 h-3 mr-1 text-green-500" />
                <p className="text-green-600 text-xs">+12.3%</p>
              </div>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <Package className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Conversion Rate</p>
              <p className="text-2xl font-bold text-gray-900">3.2%</p>
              <div className="flex items-center mt-1">
                <TrendingDown className="w-3 h-3 mr-1 text-red-500" />
                <p className="text-red-600 text-xs">-0.8%</p>
              </div>
            </div>
            <div className="p-3 bg-yellow-100 rounded-lg">
              <TrendingUp className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Returning Customers</p>
              <p className="text-2xl font-bold text-gray-900">68%</p>
              <div className="flex items-center mt-1">
                <TrendingUp className="w-3 h-3 mr-1 text-green-500" />
                <p className="text-green-600 text-xs">+2.1%</p>
              </div>
            </div>
            <div className="p-3 bg-purple-100 rounded-lg">
              <Users className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Charts Placeholder */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Revenue Trend</h3>
          <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
            <p className="text-gray-500">Chart placeholder - Revenue over time</p>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Products</h3>
          <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
            <p className="text-gray-500">Chart placeholder - Product performance</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default AnalyticsPage;
