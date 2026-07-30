'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const brands = [
  {
    id: 'pro',
    lot: '01',
    name: 'P.R.O.',
    full: 'Proletariat Revolution Outfitters',
    ethos: 'Clothing for the working class.',
    tag: 'NO WAR BUT CLASS WAR',
    accent: '#b01e28',
    bg: '#b01e28',
    text: '#f3e9e2',
    stamp: 'FRAGILE: IDEAS',
  },
  {
    id: 'nudefarmer',
    lot: '02',
    name: 'The Nude Farmer',
    full: 'The Nude Farmer',
    ethos: 'Farm to fit designs for the high minded.',
    tag: 'HERBAL',
    accent: '#46522f',
    bg: '#46522f',
    text: '#f1ead4',
    stamp: 'GIRLS GROW TOO',
  },
  {
    id: 'unpopular',
    lot: '03',
    name: 'Unpopular Demand',
    full: 'Unpopular Demand',
    ethos: 'Wearing what history tries to bury.',
    tag: 'ACAB',
    accent: '#c9a24a',
    bg: '#0b0b0b',
    text: '#ece4cf',
    stamp: 'CIGS CORNER STORE',
  },
  {
    id: 'deadair',
    lot: '04',
    name: 'Dead Air',
    full: 'Dead Air',
    ethos: 'Cult cinema. Retro pop culture. Channel surf style, rerun energy.',
    tag: 'BE KIND REWIND',
    accent: '#2ee6d6',
    bg: '#11111c',
    text: '#dfe6f0',
    stamp: 'HANDLE W/ CARE',
  },
]

