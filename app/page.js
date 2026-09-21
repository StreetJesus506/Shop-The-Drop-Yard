'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import dynamic from 'next/dynamic'
import ShareButtons from '@/components/ShareButtons'

const ShippingContainer = dynamic(() => import('@/components/ShippingContainer'), {
  ssr: false,
  loading: () => <div className="animate-pulse bg-neutral-800 rounded-lg w-full h-64" />
})

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
    bg: '#b01e28',
    text: '#f3e9e2',
    containerColor: 0xb01e28,
    trimColor: 0x8e1620,
    logo: '/logos/Logo-Red.png',
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
    bg: '#46522f',
    text: '#f1ead4',
    containerColor: 0x46522f,
    trimColor: 0x8a9e6a,
    logo: '/logos/Farmer-Logo.png',
    logoTint: '#8a9e6a',
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
    containerColor: 0x1a1a1a,
    trimColor: 0xc9a24a,
    logo: '/logos/Demand.png',
    logoTint: '#c9a24a',
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
    bg: '#11111c',
    text: '#dfe6f0',
    containerColor: 0x11111c,
    trimColor: 0x2ee6d6,
    logo: '/logos/Dead-Air-Icon-Logo-Web.png',
    logoTint: '#2ee6d6',
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
    containerColor: 0x2a2a2a,
    trimColor: 0x555555,
    logo: '/logos/Swiss-Throwie.png',
  },
]
export default function Home() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [selectedBrand, setSelectedBrand] = useState(null)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const containerRef = useRef(null)
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

  const openBrand = (brand) => setSelectedBrand(brand)
  const closeBrand = () => setSelectedBrand(null)

  import Link from 'next/link'

return (
  <main style={{ width: '100%', height: '100vh', overflow: 'hidden', background: '#1c1b19', position: 'relative' }}>

    {/* Background color transition */}
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
        }}
      />
    </AnimatePresence>

    {/* Grid overlay */}
    <div style={{
      position: 'absolute', inset: 0, pointerEvents: 'none',
      backgroundImage: `
        repeating-linear-gradient(0deg, transparent, transparent 79px, rgba(244,241,234,0.04) 79px, rgba(244,241,234,0.04) 80px),
        repeating-linear-gradient(90deg, transparent, transparent 79px, rgba(244,241,234,0.04) 79px, rgba(244,241,234,0.04) 80px)
      `
    }} />

    {/* Header */}
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
        <Link href="/about" style={{
          fontFamily: 'Space Mono, monospace',
          fontSize: '10px', color: '#a3a39c',
          textDecoration: 'none', letterSpacing: '1px',
          marginTop: '6px', display: 'block',
        }}>
          ABOUT / CONTACT
        </Link>
        <Link href="/subscribe" style={{
          fontFamily: 'Space Mono, monospace',
          fontSize: '10px', color: '#a3a39c',
          textDecoration: 'none', letterSpacing: '1px',
          marginTop: '6px', display: 'block',
        }}>
          JOIN THE YARD
        </Link>

        <div style={{ marginTop: '12px' }}>
          <ShareButtons
            url={`https://shopthedropyard.com/brands/${activeBrand.id}`}
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

    {/* 3D Container */}
    <AnimatePresence mode="wait">
      <motion.div
        key={activeIndex}
        initial={{ opacity: 0, x: 80 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -80 }}
        transition={{ duration: 0.4, ease: 'easeInOut' }}
        style={{
          position: 'absolute',
          top: '42%', left: '30%',
          transform: 'translate(-50%, -50%)',
          width: '95%',
          height: '50vw',
          minHeight: '220px',
          maxWidth: '700px',
          maxHeight: '380px',
          zIndex: 5,
        }}
      >
        <Link href={`/brands/${activeBrand.id}`} style={{ display: 'block', width: '100%', height: '100%' }} aria-label={`View ${activeBrand.name} Brand details`}>
          <ShippingContainer
            brand={activeBrand}
            isActive={true}
          />
        </Link>
      </motion.div>
    </AnimatePresence>

    {/* Brand info */}
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

    {/* Enter button using Next.js Link Wrapper */}
    <Link href={`/brands/${activeBrand.id}`} passHref legacyBehavior>
      <motion.a
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.97 }}
        style={{
          position: 'absolute', bottom: '40px', left: '28px',
          fontFamily: 'Big Shoulders Stencil, sans-serif',
          fontSize: '14px', letterSpacing: '2px',
          background: 'none',
          border: `2px solid ${activeBrand.accent}`,
          color: activeBrand.accent,
          padding: '12px 28px',
          cursor: 'pointer', zIndex: 10,
          textTransform: 'uppercase',
          textDecoration: 'none',
          display: 'inline-block'
        }}
      >
        ENTER BRAND →
      </motion.a>
    </Link>


      {/* Nav arrows */}
