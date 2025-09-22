'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Package, 
  Calendar, 
  DollarSign, 
  Eye, 
  Download,
  Truck,
  MapPin,
  Phone,
  Mail,
  X
} from 'lucide-react';
import { OrderDetails } from '@/types/orders';

interface OrdersClientProps {
  initialOrders: OrderDetails[];
}

const OrdersClient = ({ initialOrders }: OrdersClientProps) => {
  const [selectedOrder, setSelectedOrder] = useState<OrderDetails | null>(null);
  const [showOrderDetails, setShowOrderDetails] = useState(false);

  const getStatusColor = (status: string) => {
    const statusColors = {
      pending: 'bg-yellow-100 text-yellow-800',
      confirmed: 'bg-blue-100 text-blue-800',
      preparing: 'bg-purple-100 text-purple-800',
      shipped: 'bg-indigo-100 text-indigo-800',
      delivered: 'bg-green-100 text-green-800',
      cancelled: 'bg-red-100 text-red-800',
    };
    return statusColors[status as keyof typeof statusColors] || 'bg-gray-100 text-gray-800';
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const handleViewOrder = (order: OrderDetails) => {
    setSelectedOrder(order);
    setShowOrderDetails(true);
  };

  const handleDownloadOrder = (order: OrderDetails) => {
    // Generate PDF content
    const orderContent = `
      <html>
        <head>
          <title>Order ${order.order_id}</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            .header { border-bottom: 2px solid #FD7399; padding-bottom: 10px; margin-bottom: 20px; }
            .section { margin-bottom: 20px; }
            .item { display: flex; justify-content: space-between; padding: 5px 0; border-bottom: 1px solid #eee; }
            .total { font-weight: bold; font-size: 18px; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>Order Details</h1>
            <p>Order ID: ${order.order_id}</p>
            <p>Date: ${formatDate(order.created_at_full)}</p>
          </div>
          
          <div class="section">
            <h2>Customer Information</h2>
            <p>Name: ${order.customer_name}</p>
            <p>Email: ${order.customer_email}</p>
          </div>
          
          <div class="section">
            <h2>Shipping Address</h2>
            <p>${order.transaction_details.shipping_address}</p>
            <p>${order.transaction_details.shipping_city}, ${order.transaction_details.shipping_state} ${order.transaction_details.shipping_zip_code}</p>
          </div>
          
          <div class="section">
            <h2>Order Items</h2>
            ${order.items.map(item => `
              <div class="item">
                <span>${item.product_name} (Qty: ${item.quantity})</span>
                <span>${formatCurrency(item.total_price)}</span>
              </div>
            `).join('')}
            <div class="item total">
              <span>Total</span>
              <span>${formatCurrency(order.total_price)}</span>
            </div>
          </div>
          
          <div class="section">
            <h2>Order Status</h2>
            <p>Status: ${order.delivery_status}</p>
            <p>Reference: ${order.transaction_details.reference_number}</p>
          </div>
        </body>
      </html>
    `;

    // Open in new window for printing
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(orderContent);
      printWindow.document.close();
      printWindow.print();
    }
  };

  if (initialOrders.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-orange-50 py-8">
        <div className="container mx-auto px-4">
          <div className="text-center py-16">
            <Package className="w-24 h-24 text-gray-400 mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-gray-900 mb-4">No Orders Yet</h2>
            <p className="text-gray-600 mb-8">You haven't placed any orders yet. Start shopping to see your orders here!</p>
            <Button 
              onClick={() => window.location.href = '/products'}
              className="bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600 text-white px-8 py-3"
            >
              Start Shopping
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-orange-50 pt-40">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">My Orders</h1>
          <p className="text-gray-600">Track and manage your orders</p>
        </div>

        <div className="space-y-6">
          {initialOrders.map((order) => (
            <motion.div
              key={order.order_id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="border border-gray-200 shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader className="bg-gradient-to-r from-pink-50 to-orange-50">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl text-gray-900 break-all">
                        Order ID: #{order.order_id}
                      </CardTitle>
                      <div className="break-all font-semibold">
                      Transaction ID: #{order?.transaction_id ?? ""}

                      </div>
                      <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          {formatDate(order.created_at_full)}
                        </div>
                        <div className="flex items-center">
                          <DollarSign className="w-4 h-4 mr-1" />
                          {formatCurrency(order.total_price)}
                        </div>
                      </div>
                    </div>
                    <Badge className={getStatusColor(order.delivery_status)}>
                      {order.delivery_status.charAt(0).toUpperCase() + order.delivery_status.slice(1)}
                    </Badge>
                  </div>
                </CardHeader>
                
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Order Items */}
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                        <Package className="w-5 h-5 mr-2 text-pink-600" />
                        Items ({order.items.length})
                      </h3>
                      <div className="space-y-2">
                        {order.items.slice(0, 3).map((item, index) => (
                          <div key={index} className="flex justify-between text-sm">
                            <span className="text-gray-700">{item.product_name}</span>
                            <span className="text-gray-600">Qty: {item.quantity}</span>
                          </div>
                        ))}
                        {order.items.length > 3 && (
                          <p className="text-sm text-gray-500">
                            +{order.items.length - 3} more items
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Shipping Info */}
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                        <MapPin className="w-5 h-5 mr-2 text-pink-600" />
                        Shipping
                      </h3>
                      <div className="text-sm text-gray-600">
                        <p>{order.transaction_details.shipping_city}, {order.transaction_details.shipping_state}</p>
                        <p className="mt-1 break-all">Reference: {order.transaction_details.reference_number}</p>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col md:flex-row justify-end space-x-3 mt-6 pt-4 border-t border-gray-200 gap-2 md:gap-0">
                    <Button
                      variant="outline"
                      onClick={() => handleViewOrder(order)}
                      className="flex items-center"
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      View Details
                    </Button>
                    <Button
                      onClick={() => handleDownloadOrder(order)}
                      className="bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600 text-white flex items-center"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download PDF
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Order Details Modal */}
      {showOrderDetails && selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="p-6">
              {/* Header */}
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Order Details</h2>
                  <p className="text-gray-600">Order ID: {selectedOrder.order_id}</p>
                </div>
                <button
                  onClick={() => setShowOrderDetails(false)}
                  className="text-gray-400 hover:text-gray-600 text-2xl font-bold"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Order Information */}
                <div className="space-y-6">
                  {/* Customer Information */}
                  <div className="bg-gray-50 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                      <Mail className="w-5 h-5 mr-2 text-pink-600" />
                      Customer Information
                    </h3>
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm font-medium text-gray-700">Name</p>
                        <p className="text-gray-900">{selectedOrder.customer_name}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-700">Email</p>
                        <p className="text-gray-900">{selectedOrder.customer_email}</p>
                      </div>
                    </div>
                  </div>

                  {/* Shipping Address */}
                  <div className="bg-gray-50 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                      <MapPin className="w-5 h-5 mr-2 text-pink-600" />
                      Shipping Address
                    </h3>
                    <p className="text-gray-900">{selectedOrder.transaction_details.shipping_address}</p>
                    <p className="text-gray-900 mt-1">
                      {selectedOrder.transaction_details.shipping_city}, {selectedOrder.transaction_details.shipping_state} {selectedOrder.transaction_details.shipping_zip_code}
                    </p>
                  </div>

                  {/* Order Items */}
                  <div className="bg-gray-50 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                      <Package className="w-5 h-5 mr-2 text-pink-600" />
                      Order Items
                    </h3>
                    <div className="space-y-3">
                      {selectedOrder.items.map((item, index) => (
                        <div
                          key={index}
                          className="flex justify-between items-center py-2 border-b border-gray-200 last:border-b-0"
                        >
                          <div>
                            <p className="font-medium text-gray-900">{item.product_name}</p>
                            <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                            <p className="text-sm text-gray-600">Unit Price: {formatCurrency(item.unit_price)}</p>
                          </div>
                          <p className="font-medium text-gray-900">{formatCurrency(item.total_price)}</p>
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-semibold text-gray-900">Total</span>
                        <span className="text-lg font-bold text-gray-900">{formatCurrency(selectedOrder.total_price)}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Order Status & Summary */}
                <div className="space-y-6">
                  {/* Current Status */}
                  <div className="bg-white border border-gray-200 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                      <Truck className="w-5 h-5 mr-2 text-pink-600" />
                      Order Status
                    </h3>
                    <div className="mb-4">
                      <Badge className={getStatusColor(selectedOrder.delivery_status)}>
                        {selectedOrder.delivery_status.charAt(0).toUpperCase() + selectedOrder.delivery_status.slice(1)}
                      </Badge>
                    </div>
                  </div>

                  {/* Order Summary */}
                  <div className="bg-white border border-gray-200 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Order Date</span>
                        <span className="text-gray-900">{formatDate(selectedOrder.created_at_full)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Payment Method</span>
                        <span className="text-gray-900">Credit Card</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Reference Number</span>
                        <span className="text-gray-900 break-all">{selectedOrder.transaction_details.reference_number}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200 mt-6">
                <Button variant="outline" onClick={() => setShowOrderDetails(false)} className="px-6 py-2">
                  Close
                </Button>
                <Button 
                  onClick={() => handleDownloadOrder(selectedOrder)}
                  className="px-6 py-2 bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600 text-white"
                >
                  Download PDF
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default OrdersClient;
