'use client'

import { useState } from 'react'

export default function ShareButtons({ url, title }) {
  const [copied, setCopied] = useState(false)

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title, url })
      } catch {}
    }
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
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

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <span style={{
        fontFamily: 'Space Mono, monospace',
        fontSize: '10px', letterSpacing: '2px',
        color: '#6b6b63', textTransform: 'uppercase',
      }}>
        SHARE
      </span>

      <button
        onClick={handleNativeShare}
        title="Share"
        style={{
          padding: '0 12px', height: '26px',
          background: 'rgba(255,255,255,0.08)',
          border: '1px solid rgba(255,255,255,0.15)',
          color: '#f4f1ea', cursor: 'pointer',
          fontSize: '10px', fontFamily: 'Space Mono, monospace',
          letterSpacing: '1px', borderRadius: '2px',
          whiteSpace: 'nowrap',
        }}
      >
        ↑ SHARE
      </button>

      <button
        onClick={handleCopy}
        title="Copy link"
        style={{
          padding: '0 12px', height: '26px',
          background: copied ? 'rgba(46,230,214,0.15)' : 'rgba(255,255,255,0.08)',
          border: `1px solid ${copied ? '#2ee6d6' : 'rgba(255,255,255,0.15)'}`,
          color: copied ? '#2ee6d6' : '#f4f1ea',
          cursor: 'pointer', fontSize: '10px',
          fontFamily: 'Space Mono, monospace',
          letterSpacing: '1px', borderRadius: '2px',
          whiteSpace: 'nowrap',
        }}
      >
        {copied ? 'COPIED ✓' : 'COPY LINK'}
      </button>
    </div>
  )
}