export default function Home() {
  const [activeBrand, setActiveBrand] = useState(null)

  const openBrand = (brand) => setActiveBrand(brand)
  const closeBrand = () => setActiveBrand(null)

  return (
    <main className="min-h-screen" style={{ background: '#1c1b19' }}>
      <AnimatePresence mode="wait">
        {!activeBrand ? (
          <motion.div
            key="yard"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.3 }}
            className="min-h-screen p-6 pb-16"
            style={{
              backgroundImage: `
                repeating-linear-gradient(0deg, transparent, transparent 79px, rgba(244,241,234,0.06) 79px, rgba(244,241,234,0.06) 80px),
                repeating-linear-gradient(90deg, transparent, transparent 79px, rgba(244,241,234,0.06) 79px, rgba(244,241,234,0.06) 80px)
              `
            }}
          >
            {/* Header */}
            <header className="max-w-5xl mx-auto mb-10 border-b border-gray-700 pb-5">
              <h1
                className="text-8xl font-black leading-none mb-2"
                style={{ fontFamily: 'Big Shoulders Stencil, sans-serif', textTransform: 'uppercase' }}
              >
                THE DROP<br />
                <span style={{ color: '#ff5a1f' }}>YARD</span>
              </h1>
              <p style={{ fontFamily: 'Space Mono, monospace', fontSize: '12px', color: '#6b6b63' }}>
                EST. 2026 — LOT OPERATING UNDER MULTIPLE LABELS
              </p>
            </header>

            {/* Tagline */}
            <div className="max-w-5xl mx-auto mb-10 flex justify-between items-center flex-wrap gap-4">
              <p style={{ color: '#cfcac0', maxWidth: '480px' }}>
                One yard. Every label. Each crate below holds its own brand — break it open to step inside.
              </p>
              <span style={{ fontFamily: 'Space Mono, monospace', fontSize: '11px', color: '#6b6b63', border: '1px solid #6b6b63', padding: '6px 10px' }}>
                MANIFEST: 04 LABELS ON SITE
              </span>
            </div>

            {/* Crates */}
            <section className="max-w-5xl mx-auto grid gap-7" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))' }}>
              {brands.map((brand, i) => (
                <motion.button
                  key={brand.id}
                  onClick={() => openBrand(brand)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -6, rotate: 0 }}
                  style={{
                    background: '#ede9e0',
                    color: '#1c1b19',
                    padding: '22px 20px 26px',
                    minHeight: '230px',
                    textAlign: 'left',
                    border: 'none',
                    cursor: 'pointer',
                    position: 'relative',
                    rotate: `${[-0.6, 0.5, -0.3, 0.7][i]}deg`,
                    boxShadow: '0 14px 0 -6px rgba(0,0,0,0.35), 0 18px 24px -10px rgba(0,0,0,0.5)',
                  }}
                >
                  {/* Accent bar */}
                  <span style={{ position: 'absolute', left: 0, bottom: 0, height: '6px', width: '100%', background: brand.accent }} />

                  <div style={{ fontFamily: 'Space Mono, monospace', fontSize: '11px', opacity: 0.65, display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                    <span>LOT {brand.lot}</span>
                    <span>{brand.stamp}</span>
                  </div>

                  <h2 style={{ fontFamily: 'Big Shoulders Stencil, sans-serif', fontSize: '30px', fontWeight: 700, textTransform: 'uppercase', lineHeight: 1, marginBottom: '8px' }}>
                    {brand.name}
                  </h2>

                  <p style={{ fontSize: '13.5px', color: '#3a3833', marginBottom: '18px' }}>
                    {brand.ethos}
                  </p>

                  <div style={{ fontFamily: 'Space Mono, monospace', fontSize: '11px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px dashed rgba(0,0,0,0.3)', paddingTop: '10px' }}>
                    <span style={{ border: '2px solid currentColor', padding: '3px 8px', fontWeight: 700 }}>ENTER →</span>
                    <span>{brand.tag}</span>
                  </div>
                </motion.button>
              ))}

              {/* New brand placeholder */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                style={{
                  background: 'transparent',
                  border: '2px dashed #6b6b63',
                  color: '#6b6b63',
                  minHeight: '230px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '42px',
                  fontFamily: 'Big Shoulders Stencil, sans-serif',
                }}
              >
                +
              </motion.div>
            </section>

            {/* Footer */}
            <footer className="max-w-5xl mx-auto mt-16 pt-5 border-t border-gray-800 flex justify-between flex-wrap gap-3" style={{ fontFamily: 'Space Mono, monospace', fontSize: '12px', color: '#6b6b63' }}>
              <span>THE DROP YARD</span>
              <span>CONTACT@SHOPTHEDROPYARD.COM</span>
            </footer>
          </motion.div>
        ) : (
          <motion.div
            key="brand"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="min-h-screen"
            style={{ background: activeBrand.bg, color: activeBrand.text }}
          >
            {/* Brand topbar */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '18px 24px', borderBottom: '2px solid rgba(0,0,0,0.2)' }}>
              <button
                onClick={closeBrand}
                style={{ fontFamily: 'Big Shoulders Stencil, sans-serif', fontSize: '12px', letterSpacing: '1px', background: 'none', border: `1px solid ${activeBrand.text}`, color: activeBrand.text, padding: '8px 14px', cursor: 'pointer' }}
              >
                ← BACK TO THE YARD
              </button>
              <span style={{ fontFamily: 'Big Shoulders Stencil, sans-serif', fontSize: '22px', fontWeight: 700, textTransform: 'uppercase' }}>
                {activeBrand.name}
              </span>
              <span style={{ fontFamily: 'Space Mono, monospace', fontSize: '11px', opacity: 0.7 }}>LOT {activeBrand.lot}</span>
            </div>

            {/* Brand hero */}
            <div style={{ padding: '70px 24px 60px', maxWidth: '1180px', margin: '0 auto' }}>
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                style={{ fontFamily: 'Big Shoulders Stencil, sans-serif', fontSize: 'clamp(40px, 8vw, 92px)', lineHeight: 0.92, marginBottom: '18px', fontWeight: 900, textTransform: 'uppercase', color: activeBrand.accent }}
              >
                {activeBrand.full}
              </motion.h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                style={{ fontSize: '16px', maxWidth: '480px', lineHeight: 1.5, opacity: 0.85 }}
              >
                {activeBrand.ethos}
              </motion.p>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                style={{ marginTop: '32px', fontFamily: 'Space Mono, monospace', fontSize: '13px', opacity: 0.6 }}
              >
                Products loading soon.
              </motion.p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}
