"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import dynamic from 'next/dynamic';

const AdreslerBolumu = dynamic(() => import('../../components/AdreslerBolumu'), { ssr: false });

type Order = {
  id: number;
  referans: string;
  tarih: Date;
  urun: string;
  adet: number;
  kargo: string | null;
};

type User = {
  id: number;
  email: string;
  name: string;
  role: string;
};

export default function HesapPage() {
  const [activeTab, setActiveTab] = useState('siparislerim');
  const [user, setUser] = useState<User | null>(null);
  const [siparisler, setSiparisler] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    // Kullanıcı bilgilerini ve siparişleri çek
    const fetchUserData = async () => {
      try {
        const res = await fetch('/api/auth/me', {
          credentials: 'include'
        });
        
        if (res.ok) {
          const userData = await res.json();
          setUser(userData);
          
          // Siparişleri çek
          const siparisRes = await fetch('/api/siparislerim', {
            credentials: 'include'
          });
          
          if (siparisRes.ok) {
            const siparisData = await siparisRes.json();
            setSiparisler(siparisData);
          }
        } else {
          setError('Giriş yapmanız gerekiyor');
          router.push('/giris');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        setError('Bir hata oluştu');
        router.push('/giris');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [router]);

  const renderTab = () => {
    switch (activeTab) {
      case 'siparislerim':
        return (
          <div>
            <h3 className="text-lg font-semibold mb-2">Siparişlerim</h3>
            {siparisler.length === 0 ? (
              <p className="text-gray-500">Henüz siparişiniz bulunmuyor.</p>
            ) : (
              <div className="space-y-4">
                {siparisler.map((siparis) => (
                  <div key={siparis.id} className="border rounded p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium">Sipariş #{siparis.referans}</p>
                        <p className="text-sm text-gray-600">{siparis.urun}</p>
                        <p className="text-sm text-gray-500">Adet: {siparis.adet}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-600">{new Date(siparis.tarih).toLocaleDateString('tr-TR')}</p>
                        {siparis.kargo && (
                          <p className="text-sm text-blue-600">Kargo: {siparis.kargo}</p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      case 'tasarimlarim':
        return (
          <div>
            <h3 className="text-lg font-semibold mb-2">Tasarımlarım</h3>
            <p className="text-gray-500">Burada kaydedilen tasarımlarınız gözükecek.</p>
          </div>
        );
      case 'adreslerim':
        return (
          <div>
            <h3 className="text-lg font-semibold mb-2">Adreslerim</h3>
            <p className="text-gray-500">Burada adresleriniz gözükecek.</p>
          </div>
        );
      case 'bilgilerim':
        return (
          <div>
            <h3 className="text-lg font-semibold mb-2">Bilgilerim</h3>
            {user && (
              <div className="space-y-2">
                <p><strong>E-posta:</strong> {user.email}</p>
                <p><strong>Ad Soyad:</strong> {user.name}</p>
                <p><strong>Rol:</strong> {user.role}</p>
              </div>
            )}
          </div>
        );
      case 'kargo':
        return (
          <div>
            <h3 className="text-lg font-semibold mb-2">Kargo Takip</h3>
            <p className="text-gray-500">Burada kargo takip bilgileri gözükecek.</p>
          </div>
        );
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Yükleniyor...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <p className="text-red-600 mb-4">{error}</p>
            <button onClick={() => router.push('/giris')} className="bg-primary-600 text-white px-4 py-2 rounded">
              Giriş Yap
            </button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <main className="flex-1 flex flex-col items-center py-8">
        <h1 className="text-2xl font-semibold mb-6 text-primary-700">Hesabım</h1>
        <div className="w-full max-w-2xl bg-white rounded shadow p-6 mb-8">
          <div className="flex space-x-4 mb-6">
            <button onClick={() => setActiveTab('siparislerim')} className={`px-4 py-2 rounded ${activeTab === 'siparislerim' ? 'bg-primary-600 text-white' : 'bg-gray-100 text-gray-700'}`}>Siparişlerim</button>
            <button onClick={() => setActiveTab('tasarimlarim')} className={`px-4 py-2 rounded ${activeTab === 'tasarimlarim' ? 'bg-primary-600 text-white' : 'bg-gray-100 text-gray-700'}`}>Tasarımlarım</button>
            <button onClick={() => setActiveTab('adreslerim')} className={`px-4 py-2 rounded ${activeTab === 'adreslerim' ? 'bg-primary-600 text-white' : 'bg-gray-100 text-gray-700'}`}>Adreslerim</button>
            <button onClick={() => setActiveTab('bilgilerim')} className={`px-4 py-2 rounded ${activeTab === 'bilgilerim' ? 'bg-primary-600 text-white' : 'bg-gray-100 text-gray-700'}`}>Bilgilerim</button>
            <button onClick={() => setActiveTab('kargo')} className={`px-4 py-2 rounded ${activeTab === 'kargo' ? 'bg-primary-600 text-white' : 'bg-gray-100 text-gray-700'}`}>Kargo Takip</button>
          </div>
          {renderTab()}
        </div>
        <AdreslerBolumu />
      </main>
      <Footer />
    </div>
  );
} 