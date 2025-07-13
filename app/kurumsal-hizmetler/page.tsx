'use client';

import React from 'react';
import { Building, Users, Clock, Shield, Award, Phone } from 'lucide-react';

export default function KurumsalHizmetlerPage() {
  const services = [
    {
      icon: Users,
      title: "Toplu Sipariş",
      description: "Büyük miktarlarda baskı ihtiyaçlarınız için özel fiyat avantajları",
      features: ["Minimum 100 adet", "Özel indirimler", "Hızlı teslimat", "Kalite garantisi"]
    },
    {
      icon: Award,
      title: "Özel Tasarım",
      description: "Profesyonel tasarım ekibimizle özel projelerinizi hayata geçirin",
      features: ["Ücretsiz tasarım", "Revizyon hakkı", "Telif hakkı güvencesi", "Marka uyumluluğu"]
    },
    {
      icon: Clock,
      title: "Acil Baskı",
      description: "24 saat içinde acil baskı hizmetleri",
      features: ["24 saat teslimat", "Öncelikli üretim", "Kaliteden ödün yok", "7/24 destek"]
    },
    {
      icon: Shield,
      title: "Kurumsal Çözümler",
      description: "Şirketinize özel baskı çözümleri ve özel fiyatlandırma",
      features: ["Kurumsal faturalama", "Kredili satış", "Özel fiyat listesi", "Hesap yöneticisi"]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center space-x-3">
            <Building className="h-8 w-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">Kurumsal Hizmetler</h1>
          </div>
          <p className="text-gray-600 mt-2">
            İşletmeniz için profesyonel baskı çözümleri
          </p>
        </div>
      </div>

      {/* Services Grid */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center space-x-3 mb-4">
                <service.icon className="h-8 w-8 text-blue-600" />
                <h2 className="text-xl font-semibold text-gray-900">{service.title}</h2>
              </div>
              <p className="text-gray-600 mb-4">{service.description}</p>
              <ul className="space-y-2">
                {service.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Contact Section */}
      <div className="bg-white border-t">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Kurumsal Çözümler İçin İletişime Geçin
            </h2>
            <p className="text-gray-600 mb-8">
              Özel projeleriniz için teklif alın
            </p>
            <div className="flex justify-center space-x-6">
              <div className="flex items-center space-x-2">
                <Phone className="h-5 w-5 text-blue-600" />
                <span className="text-gray-700">0850 123 45 67</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-gray-700">kurumsal@lunalabum.com</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 