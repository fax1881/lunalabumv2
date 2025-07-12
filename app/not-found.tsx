import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-6xl font-bold text-gray-900 mb-4">404</h2>
        <h3 className="text-2xl font-semibold text-gray-700 mb-4">Sayfa Bulunamadı</h3>
        <p className="text-gray-600 mb-6">Aradığınız sayfa mevcut değil.</p>
        <Link 
          href="/"
          className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded font-medium"
        >
          Ana Sayfaya Dön
        </Link>
      </div>
    </div>
  )
} 