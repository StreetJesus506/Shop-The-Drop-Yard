'use client'

import { useState } from 'react'

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [status, setStatus] = useState(null)
  const [sending, setSending] = useState(false)

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSending(true)
    setStatus(null)

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (res.ok) {
        setStatus('success')
        setFormData({ name: '', email: '', subject: '', message: '' })
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    } finally {
      setSending(false)
    }
  }

  const inputStyle = {
    width: '100%',
    padding: '14px 16px',
    background: 'rgba(255,255,255,0.05)',
    border: '1px solid rgba(255,255,255,0.1)',
    color: '#f4f1ea',
    fontFamily: 'Work Sans, sans-serif',
    fontSize: '15px',
    marginBottom: '16px',
    outline: 'none',
    boxSizing: 'border-box',
  }

  return (
    <div>
      {status === 'success' && (
        <div style={{
          padding: '16px 20px',
          background: 'rgba(46,230,214,0.1)',
          border: '1px solid #2ee6d6',
          marginBottom: '24px',
          fontFamily: 'Space Mono, monospace',
          fontSize: '12px', color: '#2ee6d6',
          letterSpacing: '1px',
        }}>
          MESSAGE SENT — WE'LL BE IN TOUCH SOON.
        </div>
      )}

      {status === 'error' && (
        <div style={{
          padding: '16px 20px',
          background: 'rgba(176,30,40,0.1)',
          border: '1px solid #b01e28',
          marginBottom: '24px',
          fontFamily: 'Space Mono, monospace',
          fontSize: '12px', color: '#b01e28',
          letterSpacing: '1px',
        }}>
          SOMETHING WENT WRONG — PLEASE EMAIL US DIRECTLY.
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          <input
            name="name"
            placeholder="YOUR NAME"
            value={formData.name}
            onChange={handleChange}
            required
            style={{ ...inputStyle, marginBottom: 0 }}
          />
          <input
            name="email"
            type="email"
            placeholder="YOUR EMAIL"
            value={formData.email}
            onChange={handleChange}
            required
            style={{ ...inputStyle, marginBottom: 0 }}
          />
        </div>

        <div style={{ height: '16px' }} />

        <input
          name="subject"
          placeholder="SUBJECT"
          value={formData.subject}
          onChange={handleChange}
          required
          style={inputStyle}
        />

        <textarea
          name="message"
          placeholder="YOUR MESSAGE"
          value={formData.message}
          onChange={handleChange}
          required
          rows={6}
          style={{
            ...inputStyle,
            resize: 'vertical',
            minHeight: '140px',
          }}
        />

        <button
          type="submit"
          disabled={sending}
          style={{
            width: '100%', padding: '16px',
            background: sending ? '#6b6b63' : '#ff5a1f',
            border: 'none', color: '#1c1b19',
            cursor: sending ? 'not-allowed' : 'pointer',
            fontFamily: 'Big Shoulders Stencil, sans-serif',
            fontSize: '16px', fontWeight: 700,
            textTransform: 'uppercase', letterSpacing: '1px',
            transition: 'background 0.3s',
          }}
        >
          {sending ? 'SENDING...' : 'SEND MESSAGE →'}
        </button>
      </form>
    </div>
  )
}
