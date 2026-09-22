'use client'

import { useCart } from '@/lib/cartContext'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

export default function Cart() {
  const { items, removeItem, updateQuantity, total, isOpen, setIsOpen, clearCart } = useCart()

  const handleCheckout = async () => {
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items }),
      })
      const data = await res.json()
      if (data.url) {
        window.location.href = data.url
      } else {
        alert('Checkout error: ' + JSON.stringify(data))
      }
    } catch (err) {
      alert('Checkout failed: ' + err.message)
    }
  }

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              style={{
                position: 'fixed', inset: 0,
                background: 'rgba(0,0,0,0.6)',
                zIndex: 90,
              }}
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              style={{
                position: 'fixed', top: 0, right: 0,
                width: 'min(420px, 100vw)',
                height: '100vh',
                background: '#1c1b19',
                color: '#f4f1ea',
                zIndex: 100,
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              {/* Header */}
              <div style={{
                display: 'flex', justifyContent: 'space-between',
                alignItems: 'center', padding: '20px 24px',
                borderBottom: '1px solid rgba(244,241,234,0.1)',
              }}>
                <span style={{
                  fontFamily: 'Big Shoulders Stencil, sans-serif',
                  fontSize: '20px', fontWeight: 700,
                  textTransform: 'uppercase', letterSpacing: '1px',
                }}>
                  YOUR CART ({items.reduce((s, i) => s + i.quantity, 0)})
                </span>
                <button
                  onClick={() => setIsOpen(false)}
                  aria-label="Close Shopping Cart"
                  style={{
                    background: 'none', border: 'none',
                    color: '#f4f1ea', fontSize: '24px',
                    cursor: 'pointer', padding: '4px',
                  }}
                >
                  ×
                </button>
              </div>

              {/* Items */}
              <div style={{ flex: 1, overflowY: 'auto', padding: '16px 24px' }}>
                {items.length === 0 && (
                  <div style={{ padding: '40px 0', textAlign: 'center' }}>
                    <p style={{
                      fontFamily: 'Space Mono, monospace',
                      fontSize: '13px', color: '#a3a39c',
                      margin: '0 0 40px 0',
                    }}>
                      YOUR CART IS EMPTY
                    </p>
                    
                    {/* Navigation Links inside Drawer */}
                    <div style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '12px',
                      alignItems: 'center',
                      borderTop: '1px solid rgba(244,241,234,0.05)',
                      paddingTop: '32px'
                    }}>
                      <Link 
                        href="/about" 
                        onClick={() => setIsOpen(false)}
                        style={{
                          fontFamily: 'Space Mono, monospace',
                          fontSize: '12px',
                          color: '#f4f1ea',
                          textDecoration: 'none',
                          letterSpacing: '1px',
                          padding: '14px 24px',
                          display: 'block',
                          width: '80%',
                          border: '1px solid rgba(244,241,234,0.1)',
                          textAlign: 'center'
                        }}
                      >
                        ABOUT / CONTACT
                      </Link>
                      <Link 
                        href="/subscribe" 
                        onClick={() => setIsOpen(false)}
                        style={{
                          fontFamily: 'Space Mono, monospace',
                          fontSize: '12px',
                          color: '#f4f1ea',
                          textDecoration: 'none',
                          letterSpacing: '1px',
                          padding: '14px 24px',
                          display: 'block',
                          width: '80%',
                          border: '1px solid rgba(244,241,234,0.1)',
                          textAlign: 'center'
                        }}
                      >
                        JOIN THE YARD
                      </Link>
                    </div>
                  </div>
                )}
                {items.map(item => (
                  <div key={item.variantId} style={{
                    display: 'flex', gap: '16px',
                    padding: '16px 0',
                    borderBottom: '1px solid rgba(244,241,234,0.08)',
                  }}>
                    {/* Image */}
                    <div style={{
                      width: '80px', height: '80px',
                      background: 'rgba(255,255,255,0.05)',
                      flexShrink: 0, overflow: 'hidden',
                      position: 'relative'
                    }}>
                      {item.image && (
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          sizes="80px"
                          style={{ objectFit: 'cover' }}
                        />
                      )}
                    </div>

                    {/* Info */}
                    <div style={{ flex: 1 }}>
                      <p style={{ margin: '0 0 4px', fontSize: '14px', fontWeight: 500 }}>
                        {item.title}
                      </p>
                      <p style={{
                        margin: '0 0 10px', fontSize: '12px',
                        color: '#a3a39c', fontFamily: 'Space Mono, monospace',
                      }}>
                        {item.variantTitle}
                      </p>

                      {/* Quantity */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <button
                          onClick={() => updateQuantity(item.variantId, item.quantity - 1)}
                          aria-label={`Decrease quantity of ${item.title}`}
                          style={{
                            background: 'rgba(255,255,255,0.1)',
                            border: 'none', color: '#f4f1ea',
                            width: '28px', height: '28px',
                            cursor: 'pointer', fontSize: '16px',
                          }}
                        >−</button>
                        <span style={{ fontFamily: 'Space Mono, monospace', fontSize: '13px' }}>
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.variantId, item.quantity + 1)}
                          aria-label={`Increase quantity of ${item.title}`}
                          style={{
                            background: 'rgba(255,255,255,0.1)',
                            border: 'none', color: '#f4f1ea',
                            width: '28px', height: '28px',
                            cursor: 'pointer', fontSize: '16px',
                          }}
                        >+</button>
                        <button
                          onClick={() => removeItem(item.variantId)}
                          style={{
                            background: 'none', border: 'none',
                            color: '#a3a39c', cursor: 'pointer',
                            fontSize: '12px', marginLeft: 'auto',
                            fontFamily: 'Space Mono, monospace',
                          }}
                        >REMOVE</button>
                      </div>
                    </div>

                    {/* Price */}
                    <div style={{
                      fontFamily: 'Space Mono, monospace',
                      fontSize: '14px', color: '#ff5a1f',
                      flexShrink: 0,
                    }}>
                      ${((item.price * item.quantity) / 100).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>

                            {/* Footer */}
              {items.length > 0 && (
                <div style={{
                  padding: '20px 24px',
                  borderTop: '1px solid rgba(244,241,234,0.1)',
                }}>
                  <div style={{
                    display: 'flex', justifyContent: 'space-between',
                    marginBottom: '16px',
                  }}>
                    <span style={{ fontFamily: 'Space Mono, monospace', fontSize: '13px' }}>
                      SUBTOTAL
                    </span>
                    <span style={{
                      fontFamily: 'Space Mono, monospace',
                      fontSize: '16px', color: '#ff5a1f',
                    }}>
                      ${(total / 100).toFixed(2)}
                    </span>
                  </div>
                  <button
                    onClick={handleCheckout}
                    style={{
                      width: '100%', padding: '16px',
                      background: '#ff5a1f', border: 'none',
                      color: '#1c1b19', cursor: 'pointer',
                      fontFamily: 'Big Shoulders Stencil, sans-serif',
                      fontSize: '16px', fontWeight: 700,
                      textTransform: 'uppercase', letterSpacing: '1px',
                    }}
                  >
                    CHECKOUT →
                  </button>
                  <button
                    onClick={clearCart}
                    style={{
                      width: '100%', padding: '10px',
                      background: 'none', border: 'none',
                      color: '#a3a39c', cursor: 'pointer',
                      fontFamily: 'Space Mono, monospace',
                      fontSize: '11px', marginTop: '8px',
                      letterSpacing: '1px',
                    }}
                  >
                    CLEAR CART
                  </button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
