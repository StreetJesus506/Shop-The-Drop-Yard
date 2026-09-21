import './globals.css'
import { CartProvider } from '@/lib/cartContext'
import { Inter, Big_Shoulders_Display } from 'next/font/google'
import dynamic from 'next/dynamic'

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap', 
})

const bigShoulders = Big_Shoulders_Display({
  subsets: ['latin'],
  weight: ['900'],
  variable: '--font-stencil',
  display: 'swap',
})

const Cart = dynamic(() => import('@/components/Cart'), {
  ssr: false,
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
  other: {
    rel: 'preconnect',
    url: 'https://printify.com',
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
  email: 'contact@shoptropdyard.com',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.className} ${bigShoulders.variable}`}>
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
