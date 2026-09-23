'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'

const ShippingContainer = dynamic(() => import('../../components/ShippingContainer'), {
  ssr: false,
  loading: () => (
    <div style={{ fontFamily: 'monospace', fontSize: '12px', color: '#a3a39c' }}>
      LOADING 3D ENGINE...
    </div>
  )
})

const availableBrands = [
  {
    id: 'pro',
    name: 'P.R.O.',
    accent: '#b01e28',
    containerColor: 0xb01e28,
    trimColor: 0x8e1620,
    logo: '/logos/Logo-Red.png',
  },
  {
    id: 'nudefarmer',
    name: 'The Nude Farmer',
    accent: '#46522f',
    containerColor: 0x46522f,
    trimColor: 0x8a9e6a,
    logo: '/logos/Farmer-Logo.png',
    logoTint: '#8a9e6a',
  },
  {
    id: 'unpopular',
    name: 'Unpopular Demand',
    accent: '#c9a24a',
    containerColor: 0x1a1a1a,
    trimColor: 0xc9a24a,
    logo: '/logos/Demand.png',
    logoTint: '#c9a24a',
  },
  {
    id: 'deadair',
    name: 'Dead Air Vintage',
    accent: '#2ee6d6',
    containerColor: 0x11111c,
    trimColor: 0x2ee6d6,
    logo: '/logos/Dead-Air-Icon-Logo-Web.png',
    logoTint: '#2ee6d6',
  },
  {
    id: 'streetjesus',
    name: 'Street Jesus Got Soul',
    accent: '#f4f1ea',
    containerColor: 0x2a2a2a,
    trimColor: 0x555555,
    logo: '/logos/Swiss-Throwie.png',
  },
]

