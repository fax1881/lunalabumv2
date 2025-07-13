'use client';

import React from 'react';
import { Palette, Zap, Users, Award, Clock, CheckCircle } from 'lucide-react';

export default function OzelTasarimPage() {
  const services = [
    {
      title: "Logo Tasarımı",
      description: "Markanızı yansıtan özel logo tasarımları",
      price: "₺299",
      duration: "3-5 gün"
    },
    {
      title: "Kurumsal Kimlik",
      description: "Kartvizit, antetli kağıt, mühür tasarımı",
      price: "₺599", 
      duration: "5-7 gün"
    },
    {
      title: "Poster & Afiş",
      description: "Etkinlik ve reklam afişleri",
      price: "₺199",
      duration: "2-3 gün"
    },
    {
      title: "Katalog Tasarımı",
      description: "Ürün katalogları ve broşürler",
      price: "₺799",
      duration: "7-10 gün"
    }
  ];

  const process = [
    {
      step: 1,
      title: "Proje Briefi",
      description: "İhtiyaçlarınızı detaylandırıyoruz"
    },
    {
      step: 2, 
      title: "Tasarım Süreci",
      description: "Profesyonel tasarımcılarımız çalışıyor"
    },
    {
      step: 3,
      title: "Revizyon",
      description: "3 kez ücretsiz revizyon hakkı"
    },
    {
      step: 4,
      title: "Teslim",
      description: "Yüksek çözünürlükte dosya teslimi"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <Palette className="h-16 w-16 mx-auto mb-4" />
            <h1 className="text-4xl font-bold mb-4">Özel Tasarım Hizmetleri</h1>
            <p className="text-xl opacity-90 max-w-2xl mx-auto">
              Profesyonel tasarımcılarımızla hayalinizdeki projeleri gerçeğe dönüştürün
            </p>
          </div>
        </div>
      </div>

      {/* Services */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Tasarım Hizmetlerimiz</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-lg font-semibold mb-2">{service.title}</h3>
              <p className="text-gray-600 text-sm mb-4">{service.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-2xl font-bold text-blue-600">{service.price}</span>
                <span className="text-sm text-gray-500">{service.duration}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Process */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Tasarım Süreci</h2>
          <div className="grid md:grid-cols-4 gap-8">
            {process.map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6">Neden Bizi Seçmelisiniz?</h2>
            <div className="space-y-4">
              {[
                "10+ yıl profesyonel deneyim",
                "500+ başarılı proje",
                "3 kez ücretsiz revizyon",
                "Telif hakkı güvencesi",
                "Hızlı teslimat",
                "7/24 müşteri desteği"
              ].map((feature, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-gray-700">{feature}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">Ücretsiz Danışmanlık</h3>
            <p className="mb-6">Projenizi görüşmek için randevu alın</p>
            <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Hemen İletişime Geç
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 