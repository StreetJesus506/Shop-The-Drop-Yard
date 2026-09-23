'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import ShareButtons from '@/components/ShareButtons'

const brands = [
  {
    id: 'pro',
    lot: '01',
    name: 'P.R.O.',
    full: 'Proletariat Revolution Outfitters',
    ethos: 'Clothing for the working class.',
    tag: 'NO WAR BUT CLASS WAR',
    stamp: 'FRAGILE: IDEAS',
    accent: '#b01e28',
    bg: '#0f0a0a',
    text: '#f3e9e2',
    image: '/logos/container-pro.webp'
  },
  {
    id: 'nudefarmer',
    lot: '02',
    name: 'The Nude Farmer',
    full: 'The Nude Farmer',
    ethos: 'Farm to fit designs for the high minded.',
    tag: 'GIRLS GROW TOO',
    stamp: 'HERBAL',
    accent: '#46522f',
    bg: '#0d0f0a',
    text: '#f1ead4',
    image: '/logos/container-nude-farmer.webp'
  },
  {
    id: 'unpopular',
    lot: '03',
    name: 'Unpopular Demand',
    full: 'Unpopular Demand',
    ethos: 'What history tries to bury.',
    tag: 'ACAB',
    stamp: 'CIGS CORNER STORE',
    accent: '#c9a24a',
    bg: '#0b0b0b',
    text: '#ece4cf',
    image: '/logos/container-unpopular.webp'
  },
  {
    id: 'deadair',
    lot: '04',
    name: 'Dead Air Vintage',
    full: 'Dead Air Vintage',
    ethos: 'Cult cinema. Retro pop culture. Channel surf style. Rerun energy.',
    tag: 'BE KIND REWIND',
    stamp: 'HANDLE W/ CARE',
    accent: '#2ee6d6',
    bg: '#08080f',
    text: '#dfe6f0',
    image: '/logos/container-deadair.webp'
  },
  {
    id: 'streetjesus',
    lot: '05',
    name: 'Street Jesus Got Soul',
    full: 'Street Jesus Got Soul',
    ethos: '4 Elements Culture',
    tag: 'WHAT WOULD STREET JESUS DO',
    stamp: 'IT WILL FUNK YOU UP',
    accent: '#f4f1ea',
    bg: '#0d0d0d',
    text: '#e8e8e8',
    image: '/logos/container-streetjesus.webp'
  },
]

