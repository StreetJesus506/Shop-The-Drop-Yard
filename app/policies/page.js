export const metadata = {
  title: 'Policies | The Drop Yard',
  description: 'Shipping, returns and refund policies for The Drop Yard.',
}

export default function PoliciesPage() {
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
        <div style={{ width: '100px' }} />
      </div>

      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '60px 24px 80px' }}>

        {/* Title */}
        <h1 style={{
          fontFamily: 'Big Shoulders Stencil, sans-serif',
          fontSize: 'clamp(48px, 10vw, 96px)',
          fontWeight: 900, textTransform: 'uppercase',
          lineHeight: 0.9, marginBottom: '32px',
          color: '#ff5a1f',
        }}>
          POLICIES
        </h1>

        <div style={{ height: '1px', background: 'rgba(255,255,255,0.1)', marginBottom: '48px' }} />

        {/* Shipping Policy */}
        <section style={{ marginBottom: '56px' }}>
          <h2 style={{
            fontFamily: 'Big Shoulders Stencil, sans-serif',
            fontSize: 'clamp(28px, 5vw, 42px)',
            fontWeight: 900, textTransform: 'uppercase',
            marginBottom: '20px', color: '#f4f1ea',
          }}>
            SHIPPING
          </h2>

          {[
            {
              title: 'PRODUCTION TIME',
              body: 'All products are made to order. Please allow 2–5 business days for production before your order ships.',
            },
            {
              title: 'US SHIPPING',
              body: 'Standard shipping within the United States typically takes 5–10 business days after production. Flat rate of $5.99.',
            },
            {
              title: 'INTERNATIONAL SHIPPING',
              body: 'International orders typically arrive within 10–21 business days after production depending on destination and customs. Flat rate of $14.99. Please note that international orders may be subject to customs fees or import duties charged by your country — these are the responsibility of the recipient.',
            },
            {
              title: 'TRACKING',
              body: 'Once your order ships you will receive a tracking number via email. Allow 24–48 hours for tracking info to update after receiving your shipping notification.',
            },
            {
              title: 'DELAYS',
              body: 'Shipping times are estimates and not guaranteed. The Drop Yard is not responsible for delays caused by carriers, customs, or circumstances outside our control.',
            },
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
        </section>

        <div style={{ height: '1px', background: 'rgba(255,255,255,0.1)', marginBottom: '48px' }} />

        {/* Returns Policy */}
        <section style={{ marginBottom: '56px' }}>
          <h2 style={{
            fontFamily: 'Big Shoulders Stencil, sans-serif',
            fontSize: 'clamp(28px, 5vw, 42px)',
            fontWeight: 900, textTransform: 'uppercase',
            marginBottom: '20px', color: '#f4f1ea',
          }}>
            RETURNS & EXCHANGES
          </h2>

          {[
            {
              title: 'ALL SALES FINAL',
              body: 'Because every item is made to order specifically for you, we do not accept returns or offer refunds for change of mind, incorrect size selection, or similar reasons. Please review size guides carefully before purchasing.',
            },
            {
              title: 'DAMAGED OR INCORRECT ITEMS',
              body: 'If your item arrives damaged, defective, or is the wrong item entirely, we will exchange it at no cost to you. Contact us at contact@shopthedropyard.com within 7 days of delivery with your order number and a photo of the issue.',
            },
            {
              title: 'EXCHANGE PROCESS',
              body: 'Approved exchanges will be processed and a replacement item sent within 5–10 business days. We do not offer cash refunds — exchanges only.',
            },
            {
              title: 'LOST PACKAGES',
              body: 'If your tracking shows delivered but you have not received your package, please check with neighbors and your local post office first. If the package is confirmed lost by the carrier, contact us and we will work with you to resolve the issue.',
            },
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
        </section>

        <div style={{ height: '1px', background: 'rgba(255,255,255,0.1)', marginBottom: '48px' }} />

        {/* Contact */}
        <section>
          <h2 style={{
            fontFamily: 'Big Shoulders Stencil, sans-serif',
            fontSize: 'clamp(28px, 5vw, 42px)',
            fontWeight: 900, textTransform: 'uppercase',
            marginBottom: '20px', color: '#f4f1ea',
          }}>
            QUESTIONS?
          </h2>
          <p style={{ fontSize: '15px', lineHeight: 1.7, color: '#cfcac0', marginBottom: '16px' }}>
            For any order issues or policy questions reach out to us at:
          </p>
          <a
            href="mailto:contact@shopthedropyard.com"
            style={{
              fontFamily: 'Space Mono, monospace',
              fontSize: '13px', color: '#ff5a1f',
              textDecoration: 'none',
            }}
          >
            CONTACT@SHOPTHEDROPYARD.COM
          </a>
        </section>

      </div>
    </main>
  )
}
