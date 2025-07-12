'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  ChevronDown, 
  ChevronUp,
  Search,
  HelpCircle,
  Package,
  CreditCard,
  Truck,
  Shield,
  Camera,
  FileText
} from 'lucide-react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'

export default function SSSPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <main className="flex-1 flex flex-col items-center justify-center py-8">
        <h1 className="text-2xl font-semibold mb-6 text-primary-700">Sıkça Sorulan Sorular</h1>
        <div className="bg-white rounded-lg shadow p-8 w-full max-w-2xl space-y-4">
          <div>
            <b>Soru 1:</b> Siparişim ne zaman kargoya verilir?<br/>
            <span>Cevap: Siparişleriniz genellikle 1-3 iş günü içinde kargoya verilir.</span>
          </div>
          <div>
            <b>Soru 2:</b> Kargo takip nasıl yapılır?<br/>
            <span>Cevap: Kargo takip numaranız sipariş sonrası e-posta ile iletilir ve sitedeki Kargo Takip sayfasından da takip edebilirsiniz.</span>
          </div>
        </div>
      </main>
    </div>
  );
} 