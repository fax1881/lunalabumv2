'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Settings, 
  Save, 
  ArrowLeft,
  Globe,
  Mail,
  Phone,
  MapPin,
  CreditCard,
  Truck,
  Shield,
  Palette,
  FileText
} from 'lucide-react';
import Link from 'next/link';

interface SiteSettings {
  // Genel Ayarlar
  siteName: string;
  siteDescription: string;
  logo: string;
  favicon: string;
  
  // İletişim Bilgileri
  contactEmail: string;
  contactPhone: string;
  contactAddress: string;
  
  // Sosyal Medya
  socialFacebook: string;
  socialInstagram: string;
  socialTwitter: string;
  socialYoutube: string;
  
  // Ödeme Ayarları
  paymentMethods: string[];
  shippingCost: number;
  freeShippingThreshold: number;
  
  // İçerik
  aboutText: string;
  privacyPolicy: string;
  termsOfService: string;
  shippingInfo: string;
  returnPolicy: string;
  
  // Sistem
  maintenanceMode: boolean;
  maintenanceMessage: string;
  googleAnalytics: string;
  facebookPixel: string;
}

export default function AdminSettingsPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState('general');
  const [settings, setSettings] = useState<SiteSettings>({
    siteName: 'FurkanBxy',
    siteDescription: 'Profesyonel fotoğraf baskı ve baskı hizmetleri',
    logo: '/images/logo.png',
    favicon: '/favicon.ico',
    contactEmail: 'info@furkanbxy.com',
    contactPhone: '+90 545 673 4497',
    contactAddress: 'İstanbul, Türkiye',
    socialFacebook: 'https://facebook.com/furkanbxy',
    socialInstagram: 'https://instagram.com/furkanbxy',
    socialTwitter: 'https://twitter.com/furkanbxy',
    socialYoutube: 'https://youtube.com/furkanbxy',
    paymentMethods: ['Kredi Kartı', 'Havale/EFT', 'Kapıda Ödeme'],
    shippingCost: 15.00,
    freeShippingThreshold: 150.00,
    aboutText: 'FurkanBxy olarak yıllardır müşterilerimize en kaliteli fotoğraf baskı hizmetlerini sunuyoruz.',
    privacyPolicy: 'Gizlilik politikamız hakkında detaylı bilgi...',
    termsOfService: 'Kullanım şartları ve koşulları...',
    shippingInfo: 'Kargo bilgileri ve teslimat süreleri...',
    returnPolicy: 'İade ve değişim politikası...',
    maintenanceMode: false,
    maintenanceMessage: 'Sitemiz bakımda, lütfen daha sonra tekrar deneyin.',
    googleAnalytics: '',
    facebookPixel: ''
  });

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      // Mock API call - gerçek uygulamada API'den gelecek
      await new Promise(resolve => setTimeout(resolve, 500));
      setLoading(false);
    } catch (error) {
      console.error('Settings fetch error:', error);
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setSettings(prev => ({
      ...prev,
      [name]: type === 'number' ? parseFloat(value) || 0 : value
    }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setSettings(prev => ({
      ...prev,
      [name]: checked
    }));
  };

  const handlePaymentMethodChange = (method: string, checked: boolean) => {
    setSettings(prev => ({
      ...prev,
      paymentMethods: checked 
        ? [...prev.paymentMethods, method]
        : prev.paymentMethods.filter(m => m !== method)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      // Mock API call - gerçek uygulamada API'ye gönderilecek
      console.log('Saving settings:', settings);
      await new Promise(resolve => setTimeout(resolve, 1000));
      alert('Ayarlar başarıyla kaydedildi!');
    } catch (error) {
      console.error('Settings save error:', error);
      alert('Ayarlar kaydedilirken bir hata oluştu.');
    } finally {
      setSaving(false);
    }
  };

  const tabs = [
    { id: 'general', name: 'Genel', icon: Globe },
    { id: 'contact', name: 'İletişim', icon: Mail },
    { id: 'payment', name: 'Ödeme', icon: CreditCard },
    { id: 'content', name: 'İçerik', icon: FileText },
    { id: 'system', name: 'Sistem', icon: Settings }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Ayarlar yükleniyor...</p>
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
              <h1 className="text-3xl font-bold text-gray-800 mb-2">Site Ayarları</h1>
              <p className="text-gray-600">Site konfigürasyonu ve genel ayarlar</p>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-1"
          >
            <div className="bg-white rounded-xl shadow-lg p-4">
              <nav className="space-y-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                      activeTab === tab.id
                        ? 'bg-blue-50 text-blue-700 border border-blue-200'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <tab.icon className="h-5 w-5" />
                    <span className="font-medium">{tab.name}</span>
                  </button>
                ))}
              </nav>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-3"
          >
            <form onSubmit={handleSubmit}>
              <div className="bg-white rounded-xl shadow-lg p-6">
                {/* General Settings */}
                {activeTab === 'general' && (
                  <div className="space-y-6">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                      <Globe className="h-5 w-5 mr-2" />
                      Genel Ayarlar
                    </h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Site Adı *
                        </label>
                        <input
                          type="text"
                          name="siteName"
                          value={settings.siteName}
                          onChange={handleInputChange}
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Site Açıklaması
                        </label>
                        <input
                          type="text"
                          name="siteDescription"
                          value={settings.siteDescription}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Logo URL
                        </label>
                        <input
                          type="url"
                          name="logo"
                          value={settings.logo}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Favicon URL
                        </label>
                        <input
                          type="url"
                          name="favicon"
                          value={settings.favicon}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Contact Settings */}
                {activeTab === 'contact' && (
                  <div className="space-y-6">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                      <Mail className="h-5 w-5 mr-2" />
                      İletişim Bilgileri
                    </h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          E-posta Adresi *
                        </label>
                        <input
                          type="email"
                          name="contactEmail"
                          value={settings.contactEmail}
                          onChange={handleInputChange}
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Telefon Numarası
                        </label>
                        <input
                          type="tel"
                          name="contactPhone"
                          value={settings.contactPhone}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Adres
                      </label>
                      <textarea
                        name="contactAddress"
                        value={settings.contactAddress}
                        onChange={handleInputChange}
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Sosyal Medya</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Facebook
                        </label>
                        <input
                          type="url"
                          name="socialFacebook"
                          value={settings.socialFacebook}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Instagram
                        </label>
                        <input
                          type="url"
                          name="socialInstagram"
                          value={settings.socialInstagram}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Twitter
                        </label>
                        <input
                          type="url"
                          name="socialTwitter"
                          value={settings.socialTwitter}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          YouTube
                        </label>
                        <input
                          type="url"
                          name="socialYoutube"
                          value={settings.socialYoutube}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Payment Settings */}
                {activeTab === 'payment' && (
                  <div className="space-y-6">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                      <CreditCard className="h-5 w-5 mr-2" />
                      Ödeme ve Kargo Ayarları
                    </h2>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">
                        Ödeme Yöntemleri
                      </label>
                      <div className="space-y-2">
                        {['Kredi Kartı', 'Havale/EFT', 'Kapıda Ödeme', 'PayPal'].map((method) => (
                          <label key={method} className="flex items-center">
                            <input
                              type="checkbox"
                              checked={settings.paymentMethods.includes(method)}
                              onChange={(e) => handlePaymentMethodChange(method, e.target.checked)}
                              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                            />
                            <span className="ml-2 text-sm text-gray-700">{method}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Kargo Ücreti (₺)
                        </label>
                        <input
                          type="number"
                          name="shippingCost"
                          value={settings.shippingCost}
                          onChange={handleInputChange}
                          min="0"
                          step="0.01"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Ücretsiz Kargo Limiti (₺)
                        </label>
                        <input
                          type="number"
                          name="freeShippingThreshold"
                          value={settings.freeShippingThreshold}
                          onChange={handleInputChange}
                          min="0"
                          step="0.01"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Content Settings */}
                {activeTab === 'content' && (
                  <div className="space-y-6">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                      <FileText className="h-5 w-5 mr-2" />
                      İçerik Ayarları
                    </h2>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Hakkımızda Metni
                      </label>
                      <textarea
                        name="aboutText"
                        value={settings.aboutText}
                        onChange={handleInputChange}
                        rows={4}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Gizlilik Politikası
                      </label>
                      <textarea
                        name="privacyPolicy"
                        value={settings.privacyPolicy}
                        onChange={handleInputChange}
                        rows={4}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Kullanım Şartları
                      </label>
                      <textarea
                        name="termsOfService"
                        value={settings.termsOfService}
                        onChange={handleInputChange}
                        rows={4}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Kargo Bilgileri
                      </label>
                      <textarea
                        name="shippingInfo"
                        value={settings.shippingInfo}
                        onChange={handleInputChange}
                        rows={4}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        İade Politikası
                      </label>
                      <textarea
                        name="returnPolicy"
                        value={settings.returnPolicy}
                        onChange={handleInputChange}
                        rows={4}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                )}

                {/* System Settings */}
                {activeTab === 'system' && (
                  <div className="space-y-6">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                      <Settings className="h-5 w-5 mr-2" />
                      Sistem Ayarları
                    </h2>
                    
                    <div className="space-y-4">
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          name="maintenanceMode"
                          checked={settings.maintenanceMode}
                          onChange={handleCheckboxChange}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <label className="ml-2 text-sm text-gray-700">
                          Bakım Modu Aktif
                        </label>
                      </div>
                      
                      {settings.maintenanceMode && (
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Bakım Modu Mesajı
                          </label>
                          <textarea
                            name="maintenanceMessage"
                            value={settings.maintenanceMessage}
                            onChange={handleInputChange}
                            rows={3}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                      )}
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Google Analytics Kodu
                        </label>
                        <textarea
                          name="googleAnalytics"
                          value={settings.googleAnalytics}
                          onChange={handleInputChange}
                          rows={3}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="G-XXXXXXXXXX"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Facebook Pixel Kodu
                        </label>
                        <textarea
                          name="facebookPixel"
                          value={settings.facebookPixel}
                          onChange={handleInputChange}
                          rows={3}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="XXXXXXXXXX"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Submit Button */}
                <div className="flex justify-end pt-6 border-t mt-8">
                  <button
                    type="submit"
                    disabled={saving}
                    className="inline-flex items-center px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {saving ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Kaydediliyor...
                      </>
                    ) : (
                      <>
                        <Save className="h-4 w-4 mr-2" />
                        Ayarları Kaydet
                      </>
                    )}
                  </button>
                </div>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
} 