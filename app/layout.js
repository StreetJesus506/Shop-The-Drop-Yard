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

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          {children}
          <Cart />
        </CartProvider>
      </body>
    </html>
  )
}
