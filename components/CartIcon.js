'use client'

import { useCart } from '@/lib/cartContext'

export default function CartIcon({ color = '#f4f1ea' }) {
  const { count, setIsOpen } = useCart()

  return (
    <button
      onClick={() => setIsOpen(true)}
      style={{
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        position: 'relative',
        padding: '4px',
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        color: color,
      }}
    >
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
        <line x1="3" y1="6" x2="21" y2="6"/>
        <path d="M16 10a4 4 0 01-8 0"/>
      </svg>
      {count > 0 && (
        <span style={{
          fontFamily: 'Space Mono, monospace',
          fontSize: '11px',
          color: '#ff5a1f',
          fontWeight: 700,
        }}>
          ({count})
        </span>
      )}
    </button>
  )
}
