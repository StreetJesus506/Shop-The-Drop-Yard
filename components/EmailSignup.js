'use client'

import { useState } from 'react'

export default function EmailSignup() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState(null)
  const [sending, setSending] = useState(false)
  const [dismissed, setDismissed] = useState(false)

  if (dismissed) return null

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

  return (
    <div style={{
      position: 'fixed', bottom: 0, left: 0, right: 0,
      background: '#1c1b19',
      borderTop: '1px solid rgba(255,255,255,0.1)',
      padding: '16px 24px',
      zIndex: 80,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
      gap: '12px',
    }}>
      {status === 'success' ? (
        <>
          <p style={{
            fontFamily: 'Space Mono, monospace',
            fontSize: '12px', color: '#2ee6d6',
            letterSpacing: '1px', margin: 0, flex: 1,
          }}>
            ✓ YOU'RE IN — CHECK YOUR EMAIL FOR YOUR WELCOME CODE
          </p>
          <button
            onClick={() => setDismissed(true)}
            style={{
              background: 'none', border: 'none',
              color: '#6b6b63', cursor: 'pointer',
              fontSize: '20px', padding: '0 4px',
            }}
          >
            ×
          </button>
        </>
      ) : (
        <>
          <div style={{ flex: 1, minWidth: '200px' }}>
            <p style={{
              fontFamily: 'Big Shoulders Stencil, sans-serif',
              fontSize: '16px', fontWeight: 700,
              textTransform: 'uppercase', color: '#f4f1ea',
              margin: '0 0 2px', letterSpacing: '1px',
            }}>
              JOIN THE YARD
            </p>
            <p style={{
              fontFamily: 'Space Mono, monospace',
              fontSize: '10px', color: '#6b6b63',
              margin: 0, letterSpacing: '1px',
            }}>
              10% OFF YOUR FIRST ORDER + EARLY ACCESS TO NEW DROPS
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            style={{
              display: 'flex', gap: '8px',
              flex: 2, minWidth: '280px', maxWidth: '480px',
            }}
          >
            <input
              type="email"
              placeholder="YOUR EMAIL"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              style={{
                flex: 1, padding: '10px 14px',
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.15)',
                color: '#f4f1ea',
                fontFamily: 'Space Mono, monospace',
                fontSize: '11px', letterSpacing: '1px',
                outline: 'none',
              }}
            />
            <button
              type="submit"
              disabled={sending}
              style={{
                padding: '10px 20px',
                background: sending ? '#6b6b63' : '#ff5a1f',
                border: 'none', color: '#1c1b19',
                cursor: sending ? 'not-allowed' : 'pointer',
                fontFamily: 'Big Shoulders Stencil, sans-serif',
                fontSize: '14px', fontWeight: 700,
                textTransform: 'uppercase', letterSpacing: '1px',
                whiteSpace: 'nowrap',
              }}
            >
              {sending ? '...' : 'SUBSCRIBE'}
            </button>
          </form>

          {status === 'error' && (
            <p style={{
              fontFamily: 'Space Mono, monospace',
              fontSize: '11px', color: '#b01e28',
              margin: 0, width: '100%',
            }}>
              SOMETHING WENT WRONG — PLEASE TRY AGAIN
            </p>
          )}

          <button
            onClick={() => setDismissed(true)}
            style={{
              background: 'none', border: 'none',
              color: '#6b6b63', cursor: 'pointer',
              fontSize: '20px', padding: '0 4px',
              flexShrink: 0,
            }}
          >
            ×
          </button>
        </>
      )}
    </div>
  )
}
