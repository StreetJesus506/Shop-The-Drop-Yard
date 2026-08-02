import { notFound } from 'next/navigation'
import CartIcon from '@/components/CartIcon'

const brands = {
  pro: {
    name: 'P.R.O.',
    full: 'Proletariat Revolution Outfitters',
    ethos: 'Clothing for the working class.',
    accent: '#b01e28',
    bg: '#0f0a0a',
    text: '#f3e9e2',
    shopId: process.env.PRINTIFY_SHOP_PRO,
  },
  nudefarmer: {
    name: 'The Nude Farmer',
    full: 'The Nude Farmer',
    ethos: 'Farm to fit designs for the high minded.',
    accent: '#8a9e6a',
    bg: '#0d0f0a',
    text: '#f1ead4',
    shopId: process.env.PRINTIFY_SHOP_NUDEFARMER,
  },
  unpopular: {
    name: 'Unpopular Demand',
    full: 'Unpopular Demand',
    ethos: 'Wearing what history tries to bury.',
    accent: '#c9a24a',
    bg: '#0b0b0b',
    text: '#ece4cf',
    shopId: process.env.PRINTIFY_SHOP_UNPOPULAR,
  },
  deadair: {
    name: 'Dead Air',
    full: 'Dead Air',
    ethos: 'Cult cinema. Retro pop culture. Channel surf style, rerun energy.',
    accent: '#2ee6d6',
    bg: '#08080f',
    text: '#dfe6f0',
    shopId: process.env.PRINTIFY_SHOP_DEADAIR,
  },
}

async function getProducts(shopId) {
  try {
    const res = await fetch(
      `https://api.printify.com/v1/shops/${shopId}/products.json?limit=20`,
      {
        headers: {
          'Authorization': `Bearer ${process.env.PRINTIFY_API_KEY}`,
        },
        next: { revalidate: 300 },
      }
    )
    const data = await res.json()
    return (data.data || []).filter(p => p.visible === true).sort((a, b) => a.title.localeCompare(b.title))


  } catch (err) {
    return []
  }
}

export default async function BrandPage({ params }) {
  const brand = brands[params.id]
  if (!brand) notFound()

  const products = await getProducts(brand.shopId)

  return (
    <main style={{ minHeight: '100vh', background: brand.bg, color: brand.text }}>
      {/* Header */}
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '18px 24px', borderBottom: '1px solid rgba(255,255,255,0.1)',
      }}>
        <a href="/" style={{
          fontFamily: 'Big Shoulders Stencil, sans-serif',
          fontSize: '12px', letterSpacing: '1px',
          background: 'none', border: `1px solid ${brand.text}`,
          color: brand.text, padding: '8px 14px',
          textDecoration: 'none', textTransform: 'uppercase',
        }}>
          ← BACK TO THE YARD
        </a>
        <span style={{
          fontFamily: 'Big Shoulders Stencil, sans-serif',
          fontSize: '22px', fontWeight: 700, textTransform: 'uppercase',
        }}>
          {brand.name}
        </span>
        <CartIcon color={brand.text} />

      </div>

      {/* Hero */}
      <div style={{ padding: '60px 24px 40px', maxWidth: '1180px', margin: '0 auto' }}>
        <h1 style={{
          fontFamily: 'Big Shoulders Stencil, sans-serif',
          fontSize: 'clamp(40px, 8vw, 88px)',
          lineHeight: 0.92, marginBottom: '16px',
          fontWeight: 900, textTransform: 'uppercase',
          color: brand.accent,
        }}>
          {brand.full}
        </h1>
        <p style={{ fontSize: '16px', opacity: 0.8, maxWidth: '480px' }}>
          {brand.ethos}
        </p>
      </div>

      {/* Products */}
      <div style={{
        maxWidth: '1180px', margin: '0 auto', padding: '0 24px 80px',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
        gap: '28px',
      }}>
        {products.length === 0 && (
          <p style={{ opacity: 0.5, fontFamily: 'Space Mono, monospace', fontSize: '13px' }}>
            No products found. Make sure products are published in Printify.
          </p>
        )}
        {products.map(product => {
          const image = product.images?.[0]?.src || null
          const enabledVariant = product.variants?.find(v => v.is_enabled)
const price = enabledVariant?.price

          const formattedPrice = price ? `$${(price / 100).toFixed(2)}` : null

          return (
            <a
              key={product.id}
              href={`/products/${params.id}/${product.id}`}
              style={{ textDecoration: 'none', color: brand.text }}
            >
              <div style={{
                aspectRatio: '4/5',
                background: 'rgba(255,255,255,0.05)',
                marginBottom: '12px',
                overflow: 'hidden',
              }}>
                {image && (
                  <img
                    src={image}
                    alt={product.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                )}
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <p style={{ fontFamily: 'Work Sans, sans-serif', fontSize: '14px', margin: 0, maxWidth: '75%' }}>
                  {product.title}
                </p>
                {formattedPrice && (
                  <p style={{ fontFamily: 'Space Mono, monospace', fontSize: '13px', margin: 0, color: brand.accent }}>
                    {formattedPrice}
                  </p>
                )}
              </div>
            </a>
          )
        })}
      </div>
    </main>
  )
}
