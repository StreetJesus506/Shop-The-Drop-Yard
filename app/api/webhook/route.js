import { Resend } from 'resend'
import Stripe from 'stripe'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

async function createPrintifyOrder(session) {
  try {
    const items = JSON.parse(session.metadata?.items || '[]')
console.log('Printify order items:', JSON.stringify(items))
console.log('Shipping details:', JSON.stringify(session.shipping_details))
console.log('Customer details:', JSON.stringify(session.customer_details))
if (items.length === 0) return


    // Group items by shop
    const byShop = {}
    items.forEach(item => {
      if (!byShop[item.shopId]) byShop[item.shopId] = []
      byShop[item.shopId].push(item)
    })

    const shipping = session.shipping_details || session.shipping
    const address = shipping?.address
    const name = session.customer_details?.name || ''
    const email = session.customer_details?.email || ''
    const nameParts = name.split(' ')
    const firstName = nameParts[0] || ''
    const lastName = nameParts.slice(1).join(' ') || ''

    // Create one order per shop
    for (const [shopId, shopItems] of Object.entries(byShop)) {
      const orderData = {
        external_id: session.id,
        label: `Drop Yard - ${session.id.slice(-8)}`,
        line_items: shopItems.map(item => ({
          product_id: item.productId,
          variant_id: parseInt(item.variantId),
          quantity: item.quantity,
        })),
        shipping_method: 1,
        send_shipping_notification: true,
        address_to: {
          first_name: firstName,
          last_name: lastName,
          email: email,
          phone: '',
          country: address?.country || 'US',
          region: address?.state || '',
          address1: address?.line1 || '',
          address2: address?.line2 || '',
          city: address?.city || '',
          zip: address?.postal_code || '',
        },
      }

      const res = await fetch(
        `https://api.printify.com/v1/shops/${shopId}/orders.json`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${process.env.PRINTIFY_API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(orderData),
        }
      )

      if (!res.ok) {
        const err = await res.json()
        console.error('Printify order error:', err)
      }
    }
  } catch (err) {
    console.error('createPrintifyOrder error:', err)
  }
}

export async function POST(req) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
  const resend = new Resend(process.env.RESEND_API_KEY)

  const body = await req.text()
  const sig = req.headers.get('stripe-signature')

  let event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    )
    if (event.type === 'checkout.session.completed') {
      event.data.object = await stripe.checkout.sessions.retrieve(
        event.data.object.id,
        { expand: ['shipping_details', 'line_items'] }
      )
    }

  } catch (err) {
    return new Response(`Webhook Error: ${err.message}`, { status: 400 })
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object

    // Create Printify order
    await createPrintifyOrder(session)

    // Send notification email
    const customerEmail = session.customer_details?.email || 'Unknown'
    const customerName = session.customer_details?.name || 'Unknown'
    const amount = (session.amount_total / 100).toFixed(2)
    const currency = session.currency.toUpperCase()

    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: process.env.NOTIFICATION_EMAIL,
      subject: `💰 New Sale — $${amount} ${currency}`,
      html: `
        <div style="font-family: monospace; background: #1c1b19; color: #f4f1ea; padding: 32px; border-radius: 8px;">
          <h1 style="color: #ff5a1f; font-size: 24px; margin-bottom: 24px;">THE DROP YARD — NEW SALE</h1>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; color: #6b6b63;">CUSTOMER</td>
              <td style="padding: 8px 0;">${customerName}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #6b6b63;">EMAIL</td>
              <td style="padding: 8px 0;">${customerEmail}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #6b6b63;">AMOUNT</td>
              <td style="padding: 8px 0; color: #ff5a1f; font-size: 20px;">$${amount} ${currency}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #6b6b63;">SESSION ID</td>
              <td style="padding: 8px 0; font-size: 11px;">${session.id}</td>
            </tr>
          </table>
          <p style="margin-top: 24px; color: #6b6b63; font-size: 12px;">Log in to Stripe to view full order details.</p>
        </div>
      `,
    })
  }

  return new Response('OK', { status: 200 })
}
