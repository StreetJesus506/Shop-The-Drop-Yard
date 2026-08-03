'use client'

import { useState } from 'react'

export default function ImageGallery({ images, title }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [touchStart, setTouchStart] = useState(null)
  const [touchEnd, setTouchEnd] = useState(null)

  const minSwipeDistance = 50

  const onTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX)
    setTouchEnd(null)
  }

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    const distance = touchStart - touchEnd
    if (Math.abs(distance) >= minSwipeDistance) {
      if (distance > 0) {
        setActiveIndex(i => Math.min(i + 1, images.length - 1))
      } else {
        setActiveIndex(i => Math.max(i - 1, 0))
      }
    }
  }

  const goTo = (index) => setActiveIndex(index)

  if (!images || images.length === 0) return null

  return (
    <div>
      {/* Main image */}
      <div
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        style={{
          aspectRatio: '4/5',
          background: 'rgba(255,255,255,0.05)',
          marginBottom: '12px',
          overflow: 'hidden',
          position: 'relative',
          cursor: 'grab',
        }}
      >
        {images.map((img, i) => (
          <img
            key={i}
            src={img.src}
            alt={`${title} ${i + 1}`}
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              opacity: i === activeIndex ? 1 : 0,
              transition: 'opacity 0.3s ease',
            }}
          />
        ))}

        {/* Arrow buttons for desktop */}
        {images.length > 1 && (
          <>
            <button
              onClick={() => setActiveIndex(i => Math.max(i - 1, 0))}
              style={{
                position: 'absolute', left: '12px', top: '50%',
                transform: 'translateY(-50%)',
                background: 'rgba(0,0,0,0.4)', border: 'none',
                color: '#fff', width: '36px', height: '36px',
                cursor: 'pointer', fontSize: '16px',
                display: activeIndex === 0 ? 'none' : 'flex',
                alignItems: 'center', justifyContent: 'center',
              }}
            >
              ‹
            </button>
            <button
              onClick={() => setActiveIndex(i => Math.min(i + 1, images.length - 1))}
              style={{
                position: 'absolute', right: '12px', top: '50%',
                transform: 'translateY(-50%)',
                background: 'rgba(0,0,0,0.4)', border: 'none',
                color: '#fff', width: '36px', height: '36px',
                cursor: 'pointer', fontSize: '16px',
                display: activeIndex === images.length - 1 ? 'none' : 'flex',
                alignItems: 'center', justifyContent: 'center',
              }}
            >
              ›
            </button>
          </>
        )}

        {/* Dot indicators */}
        {images.length > 1 && (
          <div style={{
            position: 'absolute', bottom: '12px', left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex', gap: '6px',
          }}>
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                style={{
                  width: i === activeIndex ? '20px' : '6px',
                  height: '6px',
                  borderRadius: '3px',
                  background: i === activeIndex ? '#fff' : 'rgba(255,255,255,0.4)',
                  border: 'none', cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  padding: 0,
                }}
              />
            ))}
          </div>
        )}
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              style={{
                width: '64px', height: '64px',
                background: 'rgba(255,255,255,0.05)',
                overflow: 'hidden', flexShrink: 0,
                border: i === activeIndex ? '2px solid #ff5a1f' : '2px solid transparent',
                cursor: 'pointer', padding: 0,
              }}
            >
              <img
                src={img.src}
                alt={`${title} ${i + 1}`}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
