import { notFound } from 'next/navigation'
import AddToCart from '@/components/AddToCart'

const shopIds = {
  pro: process.env.PRINTIFY_SHOP_PRO,
  nudefarmer: process.env.PRINTIFY_SHOP_NUDEFARMER,
  unpopular: process.env.PRINTIFY_SHOP_UNPOPULAR,
  deadair: process.env.PRINTIFY_SHOP_DEADAIR,
}

const brandStyles = {
  pro: { accent: '#b01e28', bg: '#0f0a0a', text: '#f3e9e2', name: 'P.R.O.' },
  nudefarmer: { accent: '#8a9e6a', bg: '#0d0f0a', text: '#f1ead4', name: 'The Nude Farmer' },
  unpopular: { accent: '#c9a24a', bg: '#0b0b0b', text: '#ece4cf', name: 'Unpopular Demand' },
  deadair: { accent: '#2ee6d6', bg: '#08080f', text: '#dfe6f0', name: 'Dead Air' },
}

async function getProduct(shopId, productId) {
  try {
    const res = await fetch(
      `https://api.printify.com/v1/shops/${shopId}/products/${productId}.json`,
      {
        headers: { 'Authorization': `Bearer ${process.env.PRINTIFY_API_KEY}` },
        next: { revalidate: 300 },
      }
    )
    if (!res.ok) return null
    return await res.json()
  } catch {
    return null
  }
}

export default async function ProductPage({ params }) {
  const shopId = shopIds[params.brand]
  const style = brandStyles[params.brand]
  if (!shopId || !style) notFound()

  const product = await getProduct(shopId, params.id)
  if (!product) notFound()

  const images = product.images?.filter(img => img.is_default || img.position === 'front') || product.images || []
  const uniqueImages = images.slice(0, 6)

  // Parse variants into color and size groups
  const variants = product.variants?.filter(v => v.is_enabled) || []
  
  const colors = [...new Map(variants.map(v => {
    const parts = v.title.split(' / ')
    const size = parts[0]
    const color = parts[1] || 'Default'
    return [color, { color, hex: null }]
  })).values()]

  const sizeOrder = ['XS', 'S', 'S/M', 'M', 'M/L', 'L', 'XL', '2XL', '3XL', '4XL', '5XL']

const normalizeSize = (s) => s
  .replace('X-Small', 'XS')
  .replace('Small', 'S')
  .replace('Medium', 'M')
  .replace('Large', 'L')
  .replace('X-Large', 'XL')
  .replace('2X-Large', '2XL')
  .replace('3X-Large', '3XL')
  .replace('4X-Large', '4XL')
  .replace('5X-Large', '5XL')
  .trim()

const sizes = [...new Set(variants.map(v => v.title.split(' / ')[0]))]
  .sort((a, b) => {
    const ai = sizeOrder.indexOf(normalizeSize(a))
    const bi = sizeOrder.indexOf(normalizeSize(b))
    if (ai === -1 && bi === -1) return a.localeCompare(b)
    if (ai === -1) return 1
    if (bi === -1) return -1
    return ai - bi
  })



  const price = variants[0]?.price
  const formattedPrice = price ? `$${(price / 100).toFixed(2)}` : ''

  return (
    <main style={{ minHeight: '100vh', background: style.bg, color: style.text }}>
      {/* Header */}
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '18px 24px', borderBottom: '1px solid rgba(255,255,255,0.1)',
      }}>
        <a href={`/brands/${params.brand}`} style={{
          fontFamily: 'Big Shoulders Stencil, sans-serif',
          fontSize: '12px', letterSpacing: '1px',
          border: `1px solid ${style.text}`,
          color: style.text, padding: '8px 14px',
          textDecoration: 'none', textTransform: 'uppercase',
        }}>
          ← {style.name}
        </a>
        <a href="/" style={{
          fontFamily: 'Big Shoulders Stencil, sans-serif',
          fontSize: '14px', fontWeight: 700,
          color: style.accent, textDecoration: 'none',
          textTransform: 'uppercase',
        }}>
          THE DROP YARD
        </a>
      </div>

      {/* Product */}
      <div style={{
        maxWidth: '1180px', margin: '0 auto',
        padding: '40px 24px 80px',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '48px',
      }}>
        {/* Images */}
        <div>
          {/* Main image */}
          <div style={{
            aspectRatio: '4/5', background: 'rgba(255,255,255,0.05)',
            marginBottom: '12px', overflow: 'hidden',
          }}>
            {uniqueImages[0] && (
              <img
                src={uniqueImages[0].src}
                alt={product.title}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            )}
          </div>
          {/* Thumbnail row */}
          {uniqueImages.length > 1 && (
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {uniqueImages.slice(1).map((img, i) => (
                <div key={i} style={{
                  width: '72px', height: '72px',
                  background: 'rgba(255,255,255,0.05)',
                  overflow: 'hidden', flexShrink: 0,
                }}>
                  <img
                    src={img.src}
                    alt={`${product.title} ${i + 2}`}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Info + Add to cart */}
        <div>
          <p style={{
            fontFamily: 'Space Mono, monospace', fontSize: '11px',
            color: style.accent, letterSpacing: '2px',
            textTransform: 'uppercase', margin: '0 0 8px',
          }}>
            {style.name}
          </p>
          <h1 style={{
            fontFamily: 'Big Shoulders Stencil, sans-serif',
            fontSize: 'clamp(28px, 5vw, 52px)',
            fontWeight: 900, textTransform: 'uppercase',
            lineHeight: 1, margin: '0 0 16px',
          }}>
            {product.title}
          </h1>
          <p style={{
            fontFamily: 'Space Mono, monospace',
            fontSize: '22px', color: style.accent,
            margin: '0 0 28px',
          }}>
            {formattedPrice}
          </p>

          {/* Description */}
          {product.description && (
            <div
              dangerouslySetInnerHTML={{ __html: product.description }}
              style={{
                fontSize: '14px', lineHeight: 1.6,
                opacity: 0.75, marginBottom: '32px',
                maxWidth: '480px',
              }}
            />
          )}

          {/* Add to cart — client component */}
          <AddToCart
            product={{
              id: product.id,
              shopId,
              title: product.title,
              images: product.images,
            }}
            variants={variants}
            sizes={sizes}
            colors={colors}
            style={style}
          />
        </div>
      </div>
    </main>
  )
}
