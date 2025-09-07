"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Package, 
  Tag, 
  ShoppingCart, 
  BarChart3, 
  Plus,
  Edit,
  Trash2,
  Eye,
  Search,
  Filter
} from "lucide-react";
import { Button } from "@/components/ui/button";
import ProductForm from "@/components/admin/ProductForm";
import CategoryForm from "@/components/admin/CategoryForm";
import OrderDetails from "@/components/admin/OrderDetails";
import productsData from "@/data/products.json";
import categoriesData from "@/data/categories.json";

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState("products");
  const [products, setProducts] = useState(productsData);
  const [categories, setCategories] = useState(categoriesData);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [showOrderDetails, setShowOrderDetails] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  // Mock orders data
  const [orders] = useState([
    {
      id: "ORD-001",
      customer: "John Doe",
      email: "john@example.com",
      items: ["Premium Tonkotsu Ramen", "Spicy Miso Ramen"],
      total: 35.98,
      status: "pending",
      date: "2024-01-15",
      address: "123 Main St, City, State"
    },
    {
      id: "ORD-002", 
      customer: "Jane Smith",
      email: "jane@example.com",
      items: ["Vegetarian Ramen", "Seafood Ramen"],
      total: 32.99,
      status: "shipped",
      date: "2024-01-14",
      address: "456 Oak Ave, City, State"
    },
    {
      id: "ORD-003",
      customer: "Mike Johnson", 
      email: "mike@example.com",
      items: ["Premium Tonkotsu Ramen"],
      total: 18.99,
      status: "delivered",
      date: "2024-01-13",
      address: "789 Pine Rd, City, State"
    }
  ]);

  const tabs = [
    { id: "products", label: "Products", icon: Package, count: products.length },
    { id: "categories", label: "Categories", icon: Tag, count: categories.length },
    { id: "orders", label: "Orders", icon: ShoppingCart, count: orders.length },
    { id: "analytics", label: "Analytics", icon: BarChart3, count: null },
  ];

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredOrders = orders.filter(order =>
    order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending": return "bg-yellow-100 text-yellow-800";
      case "shipped": return "bg-blue-100 text-blue-800";
      case "delivered": return "bg-green-100 text-green-800";
      case "cancelled": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const handleSaveProduct = (productData: any) => {
    if (editingItem) {
      setProducts(prev => prev.map(p => p.id === productData.id ? productData : p));
    } else {
      setProducts(prev => [...prev, productData]);
    }
    setEditingItem(null);
  };

  const handleSaveCategory = (categoryData: any) => {
    if (editingItem) {
      setCategories(prev => prev.map(c => c.id === categoryData.id ? categoryData : c));
    } else {
      setCategories(prev => [...prev, categoryData]);
    }
    setEditingItem(null);
  };

  const handleUpdateOrderStatus = (orderId: string, status: string) => {
    // In a real app, this would update the order in the database
    console.log(`Updating order ${orderId} to status: ${status}`);
  };

  const handleEditItem = (item: any) => {
    setEditingItem(item);
    setShowAddModal(true);
  };

  const handleViewOrder = (order: any) => {
    setSelectedOrder(order);
    setShowOrderDetails(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Admin Panel</h1>
              <p className="text-gray-600 mt-1">Manage your Nana's Noodle Mart</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm text-gray-600">Welcome back, Admin</p>
                <p className="text-xs text-gray-500">Last login: Today</p>
              </div>
              <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-orange-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">A</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {tabs.map((tab) => (
            <motion.div
              key={tab.id}
              whileHover={{ scale: 1.02 }}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 cursor-pointer"
              onClick={() => setActiveTab(tab.id)}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{tab.label}</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {tab.count !== null ? tab.count : "—"}
                  </p>
                </div>
                <div className={`p-3 rounded-lg ${
                  activeTab === tab.id 
                    ? "bg-gradient-to-r from-pink-500 to-orange-500" 
                    : "bg-gray-100"
                }`}>
                  <tab.icon className={`w-6 h-6 ${
                    activeTab === tab.id ? "text-white" : "text-gray-600"
                  }`} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-6">
          <div className="flex border-b border-gray-200">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? "border-pink-500 text-pink-600"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                <tab.icon className="w-4 h-4 mr-2" />
                {tab.label}
                {tab.count !== null && (
                  <span className="ml-2 bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs">
                    {tab.count}
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {/* Search and Actions */}
            <div className="flex justify-between items-center mb-6">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder={`Search ${activeTab}...`}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                />
              </div>
              <div className="flex space-x-3">
                <Button variant="outline" size="sm">
                  <Filter className="w-4 h-4 mr-2" />
                  Filter
                </Button>
                <Button 
                  size="sm" 
                  className="bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600"
                  onClick={() => setShowAddModal(true)}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add {activeTab.slice(0, -1)}
                </Button>
              </div>
            </div>

            {/* Products Tab */}
            {activeTab === "products" && (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Product</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Category</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Price</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Stock</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Status</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredProducts.map((product) => (
                      <tr key={product.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-4 px-4">
                          <div className="flex items-center">
                            <img
                              src={product.image}
                              alt={product.name}
                              className="w-12 h-12 rounded-lg object-cover mr-3"
                            />
                            <div>
                              <p className="font-medium text-gray-900">{product.name}</p>
                              <p className="text-sm text-gray-500 truncate max-w-xs">
                                {product.description}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                            {product.category}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <span className="font-medium text-gray-900">${product.price}</span>
                        </td>
                        <td className="py-4 px-4">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            product.inStock 
                              ? "bg-green-100 text-green-800" 
                              : "bg-red-100 text-red-800"
                          }`}>
                            {product.inStock ? "In Stock" : "Out of Stock"}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            product.popular 
                              ? "bg-yellow-100 text-yellow-800" 
                              : "bg-gray-100 text-gray-800"
                          }`}>
                            {product.popular ? "Popular" : "Regular"}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm">
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleEditItem(product)}
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Categories Tab */}
            {activeTab === "categories" && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {categories.map((category) => (
                  <motion.div
                    key={category.id}
                    whileHover={{ scale: 1.02 }}
                    className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className={`p-3 rounded-lg bg-gradient-to-r ${category.color}`}>
                        <Package className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex space-x-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleEditItem(category)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{category.name}</h3>
                    <p className="text-sm text-gray-600 mb-4">{category.count} products</p>
                    <div className="flex flex-wrap gap-2">
                      {category.features.map((feature, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {/* Orders Tab */}
            {activeTab === "orders" && (
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
                              <p key={index} className="text-gray-600">{item}</p>
                            ))}
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <span className="font-medium text-gray-900">${order.total}</span>
                        </td>
                        <td className="py-4 px-4">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
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
                              onClick={() => handleViewOrder(order)}
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
            )}

            {/* Analytics Tab */}
            {activeTab === "analytics" && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-6 text-white">
                  <h3 className="text-lg font-semibold mb-2">Total Revenue</h3>
                  <p className="text-3xl font-bold">$12,450</p>
                  <p className="text-blue-100 text-sm">+12% from last month</p>
                </div>
                <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-6 text-white">
                  <h3 className="text-lg font-semibold mb-2">Total Orders</h3>
                  <p className="text-3xl font-bold">1,234</p>
                  <p className="text-green-100 text-sm">+8% from last month</p>
                </div>
                <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl p-6 text-white">
                  <h3 className="text-lg font-semibold mb-2">Active Customers</h3>
                  <p className="text-3xl font-bold">856</p>
                  <p className="text-purple-100 text-sm">+15% from last month</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modals */}
      {showAddModal && (
        <>
          {activeTab === "products" && (
            <ProductForm
              isOpen={showAddModal}
              onClose={() => {
                setShowAddModal(false);
                setEditingItem(null);
              }}
              product={editingItem}
              categories={categories}
              onSave={handleSaveProduct}
            />
          )}
          {activeTab === "categories" && (
            <CategoryForm
              isOpen={showAddModal}
              onClose={() => {
                setShowAddModal(false);
                setEditingItem(null);
              }}
              category={editingItem}
              onSave={handleSaveCategory}
            />
          )}
        </>
      )}

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
    </div>
  );
};

export default AdminPanel;
