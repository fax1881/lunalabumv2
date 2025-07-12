"use client";

import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { Trash2, Plus, Minus, ShoppingCart, CheckCircle, AlertCircle } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import { useRouter } from "next/navigation";

interface CartItem {
  id: number;
  productId: number;
  quantity: number;
  size?: string;
  price: number;
  product?: {
    id: number;
    name: string;
    image?: string;
  };
}

export default function SepetPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    // Wait for auth to load before checking user
    if (authLoading) return;
    
    if (!user) {
      router.push('/giris');
      return;
    }
    fetchCart();
  }, [user, authLoading, router]);

  // Sepeti getir
  const fetchCart = async () => {
    if (!user) return;
    
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/cart");
      if (res.status === 401) {
        router.push('/giris');
        return;
      }
      const data = await res.json();
      setCart(data);
    } catch (e) {
      setError("Sepet yüklenemedi.");
    }
    setLoading(false);
  };

  // Miktar güncelle
  const updateQuantity = async (cartItemId: number, quantity: number) => {
    if (quantity < 1) return;
    try {
      const res = await fetch("/api/cart", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cartItemId, quantity }),
      });
      if (res.ok) {
        fetchCart();
      } else {
        setError("Miktar güncellenemedi.");
      }
    } catch (e) {
      setError("Miktar güncellenemedi.");
    }
  };

  // Ürün sil
  const removeItem = async (cartItemId: number) => {
    try {
      const res = await fetch("/api/cart", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cartItemId }),
      });
      if (res.ok) {
        fetchCart();
      } else {
        setError("Ürün silinemedi.");
      }
    } catch (e) {
      setError("Ürün silinemedi.");
    }
  };

  // Siparişi tamamla
  const completeOrder = async () => {
    setError("");
    setOrderSuccess(false);
    try {
      const adres = "Kullanıcı adresi"; // Gerçek adresi burada al
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ adres }),
      });
      if (res.ok) {
        setOrderSuccess(true);
        fetchCart();
      } else {
        const data = await res.json();
        setError(data.error || "Sipariş oluşturulamadı.");
      }
    } catch (e) {
      setError("Sipariş oluşturulamadı.");
    }
  };

  // Show loading state while auth is being checked
  if (authLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Yükleniyor...</p>
        </div>
      </div>
    );
  }

  // Redirect if not authenticated
  if (!user) {
    return null;
  }

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="container mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold mb-8 flex items-center gap-2">
          <ShoppingCart className="text-green-600" /> Sepetim
        </h1>
        {loading ? (
          <div className="text-center text-gray-500">Yükleniyor...</div>
        ) : cart.length === 0 ? (
          <div className="text-center py-12">
            <ShoppingCart className="mx-auto h-16 w-16 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Sepetiniz boş</h3>
            <p className="text-gray-500 mb-6">Alışverişe başlamak için ürünlerimize göz atın.</p>
            <button
              onClick={() => router.push('/urunler')}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Ürünlere Git
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded-lg shadow">
              <thead>
                <tr className="bg-green-100 text-green-800">
                  <th className="py-3 px-4 text-left">Ürün</th>
                  <th className="py-3 px-4">Fiyat</th>
                  <th className="py-3 px-4">Adet</th>
                  <th className="py-3 px-4">Toplam</th>
                  <th className="py-3 px-4">Sil</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item) => (
                  <tr key={item.id} className="border-b">
                    <td className="py-3 px-4 flex items-center gap-3">
                      {item.product?.image && (
                        <img src={item.product.image} alt={item.product.name} className="w-12 h-12 rounded object-cover" />
                      )}
                      <div>
                        <div className="font-semibold">{item.product?.name}</div>
                        {item.size && <div className="text-xs text-gray-500">Boyut: {item.size}</div>}
                      </div>
                    </td>
                    <td className="py-3 px-4 text-center">{item.price}₺</td>
                    <td className="py-3 px-4 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          className="p-1 rounded bg-gray-100 hover:bg-gray-200"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          <Minus size={16} />
                        </button>
                        <span className="px-2">{item.quantity}</span>
                        <button
                          className="p-1 rounded bg-gray-100 hover:bg-gray-200"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-center font-semibold">{(item.price * item.quantity).toFixed(2)}₺</td>
                    <td className="py-3 px-4 text-center">
                      <button
                        className="p-2 rounded bg-red-100 hover:bg-red-200"
                        onClick={() => removeItem(item.id)}
                      >
                        <Trash2 size={18} className="text-red-600" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="flex justify-end mt-6">
              <div className="bg-green-50 rounded-lg p-6 w-full max-w-xs">
                <div className="flex justify-between mb-2">
                  <span className="font-medium">Ara Toplam</span>
                  <span>{total.toFixed(2)}₺</span>
                </div>
                <div className="flex justify-between mb-4">
                  <span className="font-medium">Kargo</span>
                  <span>Ücretsiz</span>
                </div>
                <div className="flex justify-between text-lg font-bold mb-4">
                  <span>Genel Toplam</span>
                  <span>{total.toFixed(2)}₺</span>
                </div>
                <button
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
                  onClick={completeOrder}
                  disabled={cart.length === 0}
                >
                  <CheckCircle size={20} /> Siparişi Tamamla
                </button>
                {orderSuccess && (
                  <div className="mt-4 text-green-700 text-center font-semibold flex items-center justify-center gap-2">
                    <CheckCircle size={16} />
                    Siparişiniz başarıyla oluşturuldu!
                  </div>
                )}
                {error && (
                  <div className="mt-4 text-red-600 text-center font-semibold flex items-center justify-center gap-2">
                    <AlertCircle size={16} />
                    {error}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
} 