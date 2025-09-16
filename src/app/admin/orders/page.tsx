'use client';

import { useState } from 'react';
import { Eye, Edit, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import OrderDetails from '@/components/admin/OrderDetails';
import { Order } from '@/types/orders';

const OrdersPage = () => {
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

  const [searchTerm, setSearchTerm] = useState('');
  const [showOrderDetails, setShowOrderDetails] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const filteredOrders = orders.filter(
    (order) =>
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'shipped':
        return 'bg-blue-100 text-blue-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleUpdateOrderStatus = (orderId: string, status: string) => {
    // In a real app, this would update the order in the database
    console.log(`Updating order ${orderId} to status: ${status}`);
  };

  const handleViewOrder = (order: Order) => {
    setSelectedOrder(order);
    setShowOrderDetails(true);
  };

  return (
    <>
      {/* Search */}
      <div className="flex justify-between items-center mb-6">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search orders..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Orders Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-4 font-medium text-gray-900">Order ID</th>
              <th className="text-left py-3 px-4 font-medium text-gray-900">Customer</th>
              <th className="text-left py-3 px-4 font-medium text-gray-900">Items</th>
              <th className="text-left py-3 px-4 font-medium text-gray-900">Total</th>
              <th className="text-left py-3 px-4 font-medium text-gray-900">Status</th>
              <th className="text-left py-3 px-4 font-medium text-gray-900">Date</th>
              <th className="text-left py-3 px-4 font-medium text-gray-900">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order) => (
              <tr key={order.id} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="py-4 px-4">
                  <span className="font-medium text-gray-900">{order.id}</span>
                </td>
                <td className="py-4 px-4">
                  <div>
                    <p className="font-medium text-gray-900">{order.customer}</p>
                    <p className="text-sm text-gray-500">{order.email}</p>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <div className="text-sm">
                    {order.items.map((item, index) => (
                      <p key={index} className="text-gray-600">
                        {item}
                      </p>
                    ))}
                  </div>
                </td>
                <td className="py-4 px-4">
                  <span className="font-medium text-gray-900">${order.total}</span>
                </td>
                <td className="py-4 px-4">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}
                  >
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </span>
                </td>
                <td className="py-4 px-4">
                  <span className="text-sm text-gray-600">{order.date}</span>
                </td>
                <td className="py-4 px-4">
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleViewOrder(order as unknown as Order)}
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Edit className="w-4 h-4" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Order Details Modal */}
      {showOrderDetails && (
        <OrderDetails
          isOpen={showOrderDetails}
          onClose={() => {
            setShowOrderDetails(false);
            setSelectedOrder(null);
          }}
          order={selectedOrder}
          onUpdateStatus={handleUpdateOrderStatus}
        />
      )}
    </>
  );
};

export default OrdersPage;
