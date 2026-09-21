import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import CartIcon from '@/components/CartIcon'
import CategoryBar from '@/components/CategoryBar'
import ShareButtons from '@/components/ShareButtons'
import { generateAltText } from '@/lib/altText'

export const dynamic = 'force-dynamic'

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
    ethos: 'What history tries to bury.',
    accent: '#c9a24a',
    bg: '#0b0b0b',
    text: '#ece4cf',
    shopId: process.env.PRINTIFY_SHOP_UNPOPULAR,
  },
  deadair: {
    name: 'Dead Air Vintage',
    full: 'Dead Air Vintage',
    ethos: 'Cult cinema. Retro pop culture. Channel surf style. Rerun energy.',
    accent: '#2ee6d6',
    bg: '#08080f',
    text: '#dfe6f0',
    shopId: process.env.PRINTIFY_SHOP_DEADAIR,
  },
  streetjesus: {
    name: 'Street Jesus Got Soul',
    full: 'Street Jesus Got Soul',
    ethos: '4 Elements Culture',
    accent: '#f4f1ea',
    bg: '#0d0d0d',
    text: '#e8e8e8',
    shopId: process.env.PRINTIFY_SHOP_STREETJESUS,
  },
}

export async function generateMetadata({ params }) {
  const brand = brands[params.id]
  if (!brand) return {}

  return {
    title: `${brand.name} | The Drop Yard`,
    description: brand.ethos,
    keywords: `${brand.name}, streetwear, clothing, independent brand, The Drop Yard`,
    openGraph: {
      title: `${brand.name} | The Drop Yard`,
      description: brand.ethos,
      url: `https://shopthedropyard.com{params.id}`,
      siteName: 'The Drop Yard',
      type: 'website',
    },
    twitter: {
      card: 'summary',
      title: `${brand.name} | The Drop Yard`,
      description: brand.ethos,
    },
  }
}

