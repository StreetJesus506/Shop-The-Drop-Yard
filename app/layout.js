import './globals.css'
import { CartProvider } from '@/lib/cartContext'
import Cart from '@/components/Cart'
import { Big_Shoulders_Stencil_Display, Space_Mono, Work_Sans } from 'next/font/google'

const bigShouldersStencil = Big_Shoulders_Stencil_Display({
  subsets: ['latin'],
  weight: ['900'],
  variable: '--font-stencil',
  display: 'swap',
})

const spaceMono = Space_Mono({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-mono',
  display: 'swap',
})

const workSans = Work_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-sans',
  display: 'swap',
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
  }
}

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'The Drop Yard',
  url: 'https://shopthedropyard.com',
  logo: 'https://shopthedropyard.com',
  contactPoint: {
    '@type': 'ContactPoint',
    email: 'contact@shopthedropyard.com',
    contactType: 'customer service',
  },
  sameAs: [
    'https://instagram.com',
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
  priceRange: '\$\$',
  email: 'contact@shopthedropyard.com',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${bigShouldersStencil.variable} ${spaceMono.variable} ${workSans.variable}`}>
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
