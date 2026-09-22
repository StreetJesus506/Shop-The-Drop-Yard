'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function HomeTabbedCarousel({ brandConfigs, brandProductsMap }) {
  const [activeTab, setActiveTab] = useState('pro')

  const currentBrand = brandConfigs[activeTab]
  const currentProducts = brandProductsMap[activeTab] || []

  const tabOrder = ['pro', 'nudefarmer', 'unpopular', 'deadair', 'streetjesus']

  return (
    <div style={{ padding: '0 24px' }}>
      <h2 style={{ 
        fontFamily: 'Big Shoulders Stencil, sans-serif', 
        fontSize: '24px', 
        letterSpacing: '1px', 
        marginBottom: '20px', 
        color: '#ede9e0' 
      }}>
        🏷️ BROWSE LABELS
      </h2>

      {/* 3D-Look Perspective Container Buttons Touch Row */}
      <div style={{
        display: 'flex',
        gap: '16px',
        overflowX: 'auto',
        paddingBottom: '16px',
        scrollbarWidth: 'none',
        WebkitOverflowScrolling: 'touch',
        alignItems: 'center'
      }}>
        {tabOrder.map(id => {
          const config = brandConfigs[id]
          const isActive = activeTab === id
          
          return (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              style={{
                background: 'none',
                border: 'none',
                outline: 'none',
                padding: '0',
                minWidth: '140px',
                maxWidth: '140px',
                height: '110px',
                position: 'relative',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'transform 0.2s ease-in-out, filter 0.2s ease-in-out',
                transform: isActive ? 'scale(1.08)' : 'scale(0.95)',
                filter: isActive ? 'drop-shadow(0 8px 16px rgba(255,90,31,0.2)) brightness(1.1)' : 'grayscale(30%) opacity(0.6)'
              }}
            >
              {/* 2D Transparent PNG rendering the exact 3D perspective geometry layout */}
              <img 
                src={`/logos/container-${id}.png`} 
                alt={`${config.name} Container Label Selector`}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain'
                }}
              />
            </button>
          )
        })}
      </div>

      {/* Dynamic Brand Products Carousel */}
      <div style={{
        display: 'flex',
        gap: '20px',
        overflowX: 'auto',
        padding: '24px 0 20px',
        scrollbarWidth: 'none',
        WebkitOverflowScrolling: 'touch'
      }}>
        {currentProducts.length === 0 ? (
          <p style={{ fontFamily: 'Space Mono, monospace', fontSize: '13px', opacity: 0.5 }}>
            No stock found. Published catalog is updating.
          </p>
        ) : (
          currentProducts.map(product => {
            let image = null
            if (product && product.images && product.images.length > 0) {
              const firstImg = product.images.at(0)
              if (firstImg) image = firstImg.src || null
            }

            const enabledVariant = product.variants ? product.variants.find(v => v.is_enabled) : null
            const price = enabledVariant ? `$${(enabledVariant.price / 100).toFixed(2)}` : ''

            return (
              <Link 
                key={product.id} 
                href={`/products/${activeTab}/${product.id}`} 
                style={{ textDecoration: 'none', color: '#ede9e0', minWidth: '160px', maxWidth: '160px' }}
              >
                <div style={{ 
                  aspectRatio: '4/5', 
                  background: 'rgba(255,255,255,0.03)', 
                  marginBottom: '10px', 
                  overflow: 'hidden', 
                  borderRadius: '4px',
                  border: '1px solid rgba(255,255,255,0.02)'
                }}>
                  {image && <img src={image} alt={product.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />}
                </div>
                <p style={{ 
                  fontFamily: 'Work Sans, sans-serif', 
                  fontSize: '13px', 
                  margin: 0, 
                  textOverflow: 'ellipsis', 
                  overflow: 'hidden', 
                  whiteSpace: 'nowrap' 
                }}>
                  {product.title}
                </p>
                <p style={{ fontFamily: 'Space Mono, monospace', fontSize: '12px', margin: '4px 0 0', color: currentBrand.accent }}>
                  {price}
                </p>
              </Link>
            )
          })
        )}
      </div>

      {/* View All Button CTA */}
      {currentProducts.length > 0 && (
        <div style={{ marginTop: '16px', display: 'flex' }}>
          <Link 
            href={`/brands/${activeTab}`} 
            style={{
              fontFamily: 'Big Shoulders Stencil, sans-serif',
              fontSize: '14px',
              letterSpacing: '1px',
              textDecoration: 'none',
              color: currentBrand.accent === '#f4f1ea' ? '#1c1b19' : '#ede9e0',
              background: currentBrand.accent === '#f4f1ea' ? '#ede9e0' : currentBrand.accent,
              padding: '12px 24px',
              borderRadius: '4px',
              fontWeight: 900,
              textTransform: 'uppercase',
              boxShadow: '0 4px 14px rgba(0,0,0,0.3)',
              transition: 'transform 0.1s ease'
            }}
          >
            VIEW ALL {currentBrand.name} GEAR →
          </Link>
        </div>
      )}
    </div>
  )
}
