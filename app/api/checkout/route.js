import Stripe from 'stripe'

export const dynamic = 'force-dynamic'

export async function POST(req) {
  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
    const { items } = await req.json()

    if (!items || items.length === 0) {
      return Response.json({ error: 'No items' }, { status: 400 })
    }

    const lineItems = items.map(item => ({
      price_data: {
        currency: 'usd',
        product_data: {
          name: String(item.title),
          description: String(item.variantTitle || ''),
        },
        unit_amount: Math.round(Number(item.price)),
      },
      quantity: Math.round(Number(item.quantity)),
    }))

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/order-confirmation?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}`,
      shipping_address_collection: {
  allowed_countries: [
    'US', 'GB', 'CA', 'AU', 'DE', 'FR', 'IT', 'ES', 'NL', 
    'SE', 'NO', 'DK', 'FI', 'BE', 'AT', 'CH', 'NZ', 'JP',
    'SG', 'IE', 'PT', 'PL', 'CZ', 'HU', 'RO', 'GR', 'MX',
    'BR', 'ZA', 'IN', 'KR',
  ],
},

      shipping_options: [
        {
          shipping_rate_data: {
            type: 'fixed_amount',
            fixed_amount: { amount: 0, currency: 'usd' },
            display_name: 'Standard Shipping',
            delivery_estimate: {
              minimum: { unit: 'business_day', value: 5 },
              maximum: { unit: 'business_day', value: 10 },
            },
          },
        },
      ],
      metadata: {
        items: JSON.stringify(items.map(item => ({
          shopId: item.shopId,
          productId: item.productId,
          variantId: item.variantId,
          quantity: item.quantity,
        }))),
      },
    })

    return Response.json({ url: session.url })

  } catch (err) {
    return Response.json({ error: err.message }, { status: 500 })
  }
}