export default function StudioPage() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [offsetX, setOffsetX] = useState(0)
  const [zoomScale, setZoomScale] = useState(0.85) // Uses a structural scaling factor baseline
  
  const activeBrand = availableBrands[activeIndex]

  return (
    <main style={{ minHeight: '100vh', background: '#111', color: '#fff', padding: '40px 24px', fontFamily: 'sans-serif' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        
        <div style={{ borderBottom: '1px solid #333', paddingBottom: '20px', marginBottom: '40px' }}>
          <h1 style={{ margin: 0, fontSize: '24px', letterSpacing: '1px' }}>🛠️ INTERNAL ASSET STUDIO</h1>
          <p style={{ margin: '8px 0 0 0', fontSize: '13px', color: '#888' }}>
            Generate and capture new 2D transparent container vectors safely without affecting the production storefront.
          </p>
        </div>

        {/* Viewport Frame */}
        <div style={{ 
          width: '100%', 
          height: '400px', 
          background: '#161616', 
          borderRadius: '8px', 
          border: '1px solid #222',
          overflow: 'hidden',
          position: 'relative',
          boxShadow: '0 12px 40px rgba(0,0,0,0.5)'
        }}>
          {/* Layout matrix handling scaling zoom and horizontal placement adjustments simultaneously */}
          <div style={{ 
            width: '100%', 
            height: '100%', 
            transform: `scale(${zoomScale}) translateX(${offsetX}px)`, 
            transformOrigin: 'center center',
            transition: 'none'
          }}>
            <ShippingContainer brand={activeBrand} isActive={true} />
          </div>
        </div>

        {/* Control Center Panel */}
        <div style={{ marginTop: '30px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* Slider 1: Horizontal Alignment Adjustment */}
          <div style={{ background: '#1c1b19', padding: '20px', borderRadius: '6px', border: '1px solid #2a2926' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <label htmlFor="positionSlider" style={{ fontSize: '13px', fontFamily: 'monospace', color: '#a3a39c', textTransform: 'uppercase', letterSpacing: '1px' }}>
                Horizontal Alignment Fine-Tuning
              </label>
              <span style={{ fontSize: '13px', fontFamily: 'monospace', color: '#ff5a1f', fontWeight: 'bold' }}>
                {offsetX}px
              </span>
            </div>
            <input
              id="positionSlider"
              type="range"
              min="-300"
              max="300"
              value={offsetX}
              onChange={(e) => setOffsetX(Number(e.target.value))}
              style={{
                width: '100%',
                accentColor: '#ff5a1f',
                cursor: 'ew-resize',
                height: '6px',
                borderRadius: '3px',
                background: '#333',
                outline: 'none',
                marginTop: '10px'
              }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px', fontSize: '11px', fontFamily: 'monospace', color: '#555' }}>
              <span>← Push Left</span>
              <button 
                onClick={() => setOffsetX(0)} 
                style={{ background: 'none', border: 'none', color: '#a3a39c', cursor: 'pointer', fontSize: '11px', fontFamily: 'monospace', textDecoration: 'underline' }}
              >
                Reset Position
              </button>
              <span>Push Right →</span>
            </div>
          </div>

          {/* Slider 2: Size Zoom Scale Adjustment */}
          <div style={{ background: '#1c1b19', padding: '20px', borderRadius: '6px', border: '1px solid #2a2926' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <label htmlFor="zoomSlider" style={{ fontSize: '13px', fontFamily: 'monospace', color: '#a3a39c', textTransform: 'uppercase', letterSpacing: '1px' }}>
                Container Scale Zoom Matrix
              </label>
              <span style={{ fontSize: '13px', fontFamily: 'monospace', color: '#ff5a1f', fontWeight: 'bold' }}>
                {Math.round(zoomScale * 100)}%
              </span>
            </div>
            <input
              id="zoomSlider"
              type="range"
              min="0.40"
              max="1.30"
              step="0.01"
              value={zoomScale}
              onChange={(e) => setZoomScale(Number(e.target.value))}
              style={{
                width: '100%',
                accentColor: '#ff5a1f',
                cursor: 'ns-resize',
                height: '6px',
                borderRadius: '3px',
                background: '#333',
                outline: 'none',
                marginTop: '10px'
              }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px', fontSize: '11px', fontFamily: 'monospace', color: '#555' }}>
              <span>🔍 Scale Down (Smaller)</span>
              <button 
                onClick={() => setZoomScale(0.85)} 
                style={{ background: 'none', border: 'none', color: '#a3a39c', cursor: 'pointer', fontSize: '11px', fontFamily: 'monospace', textDecoration: 'underline' }}
              >
                Reset Scale (85%)
              </button>
              <span>🔍 Scale Up (Larger) →</span>
            </div>
          </div>

        </div>

        <div style={{ marginTop: '40px' }}>
          <h2 style={{ fontSize: '14px', textTransform: 'uppercase', letterSpacing: '1px', color: '#666', marginBottom: '16px' }}>
            Select Target Brand Template
          </h2>
          
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            {availableBrands.map((b, idx) => (
              <button
                key={b.id}
                onClick={() => setActiveIndex(idx)}
                style={{
                  padding: '12px 20px',
                  background: idx === activeIndex ? b.accent : '#222',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '4px',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                {b.name}
              </button>
            ))}
          </div>
        </div>

        <div style={{ marginTop: '40px', background: '#161616', padding: '20px', borderRadius: '6px', border: '1px solid #222' }}>
          <h3 style={{ margin: '0 0 10px 0', fontSize: '14px', color: '#fff' }}>Capture Protocol:</h3>
          <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '13px', color: '#aaa', lineHeight: '1.6' }}>
            <li>Cycle to your target brand configuration using the buttons above.</li>
            <li>Drag the <strong>Container Scale Zoom</strong> slider left to shrink the object profile until both ends fit inside comfortably.</li>
            <li>Drag the <strong>Horizontal Alignment</strong> slider to center your layout completely before taking your screen capture vectors.</li>
          </ul>
        </div>

      </div>
    </main>
  )
}