<div style={{
  position: 'absolute', left: '18px', top: '50%',
  transform: 'translateY(-50%)',
  display: 'flex', flexDirection: 'column', gap: '12px', zIndex: 10,
}}>
        <button
          onClick={goToPrev}
          style={{
            fontFamily: 'Space Mono, monospace', fontSize: '18px',
            background: 'none', border: '1px solid #6b6b63',
            color: '#6b6b63', width: '44px', height: '44px',
            cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
        >
          ←
        </button>
        <button
          onClick={goToNext}
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

      {/* Dot indicators */}
      <div style={{
  position: 'absolute', bottom: '40px', right: '28px',
  display: 'flex', flexDirection: 'row', gap: '10px', zIndex: 10,
}}>
        {brands.map((b, i) => (
          <button
            key={b.id}
            onClick={() => setActiveIndex(i)}
            style={{
              width: i === activeIndex ? '10px' : '6px',
              height: i === activeIndex ? '10px' : '6px',
              borderRadius: '50%',
              background: i === activeIndex ? activeBrand.accent : '#6b6b63',
              border: 'none', cursor: 'pointer',
              transition: 'all 0.3s ease',
            }}
          />
        ))}
      </div>

      {/* Scroll hint */}
      <motion.p
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 2, repeat: Infinity }}
        style={{
          position: 'absolute', top: '168px',
left: '50%', transform: 'translateX(-50%)',
          fontFamily: 'Space Mono, monospace', fontSize: '10px',
          color: '#6b6b63', letterSpacing: '2px',
          zIndex: 10, whiteSpace: 'nowrap',
        }}
      >
        SCROLL TO EXPLORE
      </motion.p>

      {/* Brand view overlay */}
      <AnimatePresence>
        {selectedBrand && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              position: 'fixed', inset: 0,
              background: selectedBrand.bg,
              color: selectedBrand.text,
              zIndex: 50, overflowY: 'auto',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '18px 24px', borderBottom: '2px solid rgba(255,255,255,0.1)' }}>
              <button
                onClick={closeBrand}
                style={{
                  fontFamily: 'Big Shoulders Stencil, sans-serif',
                  fontSize: '12px', letterSpacing: '1px',
                  background: 'none',
                  border: `1px solid ${selectedBrand.text}`,
                  color: selectedBrand.text,
                  padding: '8px 14px', cursor: 'pointer',
                }}
              >
                ← BACK TO THE YARD
              </button>
              <span style={{ fontFamily: 'Big Shoulders Stencil, sans-serif', fontSize: '22px', fontWeight: 700, textTransform: 'uppercase' }}>
                {selectedBrand.name}
              </span>
              <span style={{ fontFamily: 'Space Mono, monospace', fontSize: '11px', opacity: 0.7 }}>
                LOT {selectedBrand.lot}
              </span>
            </div>

            <div style={{ padding: '70px 24px 60px', maxWidth: '1180px', margin: '0 auto' }}>
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                style={{
                  fontFamily: 'Big Shoulders Stencil, sans-serif',
                  fontSize: 'clamp(40px, 8vw, 92px)',
                  lineHeight: 0.92, marginBottom: '18px',
                  fontWeight: 900, textTransform: 'uppercase',
                  color: selectedBrand.accent,
                }}
              >
                {selectedBrand.full}
              </motion.h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                style={{ fontSize: '16px', maxWidth: '480px', lineHeight: 1.5, opacity: 0.85 }}
              >
                {selectedBrand.ethos}
              </motion.p>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                style={{ marginTop: '32px', fontFamily: 'Space Mono, monospace', fontSize: '13px', opacity: 0.6 }}
              >
                Products coming soon.
              </motion.p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}
