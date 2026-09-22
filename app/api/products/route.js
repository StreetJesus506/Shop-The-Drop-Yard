import { NextResponse } from 'next/server'

const shopIds = {
  pro: process.env.PRINTIFY_SHOP_PRO,
  nudefarmer: process.env.PRINTIFY_SHOP_NUDEFARMER,
  unpopular: process.env.PRINTIFY_SHOP_UNPOPULAR,
  deadair: process.env.PRINTIFY_SHOP_DEADAIR,
  streetjesus: process.env.PRINTIFY_SHOP_STREETJESUS,
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const brand = searchParams.get('brand')
    
    const shopId = shopIds[brand]
    const apiKey = process.env.PRINTIFY_API_KEY

    // Secure fallback check if shop parameters or API keys are missing
    if (!shopId || !apiKey) {
      return NextResponse.json([])
    }

    const res = await fetch(
      `https://printify.com{shopId}/products.json?limit=12`,
      {
        method: 'GET',
        headers: { 
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        },
        next: { revalidate: 60 } // Cache data for 60 seconds to protect performance scores
      }
    )

    if (!res.ok) {
      return NextResponse.json([])
    }

    const data = await res.json()
    const products = (data.data || []).filter(p => p.visible === true)
    
    return NextResponse.json(products)
  } catch (err) {
    return NextResponse.json([])
  }
}
