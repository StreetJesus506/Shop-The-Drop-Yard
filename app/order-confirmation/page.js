import Stripe from 'stripe'

async function getSession(sessionId) {
  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ['line_items', 'customer_details'],
    })
    return session
  } catch {
    return null
  }
}

export default async function OrderConfirmation({ searchParams }) {
  const sessionId = searchParams?.session_id
  const session = sessionId ? await getSession(sessionId) : null

  return (
    <main style={{
      minHeight: '100vh',
      background: '#1c1b19',
      color: '#f4f1ea',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '40px 24px',
    }}>
      <div style={{ maxWidth: '560px', width: '100%' }}>

        {/* Header */}
        <a href="/" style={{
          fontFamily: 'Big Shoulders Stencil, sans-serif',
          fontSize: '24px', fontWeight: 900,
          color: '#ff5a1f', textDecoration: 'none',
          textTransform: 'uppercase', display: 'block',
          marginBottom: '48px',
        }}>
          THE DROP YARD
        </a>

        {session?.payment_status === 'paid' ? (
          <>
            {/* Success */}
            <div style={{
              fontFamily: 'Big Shoulders Stencil, sans-serif',
              fontSize: '64px', fontWeight: 900,
              textTransform: 'uppercase',
              lineHeight: 0.9, marginBottom: '16px',
              color: '#ff5a1f',
            }}>
              ORDER<br />CONFIRMED
            </div>

            <p style={{
              fontFamily: 'Space Mono, monospace',
              fontSize: '13px', color: '#6b6b63',
              marginBottom: '40px', lineHeight: 1.6,
            }}>
              Thanks {session.customer_details?.name?.split(' ')[0] || 'for your order'}. 
              A confirmation has been sent to {session.customer_details?.email}.
            </p>

            {/* Order summary */}
            <div style={{
              borderTop: '1px solid rgba(244,241,234,0.1)',
              paddingTop: '24px', marginBottom: '32px',
            }}>
              <p style={{
                fontFamily: 'Space Mono, monospace',
                fontSize: '11px', letterSpacing: '2px',
                color: '#6b6b63', marginBottom: '16px',
              }}>
                ORDER SUMMARY
              </p>

              {session.line_items?.data?.map((item, i) => (
                <div key={i} style={{
                  display: 'flex', justifyContent: 'space-between',
                  padding: '10px 0',
                  borderBottom: '1px solid rgba(244,241,234,0.06)',
                  fontSize: '14px',
                }}>
                  <span>{item.description || item.quantity + 'x ' + item.price?.product_data?.name}</span>
                  <span style={{
                    fontFamily: 'Space Mono, monospace',
                    color: '#ff5a1f',
                  }}>
                    ${(item.amount_total / 100).toFixed(2)}
                  </span>
                </div>
              ))}

              <div style={{
                display: 'flex', justifyContent: 'space-between',
                padding: '16px 0 0',
                fontFamily: 'Space Mono, monospace',
              }}>
                <span style={{ fontSize: '13px', color: '#6b6b63' }}>TOTAL PAID</span>
                <span style={{ fontSize: '18px', color: '#ff5a1f' }}>
                  ${(session.amount_total / 100).toFixed(2)}
                </span>
              </div>
            </div>

            {/* Shipping note */}
            <p style={{
              fontFamily: 'Space Mono, monospace',
              fontSize: '11px', color: '#6b6b63',
              lineHeight: 1.6, marginBottom: '32px',
            }}>
              YOUR ORDER WILL BE FULFILLED VIA PRINTIFY AND SHIPPED WITHIN 5–10 BUSINESS DAYS.
            </p>

            {/* Back to shop */}
            <a href="/" style={{
              display: 'inline-block',
              padding: '14px 28px',
              background: '#ff5a1f',
              color: '#1c1b19',
              textDecoration: 'none',
              fontFamily: 'Big Shoulders Stencil, sans-serif',
              fontSize: '14px', fontWeight: 700,
              textTransform: 'uppercase', letterSpacing: '1px',
            }}>
              BACK TO THE YARD →
            </a>
          </>
        ) : (
          <>
            {/* Fallback */}
            <div style={{
              fontFamily: 'Big Shoulders Stencil, sans-serif',
              fontSize: '48px', fontWeight: 900,
              textTransform: 'uppercase',
              lineHeight: 0.9, marginBottom: '16px',
            }}>
              THANK YOU
            </div>
            <p style={{
              fontFamily: 'Space Mono, monospace',
              fontSize: '13px', color: '#6b6b63',
              marginBottom: '32px',
            }}>
              Your order has been received.
            </p>
            <a href="/" style={{
              display: 'inline-block',
              padding: '14px 28px',
              background: '#ff5a1f',
              color: '#1c1b19',
              textDecoration: 'none',
              fontFamily: 'Big Shoulders Stencil, sans-serif',
              fontSize: '14px', fontWeight: 700,
              textTransform: 'uppercase', letterSpacing: '1px',
            }}>
              BACK TO THE YARD →
            </a>
          </>
        )}
      </div>
    </main>
  )
}
