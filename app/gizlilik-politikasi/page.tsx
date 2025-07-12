'use client';

import { motion } from 'framer-motion';
import { Shield, Eye, Lock, Users, FileText, Calendar } from 'lucide-react';

export default function PrivacyPolicyPage() {
  const sections = [
    {
      title: 'Kişisel Verilerin Toplanması',
      content: `FurkanBxy olarak, web sitemiz üzerinden aldığımız siparişler ve 
      müşteri hizmetleri süreçlerinde aşağıdaki kişisel verileri toplamaktayız:
      
      • Ad, soyad ve iletişim bilgileri
      • Sipariş geçmişi ve tercihler
      • Ödeme bilgileri (güvenli şekilde şifrelenmiş)
      • Web sitesi kullanım verileri (çerezler aracılığıyla)
      
      Bu veriler, hizmet kalitemizi artırmak ve size daha iyi bir deneyim 
      sunmak amacıyla toplanmaktadır.`,
      icon: Eye
    },
    {
      title: 'Kişisel Verilerin Kullanımı',
      content: `Topladığımız kişisel veriler aşağıdaki amaçlarla kullanılmaktadır:
      
      • Siparişlerinizin işlenmesi ve teslimi
      • Müşteri hizmetleri ve destek
      • Ürün ve hizmetlerimizin iyileştirilmesi
      • Yasal yükümlülüklerin yerine getirilmesi
      • Güvenlik ve dolandırıcılık önleme
      
      Kişisel verileriniz, açık rızanız olmadan üçüncü taraflarla paylaşılmaz.`,
      icon: Users
    },
    {
      title: 'Veri Güvenliği',
      content: `Kişisel verilerinizin güvenliği bizim için son derece önemlidir. 
      Bu nedenle aşağıdaki güvenlik önlemlerini almaktayız:
      
      • SSL şifreleme ile güvenli veri aktarımı
      • Güvenli sunucu altyapısı
      • Düzenli güvenlik güncellemeleri
      • Erişim kontrolü ve yetkilendirme
      • Veri yedekleme ve felaket kurtarma planları
      
      Tüm verileriniz Türkiye Cumhuriyeti yasalarına uygun olarak korunmaktadır.`,
      icon: Lock
    },
    {
      title: 'Çerezler (Cookies)',
      content: `Web sitemizde, kullanıcı deneyimini iyileştirmek amacıyla çerezler 
      kullanılmaktadır. Bu çerezler:
      
      • Oturum yönetimi için gerekli çerezler
      • Analitik ve performans çerezleri
      • Tercih ve ayar çerezleri
      • Pazarlama çerezleri (izin dahilinde)
      
      Tarayıcı ayarlarınızdan çerezleri devre dışı bırakabilirsiniz, ancak bu 
      durumda bazı özellikler düzgün çalışmayabilir.`,
      icon: FileText
    },
    {
      title: 'Veri Saklama Süresi',
      content: `Kişisel verileriniz, aşağıdaki süreler boyunca saklanmaktadır:
      
      • Hesap bilgileri: Hesap aktif olduğu sürece
      • Sipariş verileri: 10 yıl (yasal zorunluluk)
      • İletişim kayıtları: 3 yıl
      • Analitik veriler: 2 yıl
      
      Bu süreler sonunda verileriniz güvenli bir şekilde silinir veya anonimleştirilir.`,
      icon: Calendar
    },
    {
      title: 'Haklarınız',
      content: `KVKK kapsamında aşağıdaki haklara sahipsiniz:
      
      • Kişisel verilerinizin işlenip işlenmediğini öğrenme
      • Kişisel verileriniz işlenmişse buna ilişkin bilgi talep etme
      • Kişisel verilerinizin işlenme amacını ve bunların amacına uygun kullanılıp kullanılmadığını öğrenme
      • Yurt içinde veya yurt dışında kişisel verilerinizin aktarıldığı üçüncü kişileri bilme
      • Kişisel verilerinizin eksik veya yanlış işlenmiş olması hâlinde bunların düzeltilmesini isteme
      • Kişisel verilerinizin silinmesini veya yok edilmesini isteme
      
      Bu haklarınızı kullanmak için info@furkanbxy.com adresinden bizimle iletişime geçebilirsiniz.`,
      icon: Shield
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Gizlilik Politikası
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              Kişisel verilerinizin güvenliği bizim için önemlidir
            </p>
            <div className="flex items-center justify-center space-x-4">
              <div className="flex items-center">
                <Shield className="h-5 w-5 text-yellow-400 mr-1" />
                <span>KVKK Uyumlu</span>
              </div>
              <span>•</span>
              <span>Son güncelleme: 15 Ocak 2024</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Introduction */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-12"
            >
              <div className="bg-blue-50 rounded-xl p-8 mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                  Giriş
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  FurkanBxy olarak, kişisel verilerinizin güvenliği ve gizliliği bizim için 
                  son derece önemlidir. Bu gizlilik politikası, web sitemizi kullanırken 
                  toplanan bilgilerin nasıl kullanıldığını ve korunduğunu açıklamaktadır.
                </p>
                <p className="text-gray-700 leading-relaxed mt-4">
                  Bu politika, 6698 sayılı Kişisel Verilerin Korunması Kanunu (KVKK) 
                  kapsamında hazırlanmıştır ve web sitemizi kullandığınız sürece geçerlidir.
                </p>
              </div>
            </motion.div>

            {/* Sections */}
            <div className="space-y-12">
              {sections.map((section, index) => (
                <motion.div
                  key={section.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="bg-white rounded-xl shadow-lg p-8"
                >
                  <div className="flex items-start space-x-4 mb-6">
                    <div className="bg-blue-100 p-3 rounded-lg flex-shrink-0">
                      <section.icon className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-800 mb-2">
                        {section.title}
                      </h3>
                    </div>
                  </div>
                  <div className="text-gray-700 leading-relaxed whitespace-pre-line">
                    {section.content}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Contact */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="mt-12 bg-gray-50 rounded-xl p-8"
            >
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                İletişim
              </h3>
              <p className="text-gray-700 mb-4">
                Gizlilik politikamız hakkında sorularınız veya endişeleriniz varsa, 
                aşağıdaki iletişim bilgilerinden bizimle iletişime geçebilirsiniz:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="font-medium text-gray-800">E-posta:</p>
                  <p className="text-gray-600">info@furkanbxy.com</p>
                </div>
                <div>
                  <p className="font-medium text-gray-800">Telefon:</p>
                  <p className="text-gray-600">+90 545 673 4497</p>
                </div>
              </div>
            </motion.div>

            {/* Updates */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="mt-8 bg-yellow-50 rounded-xl p-6"
            >
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Politika Güncellemeleri
              </h3>
              <p className="text-gray-700">
                Bu gizlilik politikası, gerektiğinde güncellenebilir. Önemli değişiklikler 
                olduğunda, web sitemizde duyuru yapılacak ve gerekirse e-posta ile 
                bilgilendirme yapılacaktır.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
} 