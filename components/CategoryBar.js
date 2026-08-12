'use client'

import { useState, useEffect } from 'react'

export default function CategoryBar({ categories, accent }) {
  const [active, setActive] = useState(null)

  const scrollToCategory = (category) => {
    const id = category.replace(/\s+/g, '-').replace(/&/g, 'and')
    const el = document.getElementById(id)
    if (el) {
      const offset = 80
      const top = el.getBoundingClientRect().top + window.scrollY - offset
      window.scrollTo({ top, behavior: 'smooth' })
      setActive(category)
    }
  }

  useEffect(() => {
    const handleScroll = () => {
      for (const category of categories) {
        const id = category.replace(/\s+/g, '-').replace(/&/g, 'and')
        const el = document.getElementById(id)
        if (el) {
          const rect = el.getBoundingClientRect()
          if (rect.top <= 100 && rect.bottom > 100) {
            setActive(category)
            break
          }
        }
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [categories])

  return (
    <div style={{
      position: 'sticky', top: 0, zIndex: 20,
      background: 'rgba(28,27,25,0.95)',
      backdropFilter: 'blur(10px)',
      borderBottom: '1px solid rgba(255,255,255,0.08)',
      overflowX: 'auto',
      scrollbarWidth: 'none',
      msOverflowStyle: 'none',
    }}>
      <div style={{
        display: 'flex', gap: '8px',
        padding: '12px 24px',
        whiteSpace: 'nowrap',
        minWidth: 'max-content',
      }}>
        {categories.map(category => (
          <button
            key={category}
            onClick={() => scrollToCategory(category)}
            style={{
              padding: '8px 16px',
              background: active === category ? accent : 'transparent',
              border: `1px solid ${active === category ? accent : 'rgba(255,255,255,0.15)'}`,
              color: active === category ? '#1c1b19' : '#cfcac0',
              cursor: 'pointer',
              fontFamily: 'Space Mono, monospace',
              fontSize: '10px',
              letterSpacing: '1px',
              textTransform: 'uppercase',
              whiteSpace: 'nowrap',
              transition: 'all 0.2s',
              borderRadius: '2px',
            }}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  )
}
