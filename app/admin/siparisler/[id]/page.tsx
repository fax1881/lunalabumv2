'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  Edit, 
  Truck, 
  CheckCircle,
  Package,
  User,
  Calendar,
  DollarSign,
  MapPin,
  Phone,
  Mail,
  Printer
} from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

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
    description: string;
  };
}

interface Order {
  id: number;
  orderNumber: string;
  userId: number;
  user: {
    name: string;
    email: string;
    phone?: string;
  };
  adres: string;
  totalAmount: number;
  status: string;
  createdAt: string;
  updatedAt: string;
  orderItems: OrderItem[];
  notes?: string;
}

export default function AdminOrderDetailPage() {
  const params = useParams();
  const orderId = params.id;
  
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState('');

  useEffect(() => {
    if (orderId) {
      fetchOrderDetails();
    }
  }, [orderId]);

  const fetchOrderDetails = async () => {
    try {
      // Mock veriler - gerçek uygulamada API'den gelecek
      const mockOrder: Order = {
        id: 1,
        orderNumber: 'ORD-1703123456789',
        userId: 1,
        user: {
          name: 'Ahmet Yılmaz',
          email: 'ahmet@example.com',
          phone: '+90 545 123 4567'
        },
        adres: 'İstanbul, Kadıköy, Örnek Mahallesi No:123, Daire:5, Posta Kodu: 34700',
        totalAmount: 245.50,
        status: 'Hazırlanıyor',
        createdAt: '2024-01-15T10:30:00Z',
        updatedAt: '2024-01-15T14:45:00Z',
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
              image: '/images/photo-print.jpg',
              description: 'Yüksek kaliteli fotoğraf baskısı'
            }
          },
          {
            id: 2,
            productId: 2,
            quantity: 1,
            size: '20x30',
            price: 189.00,
            product: {
              id: 2,
              name: 'Canvas Tablo',
              image: '/images/canvas.jpg',
              description: 'Profesyonel canvas tablo'
            }
          }
        ],
        notes: 'Müşteri özel istek: Fotoğrafların kenarlarında beyaz boşluk bırakılmasın.'
      };
      
      setOrder(mockOrder);
      setSelectedStatus(mockOrder.status);
    } catch (error) {
      console.error('Order fetch error:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (newStatus: string) => {
    try {
      // Mock API call - gerçek uygulamada API'ye gönderilecek
      if (order) {
        setOrder({
          ...order,
          status: newStatus,
          updatedAt: new Date().toISOString()
        });
      }
      setShowStatusModal(false);
    } catch (error) {
      console.error('Status update error:', error);
    }
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
        return <Package className="h-5 w-5" />;
      case 'Kargoda':
        return <Truck className="h-5 w-5" />;
      case 'Teslim Edildi':
        return <CheckCircle className="h-5 w-5" />;
      default:
        return <Package className="h-5 w-5" />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Sipariş detayları yükleniyor...</p>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Package className="h-16 w-16 text-red-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-600 mb-2">Sipariş bulunamadı</h3>
          <p className="text-gray-500 mb-6">Belirtilen sipariş mevcut değil.</p>
          <Link
            href="/admin/siparisler"
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Siparişlere Dön
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
                  href="/admin/siparisler"
                  className="inline-flex items-center text-gray-600 hover:text-gray-800 mr-4"
                >
                  <ArrowLeft className="h-4 w-4 mr-1" />
                  Siparişlere Dön
                </Link>
              </div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                Sipariş #{order.orderNumber}
              </h1>
              <p className="text-gray-600">Sipariş detayları ve yönetimi</p>
            </div>
            <div className="mt-4 sm:mt-0 flex space-x-3">
              <button
                onClick={() => setShowStatusModal(true)}
                className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                <Edit className="h-4 w-4 mr-2" />
                Durum Güncelle
              </button>
              <button className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                <Printer className="h-4 w-4 mr-2" />
                Yazdır
              </button>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Order Details */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-2 space-y-6"
          >
            {/* Order Header */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                  <div>
                    <h2 className="text-2xl font-bold mb-2">Sipariş Bilgileri</h2>
                    <div className="flex items-center text-sm opacity-90">
                      <Calendar className="h-4 w-4 mr-2" />
                      {formatDate(order.createdAt)}
                    </div>
                  </div>
                  <div className="mt-4 lg:mt-0 text-center lg:text-right">
                    <div className="text-3xl font-bold mb-2">
                      ₺{order.totalAmount.toFixed(2)}
                    </div>
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                      {getStatusIcon(order.status)}
                      <span className="ml-2">{order.status}</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Order Items */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Sipariş Ürünleri</h3>
              
              <div className="space-y-4">
                {order.orderItems.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + index * 0.1 }}
                    className="flex items-start space-x-4 p-4 border border-gray-200 rounded-lg"
                  >
                    <div className="w-20 h-20 bg-gray-200 rounded-lg flex-shrink-0">
                      {item.product.image && (
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-full h-full object-cover rounded-lg"
                        />
                      )}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-800 text-lg mb-2">{item.product.name}</h4>
                      <p className="text-gray-600 text-sm mb-3">{item.product.description}</p>
                      <div className="flex items-center justify-between">
                        <div className="text-sm text-gray-500">
                          <span className="font-medium">Adet:</span> {item.quantity} • 
                          <span className="font-medium ml-2">Boyut:</span> {item.size}
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-gray-800 text-lg">
                            ₺{(item.price * item.quantity).toFixed(2)}
                          </div>
                          <div className="text-sm text-gray-500">
                            ₺{item.price.toFixed(2)} / adet
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Notes */}
            {order.notes && (
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Özel Notlar</h3>
                <p className="text-gray-700 bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-400">
                  {order.notes}
                </p>
              </div>
            )}
          </motion.div>

          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            {/* Customer Info */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Müşteri Bilgileri</h3>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <User className="h-5 w-5 text-gray-500" />
                  <div>
                    <p className="font-medium text-gray-800">{order.user.name}</p>
                    <p className="text-sm text-gray-600">{order.user.email}</p>
                  </div>
                </div>
                
                {order.user.phone && (
                  <div className="flex items-center space-x-3">
                    <Phone className="h-5 w-5 text-gray-500" />
                    <span className="text-gray-700">{order.user.phone}</span>
                  </div>
                )}
                
                <div className="flex items-start space-x-3">
                  <MapPin className="h-5 w-5 text-gray-500 mt-0.5" />
                  <p className="text-gray-700 text-sm">{order.adres}</p>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Sipariş Özeti</h3>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Toplam Ürün:</span>
                  <span className="font-medium">{order.orderItems.length} adet</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Ara Toplam:</span>
                  <span className="font-medium">₺{order.totalAmount.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Kargo:</span>
                  <span className="font-medium text-green-600">Ücretsiz</span>
                </div>
                
                <div className="border-t pt-3">
                  <div className="flex justify-between">
                    <span className="text-lg font-bold text-gray-800">Toplam:</span>
                    <span className="text-lg font-bold text-gray-800">₺{order.totalAmount.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Order Timeline */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Sipariş Geçmişi</h3>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full mt-2"></div>
                  <div>
                    <p className="font-medium text-gray-800">Sipariş Oluşturuldu</p>
                    <p className="text-sm text-gray-600">{formatDate(order.createdAt)}</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-3 h-3 bg-blue-500 rounded-full mt-2"></div>
                  <div>
                    <p className="font-medium text-gray-800">Son Güncelleme</p>
                    <p className="text-sm text-gray-600">{formatDate(order.updatedAt)}</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Status Update Modal */}
      {showStatusModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl p-6 w-full max-w-md mx-4"
          >
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Sipariş Durumu Güncelle
            </h3>
            <p className="text-gray-600 mb-6">
              <strong>{order.orderNumber}</strong> siparişinin durumunu güncelleyin
            </p>
            
            <div className="space-y-2 mb-6">
              {['Hazırlanıyor', 'Kargoda', 'Teslim Edildi'].map((status) => (
                <button
                  key={status}
                  onClick={() => updateOrderStatus(status)}
                  className={`w-full text-left px-4 py-3 rounded-lg border transition-colors ${
                    selectedStatus === status
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
                onClick={() => setShowStatusModal(false)}
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