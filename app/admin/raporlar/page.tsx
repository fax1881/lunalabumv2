'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown,
  DollarSign,
  ShoppingCart,
  Users,
  Package,
  Calendar,
  Download,
  Filter,
  ArrowLeft
} from 'lucide-react';
import Link from 'next/link';

interface SalesData {
  date: string;
  orders: number;
  revenue: number;
  customers: number;
}

interface TopProduct {
  id: number;
  name: string;
  category: string;
  sales: number;
  revenue: number;
  image: string;
}

interface TopCustomer {
  id: number;
  name: string;
  email: string;
  orders: number;
  totalSpent: number;
  lastOrder: string;
}

export default function AdminReportsPage() {
  const [dateRange, setDateRange] = useState('30');
  const [loading, setLoading] = useState(true);
  const [salesData, setSalesData] = useState<SalesData[]>([]);
  const [topProducts, setTopProducts] = useState<TopProduct[]>([]);
  const [topCustomers, setTopCustomers] = useState<TopCustomer[]>([]);
  const [summary, setSummary] = useState({
    totalRevenue: 0,
    totalOrders: 0,
    totalCustomers: 0,
    averageOrderValue: 0,
    growthRate: 0
  });

  useEffect(() => {
    fetchReportData();
  }, [dateRange]);

  const fetchReportData = async () => {
    try {
      setLoading(true);
      
      // Mock veriler - gerçek uygulamada API'den gelecek
      const mockSalesData: SalesData[] = [
        { date: '2024-01-10', orders: 12, revenue: 1450.50, customers: 8 },
        { date: '2024-01-11', orders: 15, revenue: 1890.00, customers: 12 },
        { date: '2024-01-12', orders: 8, revenue: 980.25, customers: 6 },
        { date: '2024-01-13', orders: 22, revenue: 2675.75, customers: 18 },
        { date: '2024-01-14', orders: 18, revenue: 2150.00, customers: 14 },
        { date: '2024-01-15', orders: 25, revenue: 3120.50, customers: 20 },
        { date: '2024-01-16', orders: 20, revenue: 2450.25, customers: 16 }
      ];

      const mockTopProducts: TopProduct[] = [
        {
          id: 1,
          name: 'Fotoğraf Baskısı',
          category: 'Fotoğraf Baskısı',
          sales: 45,
          revenue: 562.50,
          image: '/images/photo-print.jpg'
        },
        {
          id: 2,
          name: 'Canvas Tablo',
          category: 'Canvas Tablo',
          sales: 23,
          revenue: 4347.00,
          image: '/images/canvas.jpg'
        },
        {
          id: 3,
          name: 'Foto Takvim',
          category: 'Foto Takvim',
          sales: 18,
          revenue: 1602.00,
          image: '/images/calendar.jpg'
        },
        {
          id: 4,
          name: 'Pola Kart',
          category: 'Pola Kart',
          sales: 67,
          revenue: 368.50,
          image: '/images/polaroid.jpg'
        }
      ];

      const mockTopCustomers: TopCustomer[] = [
        {
          id: 1,
          name: 'Ahmet Yılmaz',
          email: 'ahmet@example.com',
          orders: 5,
          totalSpent: 1250.50,
          lastOrder: '2024-01-15'
        },
        {
          id: 2,
          name: 'Ayşe Demir',
          email: 'ayse@example.com',
          orders: 3,
          totalSpent: 890.00,
          lastOrder: '2024-01-14'
        },
        {
          id: 3,
          name: 'Mehmet Kaya',
          email: 'mehmet@example.com',
          orders: 4,
          totalSpent: 1567.75,
          lastOrder: '2024-01-13'
        },
        {
          id: 4,
          name: 'Fatma Özkan',
          email: 'fatma@example.com',
          orders: 2,
          totalSpent: 456.00,
          lastOrder: '2024-01-12'
        }
      ];

      const totalRevenue = mockSalesData.reduce((sum, day) => sum + day.revenue, 0);
      const totalOrders = mockSalesData.reduce((sum, day) => sum + day.orders, 0);
      const totalCustomers = mockSalesData.reduce((sum, day) => sum + day.customers, 0);
      const averageOrderValue = totalRevenue / totalOrders;

      setSalesData(mockSalesData);
      setTopProducts(mockTopProducts);
      setTopCustomers(mockTopCustomers);
      setSummary({
        totalRevenue,
        totalOrders,
        totalCustomers,
        averageOrderValue,
        growthRate: 12.5 // Mock growth rate
      });
    } catch (error) {
      console.error('Reports fetch error:', error);
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
      month: 'short',
      day: 'numeric'
    });
  };

  const exportReport = () => {
    // Mock export functionality
    console.log('Exporting report...');
    alert('Rapor indiriliyor...');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Raporlar yükleniyor...</p>
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
                  href="/admin"
                  className="inline-flex items-center text-gray-600 hover:text-gray-800 mr-4"
                >
                  <ArrowLeft className="h-4 w-4 mr-1" />
                  Admin Paneli
                </Link>
              </div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">Raporlar</h1>
              <p className="text-gray-600">Satış ve performans raporları</p>
            </div>
            <div className="mt-4 sm:mt-0 flex space-x-3">
              <button
                onClick={exportReport}
                className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                <Download className="h-4 w-4 mr-2" />
                Rapor İndir
              </button>
            </div>
          </div>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl shadow-lg p-6 mb-8"
        >
          <div className="flex items-center space-x-4">
            <Filter className="h-5 w-5 text-gray-500" />
            <span className="text-sm font-medium text-gray-700">Tarih Aralığı:</span>
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="7">Son 7 Gün</option>
              <option value="30">Son 30 Gün</option>
              <option value="90">Son 90 Gün</option>
              <option value="365">Son 1 Yıl</option>
            </select>
          </div>
        </motion.div>

        {/* Summary Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8"
        >
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Toplam Gelir</p>
                <p className="text-2xl font-bold text-gray-800">{formatCurrency(summary.totalRevenue)}</p>
                <div className="flex items-center mt-1">
                  <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
                  <span className="text-sm text-green-600">+{summary.growthRate}%</span>
                </div>
              </div>
              <div className="bg-green-100 p-3 rounded-lg">
                <DollarSign className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Toplam Sipariş</p>
                <p className="text-2xl font-bold text-gray-800">{summary.totalOrders}</p>
                <div className="flex items-center mt-1">
                  <TrendingUp className="h-4 w-4 text-blue-600 mr-1" />
                  <span className="text-sm text-blue-600">+8.2%</span>
                </div>
              </div>
              <div className="bg-blue-100 p-3 rounded-lg">
                <ShoppingCart className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Toplam Müşteri</p>
                <p className="text-2xl font-bold text-gray-800">{summary.totalCustomers}</p>
                <div className="flex items-center mt-1">
                  <TrendingUp className="h-4 w-4 text-purple-600 mr-1" />
                  <span className="text-sm text-purple-600">+15.3%</span>
                </div>
              </div>
              <div className="bg-purple-100 p-3 rounded-lg">
                <Users className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Ortalama Sipariş</p>
                <p className="text-2xl font-bold text-gray-800">{formatCurrency(summary.averageOrderValue)}</p>
                <div className="flex items-center mt-1">
                  <TrendingDown className="h-4 w-4 text-orange-600 mr-1" />
                  <span className="text-sm text-orange-600">-2.1%</span>
                </div>
              </div>
              <div className="bg-orange-100 p-3 rounded-lg">
                <Package className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Büyüme Oranı</p>
                <p className="text-2xl font-bold text-gray-800">{summary.growthRate}%</p>
                <div className="flex items-center mt-1">
                  <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
                  <span className="text-sm text-green-600">Geçen aya göre</span>
                </div>
              </div>
              <div className="bg-green-100 p-3 rounded-lg">
                <BarChart3 className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Sales Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Günlük Satışlar</h3>
            
            <div className="space-y-4">
              {salesData.map((day, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Calendar className="h-4 w-4 text-gray-500" />
                    <span className="text-sm font-medium text-gray-700">{formatDate(day.date)}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-semibold text-gray-800">{formatCurrency(day.revenue)}</div>
                    <div className="text-xs text-gray-500">{day.orders} sipariş</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Top Products */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <h3 className="text-xl font-semibold text-gray-800 mb-4">En Çok Satan Ürünler</h3>
            
            <div className="space-y-4">
              {topProducts.map((product, index) => (
                <div key={product.id} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                  <div className="w-12 h-12 bg-gray-200 rounded-lg flex-shrink-0">
                    {product.image && (
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    )}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-800">{product.name}</h4>
                    <p className="text-sm text-gray-500">{product.category}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-semibold text-gray-800">{formatCurrency(product.revenue)}</div>
                    <div className="text-xs text-gray-500">{product.sales} satış</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Top Customers */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <h3 className="text-xl font-semibold text-gray-800 mb-4">En İyi Müşteriler</h3>
            
            <div className="space-y-4">
              {topCustomers.map((customer, index) => (
                <div key={customer.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                      <Users className="h-5 w-5 text-gray-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-800">{customer.name}</h4>
                      <p className="text-sm text-gray-500">{customer.email}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-semibold text-gray-800">{formatCurrency(customer.totalSpent)}</div>
                    <div className="text-xs text-gray-500">{customer.orders} sipariş</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Category Performance */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Kategori Performansı</h3>
            
            <div className="space-y-4">
              {[
                { name: 'Fotoğraf Baskısı', revenue: 562.50, percentage: 25 },
                { name: 'Canvas Tablo', revenue: 4347.00, percentage: 45 },
                { name: 'Foto Takvim', revenue: 1602.00, percentage: 20 },
                { name: 'Pola Kart', revenue: 368.50, percentage: 10 }
              ].map((category, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium text-gray-700">{category.name}</span>
                    <span className="text-gray-600">{formatCurrency(category.revenue)}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: `${category.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
} 