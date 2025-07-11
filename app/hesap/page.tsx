import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { useState, useEffect } from 'react';

const JWT_SECRET = process.env.JWT_SECRET || 'gizliAnahtar';
const prisma = new PrismaClient();

export default async function HesapPage() {
  // Cookie'den token'ı al
  const cookieStore = cookies();
  const token = cookieStore.get('token')?.value;
  if (!token) redirect('/giris');

  let userData;
  try {
    userData = jwt.verify(token, JWT_SECRET);
  } catch {
    redirect('/giris');
  }

  // Kullanıcıyı veritabanından çek
  const user = await prisma.user.findUnique({ where: { id: userData.id } });
  if (!user) redirect('/giris');

  // Kullanıcının siparişlerini çek
  const siparisler = await prisma.order.findMany({ where: { referans: user.email }, orderBy: { tarih: 'desc' } });

  // Adresler client-side çekilecek
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <main className="flex-1 flex flex-col items-center py-8">
        <h1 className="text-2xl font-semibold mb-6 text-primary-700">Hesabım</h1>
        <div className="mb-6 text-center">
          <div className="text-lg font-medium">{user.name}</div>
          <div className="text-gray-500">{user.email}</div>
        </div>
        <div className="w-full max-w-2xl bg-white rounded shadow p-6 min-h-[200px] mb-8">
          <h2 className="text-lg font-semibold mb-4">Siparişlerim</h2>
          {siparisler.length === 0 ? (
            <p className="text-gray-500">Henüz siparişiniz yok.</p>
          ) : (
            <ul className="space-y-4">
              {siparisler.map((s) => (
                <li key={s.id} className="border rounded p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                  <div>
                    <div className="font-medium">Sipariş #{s.referans}</div>
                    <div className="text-sm text-gray-600">Tarih: {new Date(s.tarih).toLocaleString('tr-TR')}</div>
                    <div className="text-sm text-gray-600">Ürün: {s.urun}</div>
                    <div className="text-sm text-gray-600">Adet: {s.adet}</div>
                  </div>
                  <div>
                    <div className="text-sm">Referans No: <span className="font-mono">{s.referans}</span></div>
                    <div className="text-sm">Kargo Takip: <span className="font-mono">{s.kargo || '-'}</span></div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
        {/* Adresler Bölümü */}
        <AdreslerBolumu />
      </main>
      <Footer />
    </div>
  );
}

function AdreslerBolumu() {
  const [adresler, setAdresler] = useState<any[]>([]);
  const [form, setForm] = useState({ ad: '', adres: '', il: '', ilce: '', posta: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetch('/api/adresler')
      .then(res => res.json())
      .then(data => {
        setAdresler(data);
        setLoading(false);
      });
  }, []);

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      const res = await fetch('/api/adresler', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      if (res.ok) {
        const yeni = await res.json();
        setAdresler([...adresler, yeni]);
        setForm({ ad: '', adres: '', il: '', ilce: '', posta: '' });
        setSuccess('Adres eklendi!');
      } else {
        const data = await res.json();
        setError(data.error || 'Adres eklenemedi.');
      }
    } catch {
      setError('Sunucu hatası.');
    }
  };

  const handleDelete = async (id: number) => {
    setError('');
    setSuccess('');
    try {
      const res = await fetch(`/api/adresler?id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        setAdresler(adresler.filter(a => a.id !== id));
        setSuccess('Adres silindi!');
      } else {
        const data = await res.json();
        setError(data.error || 'Adres silinemedi.');
      }
    } catch {
      setError('Sunucu hatası.');
    }
  };

  return (
    <div className="w-full max-w-2xl bg-white rounded shadow p-6 min-h-[200px] mb-8">
      <h2 className="text-lg font-semibold mb-4">Adreslerim</h2>
      {loading ? (
        <p className="text-gray-500">Yükleniyor...</p>
      ) : adresler.length === 0 ? (
        <p className="text-gray-500">Henüz adres eklenmedi.</p>
      ) : (
        <ul className="mb-6">
          {adresler.map((a, idx) => (
            <li key={a.id} className="mb-2 border-b pb-2 flex justify-between items-center">
              <div>
                <div className="font-medium">{a.ad}</div>
                <div className="text-sm text-gray-600">{a.adres}, {a.ilce}/{a.il} ({a.posta})</div>
              </div>
              <button onClick={() => handleDelete(a.id)} className="text-red-500 hover:underline text-sm">Sil</button>
            </li>
          ))}
        </ul>
      )}
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-2">
        <input name="ad" value={form.ad} onChange={handleChange} placeholder="Adres Adı (Ev, Ofis vb.)" className="border rounded px-3 py-2" required />
        <input name="adres" value={form.adres} onChange={handleChange} placeholder="Adres" className="border rounded px-3 py-2" required />
        <input name="il" value={form.il} onChange={handleChange} placeholder="İl" className="border rounded px-3 py-2" required />
        <input name="ilce" value={form.ilce} onChange={handleChange} placeholder="İlçe" className="border rounded px-3 py-2" required />
        <input name="posta" value={form.posta} onChange={handleChange} placeholder="Posta Kodu" className="border rounded px-3 py-2" required />
        <button type="submit" className="bg-primary-600 hover:bg-primary-700 text-white rounded px-4 py-2 col-span-1 md:col-span-2 font-medium">
          Adres Ekle
        </button>
      </form>
      {error && <div className="text-red-500 mt-2">{error}</div>}
      {success && <div className="text-green-600 mt-2">{success}</div>}
    </div>
  );
} 