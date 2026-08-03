'use client'

import { useEffect } from 'react'
import { useCart } from '@/lib/cartContext'

export default function ClearCart() {
  const { clearCart } = useCart()

  useEffect(() => {
    clearCart()
    sessionStorage.removeItem('dropyard-cart')
  }, [])

  return null
}
