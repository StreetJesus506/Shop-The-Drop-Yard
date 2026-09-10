'use client'

import { useState } from 'react'

export default function SubscribeForm() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState(null)
  const [sending, setSending] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSending(true)
    setStatus(null)

    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })

      if (res.ok) {
        setStatus('success')
        setEmail('')
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    } finally {
      setSending(false)
    }
  }

  if (status === 'success') {
    return (
      <div style={{
        padding: '24px',
        background: 'rgba(46,230,214,0.1)',
        border: '1px solid #2ee6d6',
      }}>
        <p style={{
          fontFamily: 'Big Shoulders Stencil, sans-serif',
          fontSize: '24px', fontWeight: 700,
          textTransform: 'uppercase', color: '#2ee6d6',
          margin: '0 0 8px', letterSpacing: '1px',
        }}>
          YOU'RE IN.
        </p>
        <p style={{
          fontFamily: 'Space Mono, monospace',
          fontSize: '11px', color: '#6b6b63',
          margin: 0, letterSpacing: '1px',
        }}>
          CHECK YOUR EMAIL FOR YOUR WELCOME CODE.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        placeholder="YOUR EMAIL ADDRESS"
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
        style={{
          width: '100%', padding: '16px',
          background: 'rgba(255,255,255,0.05)',
          border: '1px solid rgba(255,255,255,0.15)',
          color: '#f4f1ea',
          fontFamily: 'Space Mono, monospace',
          fontSize: '12px', letterSpacing: '1px',
          outline: 'none', marginBottom: '12px',
          boxSizing: 'border-box',
        }}
      />

      {status === 'error' && (
        <p style={{
          fontFamily: 'Space Mono, monospace',
          fontSize: '11px', color: '#b01e28',
          margin: '0 0 12px', letterSpacing: '1px',
        }}>
          SOMETHING WENT WRONG — PLEASE TRY AGAIN.
        </p>
      )}

      <button
        type="submit"
        disabled={sending}
        style={{
          width: '100%', padding: '16px',
          background: sending ? '#6b6b63' : '#ff5a1f',
          border: 'none', color: '#1c1b19',
          cursor: sending ? 'not-allowed' : 'pointer',
          fontFamily: 'Big Shoulders Stencil, sans-serif',
          fontSize: '18px', fontWeight: 700,
          textTransform: 'uppercase', letterSpacing: '1px',
        }}
      >
        {sending ? 'SUBSCRIBING...' : 'SUBSCRIBE →'}
      </button>

      <p style={{
        fontFamily: 'Space Mono, monospace',
        fontSize: '10px', color: '#6b6b63',
        marginTop: '16px', letterSpacing: '1px',
        lineHeight: 1.6,
      }}>
        NO SPAM. UNSUBSCRIBE ANYTIME.
      </p>
    </form>
  )
}