export default function Home() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const startYRef = useRef(null)

  const activeBrand = brands[activeIndex]

  const goToNext = () => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setTimeout(() => {
      setActiveIndex(i => (i + 1) % brands.length)
      setIsTransitioning(false)
    }, 300)
  }

  const goToPrev = () => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setTimeout(() => {
      setActiveIndex(i => (i - 1 + brands.length) % brands.length)
      setIsTransitioning(false)
    }, 300)
  }

  useEffect(() => {
    let lastScroll = 0

    const handleWheel = (e) => {
      e.preventDefault()
      const now = Date.now()
      if (now - lastScroll < 800) return
      lastScroll = now
      if (e.deltaX > 0 || e.deltaY > 0) goToNext()
      else goToPrev()
    }

    const handleTouchStart = (e) => {
      startYRef.current = e.touches[0].clientX
    }

    const handleTouchEnd = (e) => {
      if (startYRef.current === null) return
      const diff = startYRef.current - e.changedTouches[0].clientX
      if (Math.abs(diff) > 50) {
        if (diff > 0) goToNext()
        else goToPrev()
      }
      startYRef.current = null
    }

    window.addEventListener('wheel', handleWheel, { passive: false })
    window.addEventListener('touchstart', handleTouchStart, { passive: false })
    window.addEventListener('touchend', handleTouchEnd, { passive: false })

    return () => {
      window.removeEventListener('wheel', handleWheel)
      window.removeEventListener('touchstart', handleTouchStart)
      window.removeEventListener('touchend', handleTouchEnd)
    }
  }, [activeIndex, isTransitioning])

  return (
    <main style={{ width: '100%', height: '100vh', overflow: 'hidden', background: '#1c1b19', position: 'relative' }}>
      
      <AnimatePresence mode="wait">
        <motion.div
          key={activeIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.15 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          style={{
            position: 'absolute', inset: 0,
            background: activeBrand.accent,
            pointerEvents: 'none',
            willChange: 'opacity',
          }}
        />
      </AnimatePresence>

      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: `
          repeating-linear-gradient(0deg, transparent, transparent 79px, rgba(244,241,234,0.04) 79px, rgba(244,241,234,0.04) 80px),
          repeating-linear-gradient(90deg, transparent, transparent 79px, rgba(244,241,234,0.04) 79px, rgba(244,241,234,0.04) 80px)
        `
      }} />

      <header style={{
        position: 'absolute', top: 0, left: 0, right: 0,
        padding: '20px 28px',
        display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
        zIndex: 10,
      }}>
        <div>
          <h1 style={{
            fontFamily: 'Big Shoulders Stencil, sans-serif',
            fontSize: 'clamp(28px, 5vw, 52px)',
            fontWeight: 900, textTransform: 'uppercase',
            lineHeight: 0.9, margin: 0, color: '#f4f1ea',
          }}>
            THE DROP<br /><span style={{ color: '#ff5a1f' }}>YARD</span>
          </h1>
          <p style={{ fontFamily: 'Space Mono, monospace', fontSize: '10px', color: '#a3a39c', marginTop: '6px' }}>
            EST. 2026
          </p>

          <div style={{ marginTop: '12px' }}>
            <ShareButtons
              url={`https://shopthedropyard.com{activeBrand.id}`}
              title={`${activeBrand.name} | The Drop Yard`}
              image={null}
            />
          </div>
        </div>
        
        <div style={{ textAlign: 'right' }} aria-live="polite">
          <p style={{ fontFamily: 'Space Mono, monospace', fontSize: '10px', color: '#a3a39c', margin: 0 }}>
            LOT {activeBrand.lot} / 05
          </p>
          <p style={{ fontFamily: 'Space Mono, monospace', fontSize: '10px', color: '#a3a39c', margin: '4px 0 0' }}>
            {activeBrand.stamp}
          </p>
        </div>
      </header>

      {/* 2D Optimized WebP Container Panel Swap */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeIndex}
          initial={{ opacity: 0, x: 80 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -80 }}
          transition={{ duration: 0.4, ease: 'easeInOut' }}
          style={{
            position: 'absolute',
            top: '42%', left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '95%',
            height: '50vw',
            minHeight: '220px',
            maxWidth: '700px',
            maxHeight: '380px',
            zIndex: 5,
            willChange: 'transform, opacity',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Link href={`/brands/${activeBrand.id}`} style={{ display: 'block', width: '100%', height: '100%' }} aria-label={`View ${activeBrand.name} Brand details`}>
            <img 
              src={activeBrand.image} 
              alt={`${activeBrand.name} Shipping Container Crate`}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain',
                pointerEvents: 'none'
              }}
            />
          </Link>
        </motion.div>
      </AnimatePresence>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeIndex + '-info'}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          style={{
            position: 'absolute',
            bottom: '120px', left: '28px', right: '28px',
            zIndex: 10,
            willChange: 'transform, opacity',
          }}
        >
          <h2 style={{
            fontFamily: 'Big Shoulders Stencil, sans-serif',
            fontSize: 'clamp(32px, 7vw, 72px)',
            fontWeight: 900, textTransform: 'uppercase',
            lineHeight: 0.9, margin: '0 0 10px',
            color: activeBrand.accent,
          }}>
            {activeBrand.name}
          </h2>
          <p style={{
            fontFamily: 'Work Sans, sans-serif',
            fontSize: 'clamp(13px, 2vw, 16px)',
            color: '#cfcac0', margin: '0 0 6px',
            maxWidth: '480px',
          }}>
            {activeBrand.ethos}
          </p>
          <p style={{
            fontFamily: 'Space Mono, monospace',
            fontSize: '11px', color: '#a3a39c',
            letterSpacing: '1px',
          }}>
            {activeBrand.tag}
          </p>
        </motion.div>
      </AnimatePresence>

      <Link href={`/brands/${activeBrand.id}`} passHref legacyBehavior>
        <motion.a
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          style={{
            position: 'absolute',
            bottom: '40px',
            left: '28px',
            fontFamily: 'Big Shoulders Stencil, sans-serif',
            fontSize: '14px',
            letterSpacing: '2px',
            background: 'none',
            border: `2px solid ${activeBrand.accent}`,
            color: activeBrand.accent,
            padding: '12px 28px',
            cursor: 'pointer',
            zIndex: 10,
            textTransform: 'uppercase',
            textDecoration: 'none',
            display: 'inline-block'
          }}
        >
          ENTER BRAND →
        </motion.a>
      </Link>

      <div style={{
        position: 'absolute', left: '18px', top: '50%',
        transform: 'translateY(-50%)',
        display: 'flex', flexDirection: 'column', gap: '12px', zIndex: 10,
      }}>
                <button
          onClick={goToPrev}
          aria-label="Previous brand panel"
          style={{
            fontFamily: 'Space Mono, monospace', fontSize: '18px',
            background: 'none', border: '1px solid #6b6b63',
            color: '#6b6b63', width: '48px', height: '48px',
            cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
        >
          ←
        </button>
        <button
          onClick={goToNext}
          aria-label="Next brand panel"
          style={{
            fontFamily: 'Space Mono, monospace', fontSize: '18px',
            background: 'none', border: '1px solid #6b6b63',
            color: '#6b6b63', width: '44px', height: '44px',
            cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
        >
          →
        </button>
      </div>

      <div 
        role="tablist"
        aria-label="Brand Selection"
        style={{
          position: 'absolute', 
          top: '196px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex', 
          flexDirection: 'row', 
          gap: '14px', 
          zIndex: 10,
          alignItems: 'center',
          height: '48px' 
        }}
      >
        {brands.map((b, i) => (
          <button
            key={b.id}
            role="tab"
            aria-selected={i === activeIndex}
            aria-label={`Go to brand ${b.name}`}
            onClick={() => setActiveIndex(i)}
            style={{
              width: i === activeIndex ? '10px' : '6px',
              height: i === activeIndex ? '10px' : '6px',
              borderRadius: '50%',
              background: i === activeIndex ? activeBrand.accent : '#6b6b63',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              border: '14px solid transparent',
              backgroundClip: 'padding-box',
              padding: 0,
              boxSizing: 'content-box',
              display: 'block'
            }}
          />
        ))}
      </div>

      <motion.p
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 2, repeat: Infinity }}
        style={{
          position: 'absolute', top: '168px',
          left: '50%', transform: 'translateX(-50%)',
          fontFamily: 'Space Mono, monospace', fontSize: '10px',
          color: '#a3a39c', letterSpacing: '2px',
          zIndex: 10, whiteSpace: 'nowrap',
        }}
      >
        SCROLL TO EXPLORE
      </motion.p>
    </main>
  )
}