async function getProducts(shopId) {
  try {
    let allProducts = []
    let page = 1
    let hasMore = true

    while (hasMore) {
      const res = await fetch(
        `https://printify.com{shopId}/products.json?limit=50&page=${page}`,
        {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${process.env.PRINTIFY_API_KEY}`,
            'Content-Type': 'application/json'
          },
          cache: 'no-store'
        }
      )
      const data = await res.json()
      const products = data.data || []
      allProducts = [...allProducts, ...products]
      
      if (products.length < 50) {
        hasMore = false
      } else {
        page++
      }
    }

    return allProducts
      .filter(p => p.visible === true)
      .sort((a, b) => a.title.localeCompare(b.title))

  } catch (err) {
    return []
  }
}

const CATEGORY_ORDER = [
  'T-SHIRTS',
  'HOODIES & SWEATSHIRTS',
  'HEADWEAR',
  'BOTTOMS',
  'SWIMWEAR',
  'FOOTWEAR',
  'KIDS',
  'HOME & LIVING',
  'ACCESSORIES',
  'EVERYTHING ELSE',
]

const CATEGORY_KEYWORDS = {
  'T-SHIRTS': ['tee', 't-shirt', 'tank', 'top', 'crop'],
  'HOODIES & SWEATSHIRTS': ['hoodie', 'sweatshirt', 'crewneck', 'pullover', 'zip-up', 'fleece'],
  'HEADWEAR': ['hat', 'cap', 'beanie', 'snapback', 'trucker', 'bucket hat', 'dad hat', 'visor', 'beret'],
  'BOTTOMS': ['shorts', 'joggers', 'sweatpants', 'pants', 'leggings', 'skirt'],
  'SWIMWEAR': ['swimsuit', 'bikini', 'board shorts', 'swim', 'trunks'],
  'FOOTWEAR': ['sneakers', 'slides', 'boots', 'shoes', 'slippers', 'socks'],
  'KIDS': ['kids', 'youth', 'toddler', 'baby', 'infant', 'children'],
  'HOME & LIVING': ['pillow', 'mug', 'blanket', 'poster', 'print', 'canvas', 'tapestry', 'towel', 'rug', 'coaster', 'bottle', 'tumbler'],
  'ACCESSORIES': ['tote', 'bag', 'backpack', 'case', 'sticker', 'patch', 'pin', 'lanyard', 'wallet', 'belt', 'mask', 'keychain', 'jewelry', 'necklace', 'bracelet'],
}

function categorizeProducts(products) {
  const grouped = {}
  const assigned = new Set()

  for (const category of CATEGORY_ORDER.slice(0, -1)) {
    const keywords = CATEGORY_KEYWORDS[category]
    const matches = products.filter(p => {
      const title = p.title.toLowerCase()
      return keywords.some(k => {
        const regex = new RegExp(`\\b${k}\\b`, 'i')
        return regex.test(title)
      })
    })
    if (matches.length > 0) {
      grouped[category] = matches
      matches.forEach(p => assigned.add(p.id))
    }
  }

  const remainder = products.filter(p => !assigned.has(p.id))
  if (remainder.length > 0) {
    grouped['EVERYTHING ELSE'] = remainder
  }

  return grouped
}

export default async function BrandPage({ params }) {
  const brand = brands[params.id]
  if (!brand) notFound()

  const products = await getProducts(brand.shopId)
  const groupedProducts = categorizeProducts(products)
  
  let globalImageIndex = 0

  return (
    <main style={{ minHeight: '100vh', background: brand.bg, color: brand.text }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            {
              '@type': 'ListItem',
              position: 1,
              name: 'Home',
              item: 'https://shopthedropyard.com',
            },
            {
              '@type': 'ListItem',
              position: 2,
              name: brand.name,
              item: `https://shopthedropyard.com{params.id}`,
            },
          ],
        })}}
      />
      {/* Header */}
      <header style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '18px 24px', borderBottom: '1px solid rgba(255,255,255,0.1)',
      }}>
        <Link href="/" style={{
          fontFamily: 'Big Shoulders Stencil, sans-serif',
          fontSize: '12px', letterSpacing: '1px',
          background: 'none', border: `1px solid ${brand.text}`,
          color: brand.text, padding: '8px 14px',
          textDecoration: 'none', textTransform: 'uppercase',
        }}>
          ← BACK TO THE YARD
        </Link>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
          <span style={{
            fontFamily: 'Big Shoulders Stencil, sans-serif',
            fontSize: '22px', fontWeight: 700, textTransform: 'uppercase',
          }}>
            {brand.name}
          </span>
          {params.id === 'streetjesus' && (
            <Link href="/about/streetjesus" style={{
              fontFamily: 'Space Mono, monospace',
              fontSize: '10px', letterSpacing: '1px',
              color: '#a3a39c', textDecoration: 'none',
              textTransform: 'uppercase',
            }}>
              DJ BIO & BOOKING →
            </Link>
          )}
        </div>

        <CartIcon color={brand.text} />
      </header>

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
        <div style={{ marginTop: '24px' }}>
          <ShareButtons
            url={`https://shopthedropyard.com{params.id}`}
            title={`${brand.name} | The Drop Yard`}
            image={null}
          />
        </div>
      </div>
          
      <p style={{
        maxWidth: '1180px', margin: '0 auto 16px',
        padding: '0 24px',
        fontFamily: 'Space Mono, monospace',
        fontSize: '11px', color: '#a3a39c',
        letterSpacing: '1px',
      }}>
        PRICES DO NOT INCLUDE SHIPPING — CALCULATED AT CHECKOUT
      </p>

      {/* Category navigation bar */}
      {Object.keys(groupedProducts).length > 1 && (
        <CategoryBar 
          categories={CATEGORY_ORDER.filter(cat => groupedProducts[cat])} 
          accent={brand.accent} 
        />
      )}

      {/* Products by category */}
      <div style={{ maxWidth: '1180px', margin: '0 auto', padding: '0 24px 80px' }}>
        {products.length === 0 && (
          <p style={{ opacity: 0.5, fontFamily: 'Space Mono, monospace', fontSize: '13px' }}>
            No products found. Make sure products are published in Printify.
          </p>
        )}
        {CATEGORY_ORDER.filter(cat => groupedProducts[cat]).map(category => (
          <section 
            key={category} 
            id={category.replace(/\s+/g, '-').replace(/&/g, 'and')}
            style={{ marginBottom: '48px' }}
          >
            {/* Category header */}
            <div style={{
              display: 'flex', alignItems: 'center', gap: '16px',
              marginBottom: '24px',
              borderBottom: `1px solid ${brand.accent}33`,
              paddingBottom: '12px',
            }}>
              <h2 style={{
                fontFamily: 'Big Shoulders Stencil, sans-serif',
                fontSize: '20px', fontWeight: 700,
                textTransform: 'uppercase', letterSpacing: '2px',
                color: brand.accent, margin: 0,
              }}>
                {category}
              </h2>
              <span style={{
                fontFamily: 'Space Mono, monospace',
                fontSize: '11px', color: '#a3a39c',
              }}>
              {groupedProducts[category].length} {groupedProducts[category].length === 1 ? 'ITEM' : 'ITEMS'}
            </span>
          </div>

          {/* Product grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
            gap: '28px',
          }}>
            {groupedProducts[category].map(product => {
              const image = product.images && product.images.length > 0 ? product.images[0].src : null
              const enabledVariant = product.variants ? product.variants.find(v => v.is_enabled) : null
              const price = enabledVariant ? enabledVariant.price : null
              const formattedPrice = price ? `$${(price / 100).toFixed(2)}` : null
              
              if (image) {
                globalImageIndex++
              }
              const isPriorityImage = globalImageIndex <= 4

              return (
                <Link
                  key={product.id}
                  href={`/products/${params.id}/${product.id}`}
                  style={{ textDecoration: 'none', color: brand.text }}
                >
                  <div style={{
                    aspectRatio: '4/5',
                    background: 'rgba(255,255,255,0.05)',
                    marginBottom: '12px',
                    overflow: 'hidden',
                    position: 'relative'
                  }}>
                    {image && (
                      <Image
                        src={image}
                        alt={generateAltText({
                          title: product.title,
                          brandName: brand.name,
                          category: CATEGORY_ORDER.find(cat => {
                            const keywords = CATEGORY_KEYWORDS[cat]
                            return keywords ? keywords.some(k => new RegExp(`\\b${k}\\b`, 'i').test(product.title)) : false
                          }),
                        })}
                        fill
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                        priority={isPriorityImage}
                        style={{ objectFit: 'cover' }}
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
                </Link>
              )
            })}
          </div>
        </section>
      ))}
    </div>
  </main>
)
}
