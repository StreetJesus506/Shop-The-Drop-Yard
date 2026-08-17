'use client'

import { useState } from 'react'

export default function ShareButtons({ url, title, image }) {
  const [copied, setCopied] = useState(false)

  const encodedUrl = encodeURIComponent(url)
  const encodedTitle = encodeURIComponent(title)
  const encodedImage = encodeURIComponent(image || '')

  const platforms = [
    {
      name: 'Pinterest',
      color: '#E60023',
      icon: 'P',
      href: `https://pinterest.com/pin/create/button/?url=${encodedUrl}&media=${encodedImage}&description=${encodedTitle}`,
    },
    {
      name: 'Twitter/X',
      color: '#000000',
      icon: 'X',
      href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    },
    {
      name: 'Facebook',
      color: '#1877F2',
      icon: 'f',
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    },
    {
      name: 'Reddit',
      color: '#FF4500',
      icon: 'R',
      href: `https://reddit.com/submit?url=${encodedUrl}&title=${encodedTitle}`,
    },
  ]

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // fallback
      const el = document.createElement('textarea')
      el.value = url
      document.body.appendChild(el)
      el.select()
      document.execCommand('copy')
      document.body.removeChild(el)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title, url })
      } catch {}
    }
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
      <span style={{
        fontFamily: 'Space Mono, monospace',
        fontSize: '10px', letterSpacing: '2px',
        color: '#6b6b63', textTransform: 'uppercase',
        marginRight: '4px',
      }}>
        SHARE
      </span>

      {/* Native share on mobile */}
      {typeof navigator !== 'undefined' && navigator.share && (
        <button
          onClick={handleNativeShare}
          title="Share"
          style={{
            width: '34px', height: '34px',
            background: 'rgba(255,255,255,0.08)',
            border: '1px solid rgba(255,255,255,0.15)',
            color: '#f4f1ea', cursor: 'pointer',
            fontSize: '14px', display: 'flex',
            alignItems: 'center', justifyContent: 'center',
            borderRadius: '2px',
          }}
        >
          ↑
        </button>
      )}

      {/* Platform buttons */}
      {platforms.map(({ name, color, icon, href }) => (
        <a
          key={name}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          title={`Share on ${name}`}
          style={{
            width: '34px', height: '34px',
            background: 'rgba(255,255,255,0.08)',
            border: '1px solid rgba(255,255,255,0.15)',
            color: '#f4f1ea', cursor: 'pointer',
            fontSize: '12px', fontWeight: 700,
            display: 'flex', alignItems: 'center',
            justifyContent: 'center', textDecoration: 'none',
            borderRadius: '2px', fontFamily: 'monospace',
            transition: 'all 0.2s',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = color
            e.currentTarget.style.borderColor = color
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = 'rgba(255,255,255,0.08)'
            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'
          }}
        >
          {icon}
        </a>
      ))}

      {/* Copy link */}
      <button
        onClick={handleCopy}
        title="Copy link"
        style={{
          padding: '0 12px', height: '34px',
          background: copied ? 'rgba(46,230,214,0.15)' : 'rgba(255,255,255,0.08)',
          border: `1px solid ${copied ? '#2ee6d6' : 'rgba(255,255,255,0.15)'}`,
          color: copied ? '#2ee6d6' : '#f4f1ea',
          cursor: 'pointer', fontSize: '10px',
          fontFamily: 'Space Mono, monospace',
          letterSpacing: '1px', borderRadius: '2px',
          transition: 'all 0.2s', whiteSpace: 'nowrap',
        }}
      >
        {copied ? 'COPIED ✓' : 'COPY LINK'}
      </button>
    </div>
  )
}
