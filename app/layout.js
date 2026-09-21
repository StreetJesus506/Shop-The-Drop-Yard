import './globals.css'
import { CartProvider } from '@/lib/cartContext'
import { Inter } from 'next/font/google' // 1. Add optimized Google Font
import dynamic from 'next/dynamic' // 2. Add Dynamic Import utility

// This sets up your font to download efficiently without blocking rendering
const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap', 
})

// 3. Lazily load the Cart component so it doesn't block the initial page paint
const Cart = dynamic(() => import('@/components/Cart'), {
  ssr: false, // Prevents server-rendering code the user can't see yet
})

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
    // 4. Added the optimized font class to the HTML container
    <html lang="en" className={inter.className}>
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
          {/* This now only hydrates/runs code when necessary, lowering Main Thread work */}
          <Cart />
        </CartProvider>
      </body>
    </html>
  )
}
