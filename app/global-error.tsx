'use client'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html>
      <body>
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Kritik Hata!</h2>
            <p className="text-gray-600 mb-6">Uygulama başlatılırken bir hata oluştu.</p>
            <button
              onClick={reset}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded font-medium"
            >
              Tekrar dene
            </button>
          </div>
        </div>
      </body>
    </html>
  )
} 