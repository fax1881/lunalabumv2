'use client';

import React from 'react';

export default function KurumsalHizmetlerPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900">Kurumsal Hizmetler</h1>
        <p className="text-gray-600 mt-4">
          İşletmeniz için profesyonel baskı çözümleri
        </p>
        
        <div className="mt-8 grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Toplu Sipariş</h2>
            <p className="text-gray-600">Büyük miktarlarda baskı ihtiyaçlarınız için özel fiyat avantajları</p>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Özel Tasarım</h2>
            <p className="text-gray-600">Profesyonel tasarım ekibimizle özel projelerinizi hayata geçirin</p>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Acil Baskı</h2>
            <p className="text-gray-600">24 saat içinde acil baskı hizmetleri</p>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Kurumsal Çözümler</h2>
            <p className="text-gray-600">Şirketinize özel baskı çözümleri ve özel fiyatlandırma</p>
          </div>
        </div>
        
        <div className="mt-12 bg-white rounded-lg shadow-md p-6 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Kurumsal Çözümler İçin İletişime Geçin
          </h2>
          <p className="text-gray-600 mb-4">
            Özel projeleriniz için teklif alın
          </p>
          <div className="flex justify-center space-x-6">
            <span className="text-gray-700">📞 0850 123 45 67</span>
            <span className="text-gray-700">✉️ kurumsal@lunalabum.com</span>
          </div>
        </div>
      </div>
    </div>
  );
} 