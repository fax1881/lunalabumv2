'use client'

import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Bir şeyler yanlış gitti!</h2>
        <p className="text-gray-600 mb-6">Beklenmeyen bir hata oluştu.</p>
        <button
          onClick={reset}
          className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded font-medium"
        >
          Tekrar dene
        </button>
      </div>
    </div>
  )
} 