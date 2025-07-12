'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowLeft,
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  ShoppingCart,
  DollarSign,
  Package,
  Edit,
  Trash2,
  Plus,
  Eye
} from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

interface Customer {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  createdAt: string;
  lastLogin: string;
  status: 'active' | 'inactive';
  totalOrders: number;
  totalSpent: number;
  averageOrderValue: number;
}

interface Order {
  id: number;
  orderNumber: string;
  date: string;
  status: string;
  total: number;
  items: number;
}

export default function AdminCustomerDetailPage() {
  const params = useParams();
  const customerId = params.id;
  
  const [loading, setLoading] = useState(true);
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    fetchCustomerData();
  }, [customerId]);

  const fetchCustomerData = async () => {
    try {
      setLoading(true);
      
      // Mock veriler - gerçek uygulamada API'den gelecek
      const mockCustomer: Customer = {
        id: Number(customerId),
        name: 'Ahmet Yılmaz',
        email: 'ahmet@example.com',
        phone: '+90 545 123 4567',
        address: 'Atatürk Mahallesi, Cumhuriyet Caddesi No:123',
        city: 'İstanbul',
        createdAt: '2024-01-15T10:30:00Z',
        lastLogin: '2024-01-20T14:45:00Z',
        status: 'active',
        totalOrders: 5,
        totalSpent: 1250.50,
        averageOrderValue: 250.10
      };

      const mockOrders: Order[] = [
        {
          id: 1,
          orderNumber: 'ORD-2024-001',
          date: '2024-01-20T14:30:00Z',
          status: 'Tamamlandı',
          total: 450.00,
          items: 3
        },
        {
          id: 2,
          orderNumber: 'ORD-2024-002',
          date: '2024-01-18T11:15:00Z',
          status: 'Kargoda',
          total: 320.50,
          items: 2
        },
        {
          id: 3,
          orderNumber: 'ORD-2024-003',
          date: '2024-01-15T09:45:00Z',
          status: 'Tamamlandı',
          total: 480.00,
          items: 4
        }
      ];

      setCustomer(mockCustomer);
      setOrders(mockOrders);
    } catch (error) {
      console.error('Customer fetch error:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('tr-TR', {
      style: 'currency',
      currency: 'TRY'
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('tr-TR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleStatusChange = async (newStatus: 'active' | 'inactive') => {
    if (!customer) return;
    
    try {
      // Mock API call
      console.log('Updating customer status:', newStatus);
      setCustomer(prev => prev ? { ...prev, status: newStatus } : null);
      alert('Müşteri durumu güncellendi!');
    } catch (error) {
      console.error('Status update error:', error);
      alert('Durum güncellenirken bir hata oluştu.');
    }
  };

  const handleDelete = async () => {
    try {
      // Mock API call
      console.log('Deleting customer:', customerId);
      alert('Müşteri silindi!');
      // Redirect to customers list
      window.location.href = '/admin/musteriler';
    } catch (error) {
      console.error('Delete error:', error);
      alert('Müşteri silinirken bir hata oluştu.');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Müşteri bilgileri yükleniyor...</p>
        </div>
      </div>
    );
  }

  if (!customer) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Müşteri bulunamadı.</p>
          <Link
            href="/admin/musteriler"
            className="inline-flex items-center mt-4 text-blue-600 hover:text-blue-700"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Müşteri Listesine Dön
          </Link>
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
              <div className="flex items-center mb-2">
                <Link
                  href="/admin/musteriler"
                  className="inline-flex items-center text-gray-600 hover:text-gray-800 mr-4"
                >
                  <ArrowLeft className="h-4 w-4 mr-1" />
                  Müşteri Listesi
                </Link>
              </div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">{customer.name}</h1>
              <p className="text-gray-600">Müşteri detayları ve sipariş geçmişi</p>
            </div>
            <div className="mt-4 sm:mt-0 flex space-x-3">
              <button
                onClick={() => setShowEditModal(true)}
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Edit className="h-4 w-4 mr-2" />
                Düzenle
              </button>
              <button
                onClick={() => setShowDeleteModal(true)}
                className="inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Sil
              </button>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Customer Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-1"
          >
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                  <User className="h-8 w-8 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-800">{customer.name}</h2>
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                    customer.status === 'active' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {customer.status === 'active' ? 'Aktif' : 'Pasif'}
                  </span>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center">
                  <Mail className="h-4 w-4 text-gray-500 mr-3" />
                  <span className="text-gray-700">{customer.email}</span>
                </div>
                
                <div className="flex items-center">
                  <Phone className="h-4 w-4 text-gray-500 mr-3" />
                  <span className="text-gray-700">{customer.phone}</span>
                </div>
                
                <div className="flex items-start">
                  <MapPin className="h-4 w-4 text-gray-500 mr-3 mt-0.5" />
                  <div>
                    <span className="text-gray-700">{customer.address}</span>
                    <br />
                    <span className="text-gray-500">{customer.city}</span>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 text-gray-500 mr-3" />
                  <span className="text-gray-700">Üye olma: {formatDate(customer.createdAt)}</span>
                </div>
                
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 text-gray-500 mr-3" />
                  <span className="text-gray-700">Son giriş: {formatDate(customer.lastLogin)}</span>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t">
                <button
                  onClick={() => handleStatusChange(customer.status === 'active' ? 'inactive' : 'active')}
                  className={`w-full px-4 py-2 rounded-lg font-medium transition-colors ${
                    customer.status === 'active'
                      ? 'bg-red-100 text-red-700 hover:bg-red-200'
                      : 'bg-green-100 text-green-700 hover:bg-green-200'
                  }`}
                >
                  {customer.status === 'active' ? 'Hesabı Pasifleştir' : 'Hesabı Aktifleştir'}
                </button>
              </div>
            </div>
          </motion.div>

          {/* Statistics and Orders */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2 space-y-6"
          >
            {/* Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Toplam Sipariş</p>
                    <p className="text-2xl font-bold text-gray-800">{customer.totalOrders}</p>
                  </div>
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <ShoppingCart className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Toplam Harcama</p>
                    <p className="text-2xl font-bold text-gray-800">{formatCurrency(customer.totalSpent)}</p>
                  </div>
                  <div className="bg-green-100 p-3 rounded-lg">
                    <DollarSign className="h-6 w-6 text-green-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Ortalama Sipariş</p>
                    <p className="text-2xl font-bold text-gray-800">{formatCurrency(customer.averageOrderValue)}</p>
                  </div>
                  <div className="bg-purple-100 p-3 rounded-lg">
                    <Package className="h-6 w-6 text-purple-600" />
                  </div>
                </div>
              </div>
            </div>

            {/* Orders */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-gray-800">Sipariş Geçmişi</h3>
                <span className="text-sm text-gray-500">{orders.length} sipariş</span>
              </div>

              {orders.length === 0 ? (
                <div className="text-center py-8">
                  <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">Henüz sipariş bulunmuyor.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {orders.map((order) => (
                    <div key={order.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                          <Package className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-800">{order.orderNumber}</h4>
                          <p className="text-sm text-gray-500">{formatDate(order.date)}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <p className="font-semibold text-gray-800">{formatCurrency(order.total)}</p>
                          <p className="text-sm text-gray-500">{order.items} ürün</p>
                        </div>
                        
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                          order.status === 'Tamamlandı' 
                            ? 'bg-green-100 text-green-800'
                            : order.status === 'Kargoda'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {order.status}
                        </span>
                        
                        <Link
                          href={`/admin/siparisler/${order.id}`}
                          className="inline-flex items-center p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        >
                          <Eye className="h-4 w-4" />
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Edit Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl p-6 w-full max-w-md mx-4"
          >
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Müşteri Düzenle</h3>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Ad Soyad</label>
                <input
                  type="text"
                  defaultValue={customer.name}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">E-posta</label>
                <input
                  type="email"
                  defaultValue={customer.email}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Telefon</label>
                <input
                  type="tel"
                  defaultValue={customer.phone}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Adres</label>
                <textarea
                  defaultValue={customer.address}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowEditModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  İptal
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Kaydet
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      {/* Delete Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl p-6 w-full max-w-md mx-4"
          >
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Müşteriyi Sil</h3>
            <p className="text-gray-600 mb-6">
              Bu müşteriyi silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.
            </p>
            <div className="flex space-x-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                İptal
              </button>
              <button
                onClick={handleDelete}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Sil
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
} 