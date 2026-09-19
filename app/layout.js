import './globals.css'
import { CartProvider } from '@/lib/cartContext'
import Cart from '@/components/Cart'

export const metadata = {
  title: 'The Drop Yard',
  description: 'One yard. Every label. P.R.O., The Nude Farmer, Unpopular Demand, Dead Air.',
  keywords: 'streetwear, clothing, independent brands, print on demand',
  openGraph: {
    title: 'The Drop Yard',
    description: 'One yard. Every label.',
    url: 'https://shopthedropyard.com',
    siteName: 'The Drop Yard',
    type: 'website',
  },
}

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'The Drop Yard',
  url: 'https://shopthedropyard.com',
  logo: 'https://shopthedropyard.com/logos/Logo-Red.png',
  contactPoint: {
    '@type': 'ContactPoint',
    email: 'contact@shopthedropyard.com',
    contactType: 'customer service',
  },
  sameAs: [
    'https://www.instagram.com/streetjesusgotsoul',
  ],
}

const storeSchema = {
  '@context': 'https://schema.org',
  '@type': 'ClothingStore',
  name: 'The Drop Yard',
  url: 'https://shopthedropyard.com',
  description: 'Independent multi-brand streetwear platform. P.R.O., The Nude Farmer, Unpopular Demand, Dead Air Cult Classics, Street Jesus Got Soul.',
  currenciesAccepted: 'USD',
  paymentAccepted: 'Credit Card, Apple Pay, Google Pay',
  priceRange: '$$',
  email: 'contact@shopthedropyard.com',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(storeSchema) }}
        />
        <CartProvider>
          {children}
          <Cart />
        </CartProvider>
      </body>
    </html>
  )
}
