'use client'

import { useState } from 'react'
import { useCart } from '@/lib/cartContext'

export default function AddToCart({ product, variants, sizes, colors, style }) {
  const { addItem, setIsOpen } = useCart()
  const [selectedSize, setSelectedSize] = useState(sizes[0] || '')
  const [selectedColor, setSelectedColor] = useState(colors[0]?.color || '')
  const [added, setAdded] = useState(false)
if (!variants || variants.length === 0) return null

  const selectedVariant = variants.find(v => {
  try {
    const parts = v.title.split(' / ')
    const size = isSizeFirst ? parts[0] : (parts[1] || parts[0])
    const color = isSizeFirst ? (parts[1] || 'Default') : parts[0]
    if (colors.length <= 1) return size === selectedSize
    return size === selectedSize && color === selectedColor
  } catch {
    return false
  }
}) || variants[0]



  const price = selectedVariant?.price
  const formattedPrice = price ? `$${(price / 100).toFixed(2)}` : ''

  const handleAddToCart = () => {
    if (!selectedVariant) return
    addItem(product, selectedVariant)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <div>
      {/* Color selector */}
      {colors.length > 1 && (
        <div style={{ marginBottom: '20px' }}>
          <p style={{
            fontFamily: 'Space Mono, monospace', fontSize: '11px',
            letterSpacing: '1px', marginBottom: '10px',
            opacity: 0.6, textTransform: 'uppercase',
          }}>
            Color: <span style={{ color: style.accent }}>{selectedColor}</span>
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {colors.map(({ color }) => (
              <button
                key={color}
                onClick={() => setSelectedColor(color)}
                style={{
                  padding: '8px 14px',
                  background: selectedColor === color ? style.accent : 'transparent',
                  border: `1px solid ${selectedColor === color ? style.accent : 'rgba(255,255,255,0.2)'}`,
                  color: selectedColor === color ? '#1c1b19' : style.text,
                  cursor: 'pointer',
                  fontFamily: 'Space Mono, monospace',
                  fontSize: '11px',
                  letterSpacing: '0.5px',
                  transition: 'all 0.2s',
                }}
              >
                {color}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Size selector */}
      {sizes.length > 0 && (
        <div style={{ marginBottom: '28px' }}>
          <p style={{
            fontFamily: 'Space Mono, monospace', fontSize: '11px',
            letterSpacing: '1px', marginBottom: '10px',
            opacity: 0.6, textTransform: 'uppercase',
          }}>
            Size: <span style={{ color: style.accent }}>{selectedSize}</span>
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {sizes.map(size => {
              const available = variants.some(v => {
                const parts = v.title.split(' / ')
                return parts[0] === size && (parts[1] || 'Default') === selectedColor
              })
              return (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  disabled={!available}
                  style={{
                    width: '52px', height: '52px',
                    background: selectedSize === size ? style.accent : 'transparent',
                    border: `1px solid ${selectedSize === size ? style.accent : available ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.08)'}`,
                    color: selectedSize === size ? '#1c1b19' : available ? style.text : 'rgba(255,255,255,0.2)',
                    cursor: available ? 'pointer' : 'not-allowed',
                    fontFamily: 'Space Mono, monospace',
                    fontSize: '11px',
                    transition: 'all 0.2s',
                  }}
                >
                  {size}
                </button>
              )
            })}
          </div>
        </div>
      )}

      {/* Price update */}
      {selectedVariant && (
        <p style={{
          fontFamily: 'Space Mono, monospace',
          fontSize: '20px', color: style.accent,
          margin: '0 0 20px',
        }}>
          {formattedPrice}
        </p>
      )}

      {/* Add to cart button */}
      <button
        onClick={handleAddToCart}
        disabled={!selectedVariant}
        style={{
          width: '100%', padding: '18px',
          background: added ? '#2a7a2a' : style.accent,
          border: 'none',
          color: '#1c1b19',
          cursor: selectedVariant ? 'pointer' : 'not-allowed',
          fontFamily: 'Big Shoulders Stencil, sans-serif',
          fontSize: '16px', fontWeight: 700,
          textTransform: 'uppercase', letterSpacing: '1px',
          transition: 'background 0.3s',
          marginBottom: '12px',
        }}
      >
        {added ? '✓ ADDED TO CART' : 'ADD TO CART'}
      </button>

      {/* View cart link */}
      {added && (
        <button
          onClick={() => setIsOpen(true)}
          style={{
            width: '100%', padding: '14px',
            background: 'transparent',
            border: `1px solid ${style.accent}`,
            color: style.accent,
            cursor: 'pointer',
            fontFamily: 'Big Shoulders Stencil, sans-serif',
            fontSize: '14px', textTransform: 'uppercase',
            letterSpacing: '1px',
          }}
        >
          VIEW CART →
        </button>
      )}
    </div>
  )
}
