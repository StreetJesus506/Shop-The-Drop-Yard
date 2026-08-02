'use client'

import { createContext, useContext, useState, useEffect } from 'react'

const CartContext = createContext(null)

export function CartProvider({ children }) {
  const [items, setItems] = useState([])
  const [isOpen, setIsOpen] = useState(false)
  const [loaded, setLoaded] = useState(false)

  // Load cart from sessionStorage on mount
  useEffect(() => {
    try {
      const saved = sessionStorage.getItem('dropyard-cart')
      if (saved) setItems(JSON.parse(saved))
    } catch {}
    setLoaded(true)
  }, [])

  // Save cart to sessionStorage whenever it changes
  useEffect(() => {
    if (!loaded) return
    try {
      sessionStorage.setItem('dropyard-cart', JSON.stringify(items))
    } catch {}
  }, [items, loaded])

  const addItem = (product, variant, quantity = 1) => {
    setItems(prev => {
      const existing = prev.find(i => i.variantId === variant.id)
      if (existing) {
        return prev.map(i =>
          i.variantId === variant.id
            ? { ...i, quantity: i.quantity + quantity }
            : i
        )
      }
      return [...prev, {
        productId: product.id,
        shopId: product.shopId,
        variantId: variant.id,
        title: product.title,
        variantTitle: variant.title,
        price: variant.price,
        image: product.images?.[0]?.src || null,
        quantity,
      }]
    })
    setIsOpen(true)
  }

  const removeItem = (variantId) => {
    setItems(prev => prev.filter(i => i.variantId !== variantId))
  }

  const updateQuantity = (variantId, quantity) => {
    if (quantity < 1) return removeItem(variantId)
    setItems(prev =>
      prev.map(i => i.variantId === variantId ? { ...i, quantity } : i)
    )
  }

  const clearCart = () => setItems([])

  const total = items.reduce((sum, i) => sum + (i.price * i.quantity), 0)
  const count = items.reduce((sum, i) => sum + i.quantity, 0)

  return (
    <CartContext.Provider value={{
      items, addItem, removeItem, updateQuantity,
      clearCart, total, count, isOpen, setIsOpen
    }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
