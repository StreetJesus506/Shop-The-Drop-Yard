'use client'

import { useState } from 'react'
import ShippingContainer from '@/components/ShippingContainer'

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

        {/* Outer Frame Box */}
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
          {/* Forced layout shift wrapper that forces the container leftward on screen */}
          <div style={{ 
            width: '100%', 
            height: '100%', 
            transform: 'scale(1) translateX(-55px)', 
            transformOrigin: 'center center' 
          }}>
            <ShippingContainer brand={activeBrand} isActive={true} />
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
            <li>Right-click directly inside the container graphics window and select <strong>"Save Image As..."</strong>.</li>
            <li>If you are using a mobile viewport, press and hold the container for 2 seconds and select <strong>"Save to Photos"</strong>.</li>
            <li>Rename the output graphic asset file to match your production repository schema configurations.</li>
          </ul>
        </div>

      </div>
    </main>
  )
}
