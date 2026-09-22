'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import ShareButtons from '@/components/ShareButtons'
import HomeTabbedCarousel from '@/components/HomeTabbedCarousel'

// Client-side dynamic import of the 3D renderer setup
const ShippingContainer = dynamic(() => import('@/components/ShippingContainer'), {
  ssr: false,
  loading: () => (
    <div 
      className="animate-pulse bg-neutral-800 rounded-lg" 
      style={{ 
        width: '100%', height: '100%', minHeight: '220px', 
        position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' 
      }}
    >
      <img 
        src="/logos/Logo-Red.png" 
        alt="Loading The Drop Yard..." 
        style={{ width: 'auto', height: '60px', opacity: 0.3, objectFit: 'contain' }} 
      />
    </div>
  )
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
    bg: '#0f0a0a',
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
    bg: '#0d0f0a',
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
    bg: '#08080f',
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
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [liveProductsMap, setLiveProductsMap] = useState({
    pro: [], nudefarmer: [], unpopular: [], deadair: [], streetjesus: []
  })
  const startYRef = useRef(null)
  const activeBrand = brands[activeIndex]

  // Dynamic on-load catalog acquisition mapping via client-side endpoints
  useEffect(() => {
    async function populateHomeStorefront() {
      const endpoints = ['pro', 'nudefarmer', 'unpopular', 'deadair', 'streetjesus']
      try {
        const results = await Promise.all(
          endpoints.map(id => fetch(`/api/products?brand=${id}`).then(r => r.json()).catch(() => []))
        )
        const updatedMap = {}
        endpoints.forEach((id, idx) => {
          updatedMap[id] = results[idx] || []
        })
        setLiveProductsMap(updatedMap)
      } catch (err) {
        // Safe fallback preservation bounds
      }
    }
    populateHomeStorefront()
  }, [])

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

  // Smooth gesture layout scrolling configurations
  const handleTouchStart = (e) => {
    startYRef.current = e.touches[0].clientX
  }

  const handleTouchEnd = (e) => {
    if (startYRef.current === null) return
    const diff = startYRef.current - e.changedTouches[0].clientX
    if (Math.abs(diff) > 60) {
      if (diff > 0) goToNext()
      else goToPrev()
    }
    startYRef.current = null
  }

  // Slice individual dynamic array outputs to match curated layout boundaries
  const featuredDrops = [
    ...(liveProductsMap.pro || []).slice(0, 2).map(p => ({ ...p, brandId: 'pro' })),
    ...(liveProductsMap.nudefarmer || []).slice(0, 2).map(p => ({ ...p, brandId: 'nudefarmer' })),
    ...(liveProductsMap.deadair || []).slice(0, 2).map(p => ({ ...p, brandId: 'deadair' })),
    ...(liveProductsMap.unpopular || []).slice(0, 2).map(p => ({ ...p, brandId: 'unpopular' })),
  ].slice(0, 8)

    return (
    <main style={{ width: '100%', minHeight: '100vh', background: '#1c1b19', color: '#ede9e0', overflowX: 'hidden', position: 'relative', paddingBottom: '80px' }}>
      
      {/* Container display backdrop block segment */}
      <div style={{ position: 'relative', width: '100%', height: '80vh', overflow: 'hidden' }} onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.15 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            style={{ position: 'absolute', inset: 0, background: activeBrand.accent, pointerEvents: 'none', willChange: 'opacity' }}
          />
        </AnimatePresence>

        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          backgroundImage: `
            repeating-linear-gradient(0deg, transparent, transparent 79px, rgba(244,241,234,0.04) 79px, rgba(244,241,234,0.04) 80px),
            repeating-linear-gradient(90deg, transparent, transparent 79px, rgba(244,241,234,0.04) 79px, rgba(244,241,234,0.04) 80px)
          `
        }} />

        <header style={{ position: 'absolute', top: 0, left: 0, right: 0, padding: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', zIndex: 10 }}>
          <div>
            <h1 style={{ fontFamily: 'Big Shoulders Stencil, sans-serif', fontSize: 'clamp(28px, 5vw, 52px)', fontWeight: 900, textTransform: 'uppercase', lineHeight: 0.9, margin: 0, color: '#f4f1ea' }}>
              THE DROP<br /><span style={{ color: '#ff5a1f' }}>YARD</span>
            </h1>
            <p style={{ fontFamily: 'Space Mono, monospace', fontSize: '10px', color: '#a3a39c', marginTop: '6px' }}>EST. 2026 // ONE YARD.</p>
            <Link href="/about" style={{ fontFamily: 'Space Mono, monospace', fontSize: '10px', color: '#a3a39c', textDecoration: 'none', display: 'block', marginTop: '6px' }}>ABOUT / CONTACT</Link>
            <Link href="/subscribe" style={{ fontFamily: 'Space Mono, monospace', fontSize: '10px', color: '#a3a39c', textDecoration: 'none', display: 'block', marginTop: '4px' }}>JOIN THE YARD</Link>

            <div style={{ marginTop: '12px' }}>
              <ShareButtons
                url={`https://shopthedropyard.com{activeBrand.id}`}
                title={`${activeBrand.name} | The Drop Yard`}
                image={null}
              />
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <p style={{ fontFamily: 'Space Mono, monospace', fontSize: '10px', color: '#a3a39c', margin: 0 }}>LOT {activeBrand.lot} / 05</p>
            <p style={{ fontFamily: 'Space Mono, monospace', fontSize: '10px', color: '#a3a39c', margin: '4px 0 0' }}>{activeBrand.stamp}</p>
          </div>
        </header>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -60 }}
            transition={{ duration: 0.4 }}
            style={{ position: 'absolute', top: '40%', left: '50%', transform: 'translate(-50%, -50%)', width: '90%', height: '240px', zIndex: 5 }}
          >
            <Link href={`/brands/${activeBrand.id}`} style={{ display: 'block', width: '100%', height: '100%' }}>
              <ShippingContainer brand={activeBrand} isActive={true} />
            </Link>
          </motion.div>
        </AnimatePresence>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex + '-info'}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4 }}
            style={{ position: 'absolute', bottom: '32px', left: '24px', right: '24px', zIndex: 10 }}
          >
            <h2 style={{ fontFamily: 'Big Shoulders Stencil, sans-serif', fontSize: 'clamp(32px, 6vw, 64px)', fontWeight: 900, textTransform: 'uppercase', margin: '0 0 4px', color: activeBrand.accent }}>
              {activeBrand.name}
            </h2>
            <p style={{ fontFamily: 'Work Sans, sans-serif', fontSize: '14px', color: '#cfcac0', margin: '0 0 4px', maxWidth: '440px' }}>
              {activeBrand.ethos}
            </p>
            <p style={{ fontFamily: 'Space Mono, monospace', fontSize: '11px', color: '#a3a39c', letterSpacing: '1px' }}>
              {activeBrand.tag}
            </p>
          </motion.div>
        </AnimatePresence>

        <div style={{ position: 'absolute', right: '24px', top: '40%', display: 'flex', flexDirection: 'column', gap: '8px', zIndex: 20 }}>
          <button onClick={goToPrev} style={{ background: 'none', border: '1px solid #a3a39c', color: '#a3a39c', width: '36px', height: '36px', cursor: 'pointer', borderRadius: '4px' }}>←</button>
          <button onClick={goToNext} style={{ background: 'none', border: '1px solid #a3a39c', color: '#a3a39c', width: '36px', height: '36px', cursor: 'pointer', borderRadius: '4px' }}>→</button>
        </div>
      </div>

      {/* Row 1: Curated Multi-Brand Featured Drops Scroll Area */}
      {featuredDrops.length > 0 && (
        <section style={{ padding: '40px 24px 20px' }}>
          <h2 style={{ fontFamily: 'Big Shoulders Stencil, sans-serif', fontSize: '24px', letterSpacing: '1px', marginBottom: '16px', color: '#ff5a1f' }}>
            ⚡ FEATURED DROPS
          </h2>
          <div style={{ display: 'flex', gap: '20px', overflowX: 'auto', paddingBottom: '12px', scrollbarWidth: 'none', WebkitOverflowScrolling: 'touch' }}>
            {featuredDrops.map(product => {
              let image = null
              if (product && product.images && product.images.length > 0) {
                const firstImg = product.images.at(0)
                if (firstImg) image = firstImg.src || null
              }

              const enabledVariant = product.variants ? product.variants.find(v => v.is_enabled) : null
              const price = enabledVariant ? `$${(enabledVariant.price / 100).toFixed(2)}` : ''
              const brandAccent = brands.find(b => b.id === product.brandId)?.accent || '#ff5a1f'

              return (
                <Link key={product.id} href={`/products/${product.brandId}/${product.id}`} style={{ textDecoration: 'none', color: '#ede9e0', minWidth: '180px', maxWidth: '180px' }}>
                  <div style={{ aspectRatio: '4/5', background: 'rgba(255,255,255,0.03)', marginBottom: '8px', overflow: 'hidden', borderRadius: '4px' }}>
                    {image && <img src={image} alt={product.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />}
                  </div>
                  <p style={{ fontFamily: 'Work Sans, sans-serif', fontSize: '13px', margin: 0, textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                    {product.title}
                  </p>
                  <p style={{ fontFamily: 'Space Mono, monospace', fontSize: '12px', margin: '4px 0 0', color: brandAccent }}>
                    {price}
                  </p>
                </Link>
              )
            })}
          </div>
        </section>
      )}

      {/* Row 2: Tabbed Label Navigation Area Showcase Wrapper Component */}
      <section style={{ marginTop: '20px', paddingBottom: '60px' }}>
        <HomeTabbedCarousel 
          brandConfigs={{
            pro: brands.find(b => b.id === 'pro'),
            nudefarmer: brands.find(b => b.id === 'nudefarmer'),
            unpopular: brands.find(b => b.id === 'unpopular'),
            deadair: brands.find(b => b.id === 'deadair'),
            streetjesus: brands.find(b => b.id === 'streetjesus')
          }} 
          brandProductsMap={liveProductsMap} 
        />
      </section>
    </main>
  )
}
