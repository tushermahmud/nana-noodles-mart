'use client';

import React, { useState, useEffect } from 'react';
import { Eye, Edit, Search, Download, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import OrderDetailsComponent from '@/components/admin/OrderDetails';
import OrderDetailsModal from '@/components/admin/OrderDetailsModal';
import { Order, OrderDetails, OrderItemDetails } from '@/types/orders';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Package, Truck, CheckCircle } from 'lucide-react';

interface OrdersClientProps {
  initialOrders: OrderDetails[];
}

const OrdersClient = ({ initialOrders }: OrdersClientProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');
  const [showOrderDetails, setShowOrderDetails] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [showOrderDetailsModal, setShowOrderDetailsModal] = useState(false);
  const [selectedOrderForDetails, setSelectedOrderForDetails] = useState<OrderDetails | null>(null);
  const [showDownloadModal, setShowDownloadModal] = useState(false);
  const [selectedOrderForDownload, setSelectedOrderForDownload] = useState<OrderDetails | null>(null);
  const orders = initialOrders;

  // Debounced search effect
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());
      
      if (searchTerm.trim()) {
        params.set('search', searchTerm.trim());
      } else {
        params.delete('search');
      }
      
      // Reset to page 1 when searching
      params.set('page', '1');
      
      const newUrl = params.toString() ? `?${params.toString()}` : '';
      router.push(`/admin/orders${newUrl}`);
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchTerm, router, searchParams]);

  // For now, we'll use client-side filtering since we have the data
  // In a real app, you might want to trigger a server-side search
  const filteredOrders = orders.filter(
    (order) =>
      order.order_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer_email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.delivery_status.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.items.some(item => 
        item.product_name.toLowerCase().includes(searchTerm.toLowerCase())
      )
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

  const handleViewOrder = (order: OrderDetails) => {
    setSelectedOrderForDetails(order);
    setShowOrderDetailsModal(true);
  };

  const handleDownloadOrderDetails = (order: OrderDetails) => {
    setSelectedOrderForDownload(order);
    setShowDownloadModal(true);
  };

  const handleDownloadPDF = () => {
    if (!selectedOrderForDownload) return;

    // Create a new window with the order details for printing
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    const order = selectedOrderForDownload;
    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Order Details - ${order.order_id}</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            .header { text-align: center; margin-bottom: 30px; }
            .order-info { margin-bottom: 20px; }
            .items-table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
            .items-table th, .items-table td { border: 1px solid #ddd; padding: 8px; text-align: left; }
            .items-table th { background-color: #f2f2f2; }
            .total { font-weight: bold; font-size: 18px; }
            .shipping-info { margin-top: 20px; }
            @media print { body { margin: 0; } }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>Nana's Noodle Mart</h1>
            <h2>Order Details</h2>
          </div>
          
          <div class="order-info">
            <h3>Order Information</h3>
            <p><strong>Order ID:</strong> ${order.order_id}</p>
            <p><strong>Customer:</strong> ${order.customer_name}</p>
            <p><strong>Email:</strong> ${order.customer_email}</p>
            <p><strong>Date:</strong> ${order.created_at}</p>
            <p><strong>Status:</strong> ${order.status}</p>
          </div>

          <table class="items-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Product ID</th>
                <th>Quantity</th>
                <th>Unit Price</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              ${order.items.map(item => `
                <tr>
                  <td>${item.product_name}</td>
                  <td>${item.product_id}</td>
                  <td>${item.quantity}</td>
                  <td>${order.transaction_details.currency.toUpperCase()} ${item.unit_price.toFixed(2)}</td>
                  <td>${order.transaction_details.currency.toUpperCase()} ${item.total_price.toFixed(2)}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>

          <div class="total">
            <p>Total Amount: ${order.transaction_details.currency.toUpperCase()} ${order.total_price.toFixed(2)}</p>
          </div>

          <div class="shipping-info">
            <h3>Shipping Information</h3>
            <p><strong>Address:</strong> ${order.transaction_details.shipping_address}</p>
            <p><strong>City:</strong> ${order.transaction_details.shipping_city}</p>
            <p><strong>State:</strong> ${order.transaction_details.shipping_state}</p>
            <p><strong>ZIP Code:</strong> ${order.transaction_details.shipping_zip_code}</p>
          </div>
        </body>
      </html>
    `;

    printWindow.document.write(htmlContent);
    printWindow.document.close();
    printWindow.focus();
    
    // Wait for content to load then print
    setTimeout(() => {
      printWindow.print();
      printWindow.close();
    }, 250);
  };

  return (
    <>
      {/* Search */}
      <div className="flex justify-between items-center mb-6">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search orders by ID, customer, email, status, or product..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
        {searchTerm && (
          <div className="text-sm text-gray-600">
            {filteredOrders.length} of {orders.length} orders
          </div>
        )}
      </div>

      {/* Orders Table */}
      <div className="overflow-x-auto">
        {filteredOrders.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📦</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              {searchTerm ? 'No orders found' : 'No orders available'}
            </h3>
            <p className="text-gray-600">
              {searchTerm 
                ? `No orders match your search for "${searchTerm}"`
                : 'There are no orders to display at the moment.'
              }
            </p>
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="mt-4 text-pink-600 hover:text-pink-700 font-medium"
              >
                Clear search
              </button>
            )}
          </div>
        ) : (
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
            {filteredOrders.map((order, index) => (
              <React.Fragment key={order.order_id}>
                {index > 0 && (
                  <tr>
                    <td colSpan={7} className="h-4"></td>
                  </tr>
                )}
                <tr className="border-2 border-gray-300 hover:bg-gray-50">
                {/* Order ID */}
                <td className="py-4 px-4 align-middle">
                  <span className="font-medium text-gray-900">{order.order_id}</span>
                </td>
                
                {/* Customer */}
                <td className="py-4 px-4 align-middle">
                  <div>
                    <p className="font-medium text-gray-900">{order.customer_name}</p>
                    <p className="text-sm text-gray-500">{order.customer_email}</p>
                  </div>
                </td>
                
                {/* Items - All products in one cell, vertically centered */}
                <td className="py-4 px-4 align-middle">
                  <div className="space-y-2">
                    {order.items.map((item, index) => (
                      <div key={item.id} className="flex items-center justify-between bg-gray-50 rounded-lg p-2 border">
                        <div className="flex-1">
                          <p className="font-medium text-gray-900 text-sm">{item.product_name}</p>
                          <p className="text-xs text-gray-500">ID: {item.product_id}</p>
                        </div>
                        <div className="flex items-center space-x-3 text-sm">
                          <span className="text-gray-600">Qty: {item.quantity}</span>
                          <span className="text-gray-600">
                            {order.transaction_details.currency.toUpperCase()} {item.unit_price.toFixed(2)}
                          </span>
                          <span className="font-medium text-gray-900">
                            {order.transaction_details.currency.toUpperCase()} {item.total_price.toFixed(2)}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </td>
                
                {/* Total */}
                <td className="py-4 px-4 align-middle">
                  <span className="font-bold text-gray-900">
                    {order.transaction_details.currency.toUpperCase()} {order.total_price.toFixed(2)}
                  </span>
                </td>
                
                {/* Status */}
                <td className="py-4 px-4 align-middle">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(order.delivery_status)}`}
                  >
                    {order.delivery_status.charAt(0).toUpperCase() + order.delivery_status.slice(1)}
                  </span>
                </td>
                
                {/* Date */}
                <td className="py-4 px-4 align-middle">
                  <span className="text-sm text-gray-600">{order.created_at}</span>
                </td>
                
                {/* Actions */}
                <td className="py-4 px-4 align-middle">
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleViewOrder(order)}
                      title="View Order Details"
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDownloadOrderDetails(order)}
                      title="Download Order Details"
                    >
                      <Download className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="sm" title="Edit Order">
                      <Edit className="w-4 h-4" />
                    </Button>
                  </div>
                </td>
                </tr>
              </React.Fragment>
            ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Order Details Modal */}
      {showOrderDetailsModal && selectedOrderForDetails && (
        <OrderDetailsModal
          isOpen={showOrderDetailsModal}
          onClose={() => {
            setShowOrderDetailsModal(false);
            setSelectedOrderForDetails(null);
          }}
          order={selectedOrderForDetails}
          onUpdateStatus={handleUpdateOrderStatus}
        />
      )}

      {/* Download Order Details Modal */}
      {showDownloadModal && selectedOrderForDownload && (
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
                  <h2 className="text-2xl font-bold text-gray-900">Download Order Details</h2>
                  <p className="text-gray-600">Order ID: {selectedOrderForDownload.order_id}</p>
                </div>
                <button
                  onClick={() => {
                    setShowDownloadModal(false);
                    setSelectedOrderForDownload(null);
                  }}
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
                        <p className="text-gray-900">{selectedOrderForDownload.customer_name}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-700">Email</p>
                        <p className="text-gray-900">{selectedOrderForDownload.customer_email}</p>
                      </div>
                    </div>
                  </div>

                  {/* Shipping Address */}
                  <div className="bg-gray-50 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                      <MapPin className="w-5 h-5 mr-2 text-pink-600" />
                      Shipping Address
                    </h3>
                    <p className="text-gray-900">{selectedOrderForDownload.transaction_details.shipping_address}</p>
                    <p className="text-gray-900">{selectedOrderForDownload.transaction_details.shipping_city}, {selectedOrderForDownload.transaction_details.shipping_state} {selectedOrderForDownload.transaction_details.shipping_zip_code}</p>
                  </div>

                  {/* Order Items */}
                  <div className="bg-gray-50 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                      <Package className="w-5 h-5 mr-2 text-pink-600" />
                      Order Items
                    </h3>
                    <div className="space-y-3">
                      {selectedOrderForDownload.items.map((item, index) => (
                        <div
                          key={index}
                          className="flex justify-between items-center py-2 border-b border-gray-200 last:border-b-0"
                        >
                          <div>
                            <p className="font-medium text-gray-900">{item.product_name}</p>
                            <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                          </div>
                          <p className="font-medium text-gray-900">${item.unit_price.toFixed(2)}</p>
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-semibold text-gray-900">Total</span>
                        <span className="text-lg font-bold text-gray-900">${selectedOrderForDownload.total_price.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Order Summary */}
                <div className="space-y-6">
                  {/* Current Status */}
                  <div className="bg-white border border-gray-200 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                      <Truck className="w-5 h-5 mr-2 text-pink-600" />
                      Order Status
                    </h3>
                    <div className="mb-4">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(selectedOrderForDownload.status)}`}
                      >
                        {selectedOrderForDownload.status.charAt(0).toUpperCase() + selectedOrderForDownload.status.slice(1)}
                      </span>
                    </div>
                  </div>

                  {/* Order Summary */}
                  <div className="bg-white border border-gray-200 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Order Date</span>
                        <span className="text-gray-900 break-all">{selectedOrderForDownload.created_at}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Payment Method</span>
                        <span className="text-gray-900">Credit Card</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Reference Number</span>
                        <span className="text-gray-900 break-all">{selectedOrderForDownload.transaction_details.reference_number}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200 mt-6">
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setShowDownloadModal(false);
                    setSelectedOrderForDownload(null);
                  }} 
                  className="px-6 py-2"
                >
                  Close
                </Button>
                <Button 
                  onClick={handleDownloadPDF}
                  className="px-6 py-2 bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600 text-white"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download PDF
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
};

export default OrdersClient;
