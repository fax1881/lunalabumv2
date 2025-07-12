'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Search, 
  Filter, 
  Eye, 
  Edit, 
  Truck, 
  CheckCircle,
  Clock,
  Package,
  User,
  Calendar,
  DollarSign
} from 'lucide-react';
import Link from 'next/link';

interface OrderItem {
  id: number;
  productId: number;
  quantity: number;
  size: string;
  price: number;
  product: {
    id: number;
    name: string;
    image: string;
  };
}

interface Order {
  id: number;
  orderNumber: string;
  userId: number;
  user: {
    name: string;
    email: string;
  };
  adres: string;
  totalAmount: number;
  status: string;
  createdAt: string;
  orderItems: OrderItem[];
}

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [showStatusModal, setShowStatusModal] = useState(false);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      // Mock veriler - gerçek uygulamada API'den gelecek
      const mockOrders: Order[] = [
        {
          id: 1,
          orderNumber: 'ORD-1703123456789',
          userId: 1,
          user: { name: 'Ahmet Yılmaz', email: 'ahmet@example.com' },
          adres: 'İstanbul, Kadıköy, Örnek Mahallesi No:123',
          totalAmount: 245.50,
          status: 'Hazırlanıyor',
          createdAt: '2024-01-15T10:30:00Z',
          orderItems: [
            {
              id: 1,
              productId: 1,
              quantity: 2,
              size: 'A4',
              price: 122.75,
              product: {
                id: 1,
                name: 'Fotoğraf Baskısı',
                image: '/images/photo-print.jpg'
              }
            }
          ]
        },
        {
          id: 2,
          orderNumber: 'ORD-1703123456790',
          userId: 2,
          user: { name: 'Ayşe Demir', email: 'ayse@example.com' },
          adres: 'Ankara, Çankaya, Test Sokak No:456',
          totalAmount: 189.00,
          status: 'Kargoda',
          createdAt: '2024-01-14T15:45:00Z',
          orderItems: [
            {
              id: 2,
              productId: 2,
              quantity: 1,
              size: '20x30',
              price: 189.00,
              product: {
                id: 2,
                name: 'Canvas Tablo',
                image: '/images/canvas.jpg'
              }
            }
          ]
        },
        {
          id: 3,
          orderNumber: 'ORD-1703123456791',
          userId: 3,
          user: { name: 'Mehmet Kaya', email: 'mehmet@example.com' },
          adres: 'İzmir, Konak, Örnek Cadde No:789',
          totalAmount: 320.00,
          status: 'Teslim Edildi',
          createdAt: '2024-01-13T09:15:00Z',
          orderItems: [
            {
              id: 3,
              productId: 3,
              quantity: 3,
              size: 'A3',
              price: 106.67,
              product: {
                id: 3,
                name: 'Foto Takvim',
                image: '/images/calendar.jpg'
              }
            }
          ]
        }
      ];
      
      setOrders(mockOrders);
    } catch (error) {
      console.error('Orders fetch error:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (orderId: number, newStatus: string) => {
    try {
      // Mock API call - gerçek uygulamada API'ye gönderilecek
      setOrders(orders.map(order => 
        order.id === orderId ? { ...order, status: newStatus } : order
      ));
      setShowStatusModal(false);
      setSelectedOrder(null);
    } catch (error) {
      console.error('Status update error:', error);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('tr-TR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Hazırlanıyor':
        return 'bg-yellow-100 text-yellow-800';
      case 'Kargoda':
        return 'bg-blue-100 text-blue-800';
      case 'Teslim Edildi':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Hazırlanıyor':
        return <Package className="h-4 w-4" />;
      case 'Kargoda':
        return <Truck className="h-4 w-4" />;
      case 'Teslim Edildi':
        return <CheckCircle className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.user.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Siparişler yükleniyor...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">Sipariş Yönetimi</h1>
              <p className="text-gray-600">Tüm siparişleri görüntüle ve yönet</p>
            </div>
            <Link
              href="/admin"
              className="mt-4 sm:mt-0 inline-flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              ← Admin Paneli
            </Link>
          </div>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl shadow-lg p-6 mb-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Sipariş ara..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">Tüm Durumlar</option>
                <option value="Hazırlanıyor">Hazırlanıyor</option>
                <option value="Kargoda">Kargoda</option>
                <option value="Teslim Edildi">Teslim Edildi</option>
              </select>
            </div>
            
            <div className="text-right">
              <span className="text-sm text-gray-600">
                Toplam: {filteredOrders.length} sipariş
              </span>
            </div>
          </div>
        </motion.div>

        {/* Orders List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-4"
        >
          {filteredOrders.map((order, index) => (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden"
            >
              <div className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="flex items-center space-x-2">
                        <Package className="h-5 w-5 text-gray-500" />
                        <h3 className="text-lg font-semibold text-gray-800">
                          {order.orderNumber}
                        </h3>
                      </div>
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                        {getStatusIcon(order.status)}
                        <span className="ml-1">{order.status}</span>
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                      <div className="flex items-center space-x-2">
                        <User className="h-4 w-4 text-gray-500" />
                        <span className="text-gray-600">{order.user.name}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4 text-gray-500" />
                        <span className="text-gray-600">{formatDate(order.createdAt)}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <DollarSign className="h-4 w-4 text-gray-500" />
                        <span className="text-gray-600 font-semibold">₺{order.totalAmount.toFixed(2)}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Package className="h-4 w-4 text-gray-500" />
                        <span className="text-gray-600">{order.orderItems.length} ürün</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4 lg:mt-0 flex space-x-2">
                    <Link
                      href={`/admin/siparisler/${order.id}`}
                      className="inline-flex items-center px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      Detay
                    </Link>
                    <button
                      onClick={() => {
                        setSelectedOrder(order);
                        setShowStatusModal(true);
                      }}
                      className="inline-flex items-center px-3 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                    >
                      <Edit className="h-4 w-4 mr-1" />
                      Durum
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
          
          {filteredOrders.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">Sipariş bulunamadı</h3>
              <p className="text-gray-500">Arama kriterlerinize uygun sipariş bulunmuyor.</p>
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* Status Update Modal */}
      {showStatusModal && selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl p-6 w-full max-w-md mx-4"
          >
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Sipariş Durumu Güncelle
            </h3>
            <p className="text-gray-600 mb-4">
              <strong>{selectedOrder.orderNumber}</strong> siparişinin durumunu güncelleyin
            </p>
            
            <div className="space-y-2 mb-6">
              {['Hazırlanıyor', 'Kargoda', 'Teslim Edildi'].map((status) => (
                <button
                  key={status}
                  onClick={() => updateOrderStatus(selectedOrder.id, status)}
                  className={`w-full text-left px-4 py-3 rounded-lg border transition-colors ${
                    selectedOrder.status === status
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
            
            <div className="flex space-x-3">
              <button
                onClick={() => {
                  setShowStatusModal(false);
                  setSelectedOrder(null);
                }}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                İptal
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
} 