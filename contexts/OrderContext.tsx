// @ts-nocheck
'use client'
import { createContext, useContext } from 'react'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type ProductConfig = {
  size: string
  surface: string
  quantity: number
}
export type Photo = { id: string; file?: File; preview?: string; designUrl?: string }

interface OrderState {
  product: ProductConfig | null
  photos: Photo[]
  setProduct: (p: ProductConfig) => void
  setPhoto: (idx: number, data: Partial<Photo>) => void
  reset: () => void
}

export const useOrderStore = create<OrderState>()(
  persist(
    (set, get) => ({
      product: null,
      photos: [],
      setProduct: (p) => set({ product: p, photos: Array(p.quantity).fill(null).map((_,i)=>({ id:`ph-${i}` })) }),
      setPhoto: (idx, data) => set({ photos: get().photos.map((ph,i)=> i===idx? { ...ph, ...data }: ph) }),
      reset: () => set({ product: null, photos: [] })
    }),
    { name: 'order-store' }
  )
)

export const OrderContext = createContext(null)
export const useOrder = ()=> useOrderStore() 