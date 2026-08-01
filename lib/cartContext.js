'use client'

import { createContext, useContext, useState } from 'react'

const CartContext = createContext(null)

export function CartProvider({ children }) {
  const [items, setItems] = useState([])
  const [isOpen, setIsOpen] = useState(false)

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
