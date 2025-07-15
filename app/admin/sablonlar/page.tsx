'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

interface Template {
  id: number
  name: string
  category: string
  thumbnail: string | null
  width: number
  height: number
}

export default function TemplatesAdminPage() {
  const [templates, setTemplates] = useState<Template[]>([])
  const [loading, setLoading] = useState(true)
  const [category, setCategory] = useState('')

  useEffect(() => {
    fetchTemplates()
  }, [category])

  const fetchTemplates = async () => {
    try {
      setLoading(true)
      const url = category ? `/api/templates?category=${encodeURIComponent(category)}` : '/api/templates'
      const res = await fetch(url)
      if (res.ok) {
        setTemplates(await res.json())
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <h1 className="text-2xl font-bold mb-4">Şablonlar</h1>
      <div className="flex items-center gap-4 mb-6">
        <input
          className="border px-3 py-2 rounded"
          placeholder="Kategori filtresi"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <Link href="/admin/sablonlar/new" className="bg-blue-600 text-white px-4 py-2 rounded">
          Yeni Şablon
        </Link>
      </div>
      {loading ? (
        <p>Yükleniyor...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {templates.map((t) => (
            <div key={t.id} className="bg-white rounded shadow p-4">
              {t.thumbnail ? (
                <img src={t.thumbnail} alt={t.name} className="w-full h-40 object-cover mb-2" />
              ) : (
                <div className="w-full h-40 bg-gray-200 flex items-center justify-center mb-2 text-sm text-gray-500">
                  Önizleme yok
                </div>
              )}
              <h3 className="font-semibold">{t.name}</h3>
              <p className="text-sm text-gray-500">{t.category}</p>
              <Link href={`/admin/sablonlar/${t.id}/edit`} className="text-blue-600 text-sm mt-2 inline-block">
                Düzenle
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  )
} 