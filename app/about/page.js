import CartIcon from '@/components/CartIcon'

export const metadata = {
  title: 'About | The Drop Yard',
  description: 'The Drop Yard is a multi-brand streetwear platform for independent creators. No inventory, no storefront — just your vision, shipped.',
}

export default function AboutPage() {
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

      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '60px 24px 80px' }}>

        {/* Hero */}
        <h1 style={{
          fontFamily: 'Big Shoulders Stencil, sans-serif',
          fontSize: 'clamp(48px, 10vw, 96px)',
          fontWeight: 900, textTransform: 'uppercase',
          lineHeight: 0.9, marginBottom: '32px',
          color: '#ff5a1f',
        }}>
          ONE YARD.<br />EVERY LABEL.
        </h1>

        {/* Divider */}
        <div style={{ height: '1px', background: 'rgba(255,255,255,0.1)', marginBottom: '40px' }} />

        {/* About section */}
        <section style={{ marginBottom: '60px' }}>
          <p style={{
            fontFamily: 'Space Mono, monospace', fontSize: '11px',
            letterSpacing: '3px', color: '#ff5a1f',
            marginBottom: '16px', textTransform: 'uppercase',
          }}>
            EST. 2026
          </p>
          <p style={{ fontSize: '16px', lineHeight: 1.8, color: '#cfcac0', marginBottom: '20px' }}>
            The Drop Yard is a multi-brand streetwear platform built for independent creators — 
            people with ideas, aesthetics, and something to say, but not necessarily the time 
            or resources to run a full storefront.
          </p>
          <p style={{ fontSize: '16px', lineHeight: 1.8, color: '#cfcac0', marginBottom: '20px' }}>
            Each brand on this platform gets its own world — its own identity, its own products, 
            its own lane. No inventory. No upfront costs. Just your vision, produced on demand 
            and shipped directly to your customers.
          </p>
          <p style={{ fontSize: '16px', lineHeight: 1.8, color: '#cfcac0' }}>
            We built this because great ideas shouldn't require a warehouse, a team, or a 
            massive budget to exist in the world.
          </p>
        </section>

        {/* Divider */}
        <div style={{ height: '1px', background: 'rgba(255,255,255,0.1)', marginBottom: '60px' }} />

        {/* For Creators section */}
        <section style={{ marginBottom: '60px' }}>
          <h2 style={{
            fontFamily: 'Big Shoulders Stencil, sans-serif',
            fontSize: 'clamp(32px, 6vw, 56px)',
            fontWeight: 900, textTransform: 'uppercase',
            lineHeight: 0.9, marginBottom: '24px',
            color: '#f4f1ea',
          }}>
            GOT A BRAND?
          </h2>
          <p style={{ fontSize: '16px', lineHeight: 1.8, color: '#cfcac0', marginBottom: '20px' }}>
            The Drop Yard is open to independent creators who want a home for their brand 
            without the overhead. If you have original designs and a vision, we want to hear from you.
          </p>

          <div style={{ marginBottom: '32px' }}>
            {[
              { title: 'YOUR DESIGNS', body: 'Bring your artwork, your aesthetic, your story. We review all brands for content standards but every label on the platform stands on equal ground.' },
              { title: 'NO INVENTORY REQUIRED', body: 'We work with print-on-demand fulfillment — products are made when orders come in. No upfront stock, no minimums, no risk.' },
              { title: 'FLEXIBLE FULFILLMENT', body: 'Prefer to ship products yourself? That works too. We\'re here to give you a platform, not lock you into one way of doing things.' },
              { title: 'DESIGN SERVICES', body: 'Need help bringing an idea to life? Design services are available for an additional fee. Reach out to discuss.' },
              { title: 'REVENUE SHARING', body: 'Details available on inquiry. We believe creators should be paid fairly for their work.' },
            ].map(({ title, body }) => (
              <div key={title} style={{
                borderLeft: '2px solid #ff5a1f',
                paddingLeft: '20px',
                marginBottom: '24px',
              }}>
                <p style={{
                  fontFamily: 'Space Mono, monospace', fontSize: '11px',
                  letterSpacing: '2px', color: '#ff5a1f',
                  marginBottom: '8px', textTransform: 'uppercase',
                }}>
                  {title}
                </p>
                <p style={{ fontSize: '15px', lineHeight: 1.7, color: '#cfcac0', margin: 0 }}>
                  {body}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Divider */}
        <div style={{ height: '1px', background: 'rgba(255,255,255,0.1)', marginBottom: '60px' }} />

        {/* Contact section */}
        <section>
          <h2 style={{
            fontFamily: 'Big Shoulders Stencil, sans-serif',
            fontSize: 'clamp(32px, 6vw, 56px)',
            fontWeight: 900, textTransform: 'uppercase',
            lineHeight: 0.9, marginBottom: '24px',
            color: '#f4f1ea',
          }}>
            GET IN TOUCH
          </h2>
          <p style={{ fontSize: '16px', lineHeight: 1.8, color: '#cfcac0', marginBottom: '32px' }}>
            Questions about an order, interested in bringing your brand to the yard, or just want to talk?
            Drop us a line.
          </p>

                    <div>
            <p style={{
              fontFamily: 'Space Mono, monospace', fontSize: '13px',
              color: '#6b6b63', marginBottom: '24px',
            }}>
              OR EMAIL US DIRECTLY AT{' '}
              <a href="mailto:contact@shopthedropyard.com" style={{ color: '#ff5a1f' }}>
                CONTACT@SHOPTHEDROPYARD.COM
              </a>
            </p>
          </div>
        </section>

      </div>
    </main>
  )
}
