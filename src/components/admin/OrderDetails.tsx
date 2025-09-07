"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { X, MapPin, Phone, Mail, Package, Truck, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface OrderDetailsProps {
  isOpen: boolean;
  onClose: () => void;
  order: any;
  onUpdateStatus: (orderId: string, status: string) => void;
}

const OrderDetails = ({ isOpen, onClose, order, onUpdateStatus }: OrderDetailsProps) => {
  const [newStatus, setNewStatus] = useState(order?.status || "");

  const statusOptions = [
    { value: "pending", label: "Pending", color: "bg-yellow-100 text-yellow-800" },
    { value: "confirmed", label: "Confirmed", color: "bg-blue-100 text-blue-800" },
    { value: "preparing", label: "Preparing", color: "bg-purple-100 text-purple-800" },
    { value: "shipped", label: "Shipped", color: "bg-indigo-100 text-indigo-800" },
    { value: "delivered", label: "Delivered", color: "bg-green-100 text-green-800" },
    { value: "cancelled", label: "Cancelled", color: "bg-red-100 text-red-800" }
  ];

  const getStatusColor = (status: string) => {
    const statusOption = statusOptions.find(s => s.value === status);
    return statusOption?.color || "bg-gray-100 text-gray-800";
  };

  const handleStatusUpdate = () => {
    if (newStatus !== order.status) {
      onUpdateStatus(order.id, newStatus);
    }
    onClose();
  };

  if (!isOpen || !order) return null;

  return (
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
              <p className="text-gray-600">Order ID: {order.id}</p>
            </div>
            <button
              onClick={onClose}
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
                    <p className="text-gray-900">{order.customer}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700">Email</p>
                    <p className="text-gray-900">{order.email}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700">Phone</p>
                    <p className="text-gray-900">{order.phone || "Not provided"}</p>
                  </div>
                </div>
              </div>

              {/* Shipping Address */}
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <MapPin className="w-5 h-5 mr-2 text-pink-600" />
                  Shipping Address
                </h3>
                <p className="text-gray-900">{order.address}</p>
              </div>

              {/* Order Items */}
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <Package className="w-5 h-5 mr-2 text-pink-600" />
                  Order Items
                </h3>
                <div className="space-y-3">
                  {order.items.map((item: any, index: number) => (
                    <div key={index} className="flex justify-between items-center py-2 border-b border-gray-200 last:border-b-0">
                      <div>
                        <p className="font-medium text-gray-900">{item.name || item}</p>
                        <p className="text-sm text-gray-600">Quantity: {item.quantity || 1}</p>
                      </div>
                      <p className="font-medium text-gray-900">${item.price || "0.00"}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold text-gray-900">Total</span>
                    <span className="text-lg font-bold text-gray-900">${order.total}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Order Status & Actions */}
            <div className="space-y-6">
              {/* Current Status */}
              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <Truck className="w-5 h-5 mr-2 text-pink-600" />
                  Order Status
                </h3>
                <div className="mb-4">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </span>
                </div>
                
                {/* Status Timeline */}
                <div className="space-y-4">
                  {statusOptions.map((status, index) => {
                    const isActive = status.value === order.status;
                    const isCompleted = statusOptions.findIndex(s => s.value === order.status) > index;
                    
                    return (
                      <div key={status.value} className="flex items-center">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          isActive || isCompleted 
                            ? "bg-pink-500 text-white" 
                            : "bg-gray-200 text-gray-400"
                        }`}>
                          {isCompleted ? (
                            <CheckCircle className="w-4 h-4" />
                          ) : (
                            <span className="text-xs font-bold">{index + 1}</span>
                          )}
                        </div>
                        <div className="ml-3">
                          <p className={`text-sm font-medium ${
                            isActive || isCompleted ? "text-gray-900" : "text-gray-500"
                          }`}>
                            {status.label}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Update Status */}
              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Update Status</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      New Status
                    </label>
                    <select
                      value={newStatus}
                      onChange={(e) => setNewStatus(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    >
                      {statusOptions.map((status) => (
                        <option key={status.value} value={status.value}>
                          {status.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <Button
                    onClick={handleStatusUpdate}
                    disabled={newStatus === order.status}
                    className="w-full bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600 text-white"
                  >
                    Update Status
                  </Button>
                </div>
              </div>

              {/* Order Summary */}
              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Order Date</span>
                    <span className="text-gray-900">{order.date}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Payment Method</span>
                    <span className="text-gray-900">{order.paymentMethod || "Credit Card"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping Method</span>
                    <span className="text-gray-900">{order.shippingMethod || "Standard"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tracking Number</span>
                    <span className="text-gray-900">{order.trackingNumber || "Not available"}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200 mt-6">
            <Button
              variant="outline"
              onClick={onClose}
              className="px-6 py-2"
            >
              Close
            </Button>
            <Button
              className="px-6 py-2 bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600 text-white"
            >
              Print Order
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default OrderDetails;
