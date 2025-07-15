'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useOrder } from '../../contexts/OrderContext'

const SIZES = ['10x15 cm','13x18 cm','15x21 cm']
const SURFACES = ['Parlak','Mat']

export default function ProductSelect(){
  const router = useRouter()
  const order = useOrder()
  const [size,setSize]=useState(SIZES[0])
  const [surface,setSurface]=useState(SURFACES[0])
  const [qty,setQty]=useState(1)

  const startOrder = ()=>{
    order.setProduct({ size, surface, quantity: qty })
    router.push('/fotograf-baskisi/upload')
  }

  return (
    <div className="max-w-lg mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">Fotoğraf Baskısı</h1>
      <div>
        <h2 className="font-semibold mb-2">Ebat</h2>
        <div className="flex flex-wrap gap-2">
          {SIZES.map(s=> (
            <button key={s} onClick={()=>setSize(s)} className={`px-4 py-2 rounded border ${size===s?'bg-green-600 text-white':'bg-white'}`}>{s}</button>
          ))}
        </div>
      </div>
      <div>
        <h2 className="font-semibold mb-2">Kâğıt Yüzeyi</h2>
        <div className="flex gap-2">
          {SURFACES.map(s=>(<button key={s} onClick={()=>setSurface(s)} className={`px-4 py-2 rounded border ${surface===s?'bg-green-600 text-white':'bg-white'}`}>{s}</button>))}
        </div>
      </div>
      <div>
        <h2 className="font-semibold mb-2">Fotoğraf Sayısı</h2>
        <input type="number" min={1} value={qty} onChange={e=>setQty(parseInt(e.target.value)||1)} className="border px-3 py-1 rounded w-24" />
      </div>
      <button onClick={startOrder} className="bg-blue-600 text-white px-6 py-2 rounded">Fotoğraf Yükle</button>
    </div>
  )
} 