import CartIcon from '@/components/CartIcon'
import SubscribeForm from '@/components/SubscribeForm'

export const metadata = {
  title: 'Join The Yard | The Drop Yard',
  description: 'Subscribe for 10% off your first order and early access to new drops.',
}

export default function SubscribePage() {
  return (
    <main style={{ minHeight: '100vh', background: '#1c1b19', color: '#f4f1ea' }}>

      {/* Header */}
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '18px 24px', borderBottom: '1px solid rgba(255,255,255,0.1)',
      }}>
        <a href="/" style={{
          fontFamily: 'Big Shoulders Stencil, sans-serif',
          fontSize: '12px', letterSpacing: '1px',
          border: '1px solid #f4f1ea',
          color: '#f4f1ea', padding: '8px 14px',
          textDecoration: 'none', textTransform: 'uppercase',
        }}>
          ← BACK TO THE YARD
        </a>
        <a href="/" style={{
          fontFamily: 'Big Shoulders Stencil, sans-serif',
          fontSize: '14px', fontWeight: 700,
          color: '#ff5a1f', textDecoration: 'none',
          textTransform: 'uppercase',
        }}>
          THE DROP YARD
        </a>
        <CartIcon color="#f4f1ea" />
      </div>

      <div style={{ maxWidth: '560px', margin: '0 auto', padding: '80px 24px' }}>
        <h1 style={{
          fontFamily: 'Big Shoulders Stencil, sans-serif',
          fontSize: 'clamp(52px, 12vw, 96px)',
          fontWeight: 900, textTransform: 'uppercase',
          lineHeight: 0.85, marginBottom: '24px',
          color: '#ff5a1f',
        }}>
          JOIN<br />THE<br />YARD
        </h1>

        <p style={{
          fontFamily: 'Space Mono, monospace',
          fontSize: '12px', color: '#6b6b63',
          letterSpacing: '1px', lineHeight: 1.8,
          marginBottom: '40px',
        }}>
          SUBSCRIBE FOR 10% OFF YOUR FIRST ORDER + EARLY ACCESS TO NEW DROPS BEFORE ANYONE ELSE.
        </p>

        <SubscribeForm />
      </div>
    </main>
  )
}
