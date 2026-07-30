import { Resend } from 'resend';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  const body = await req.text();
  const sig = req.headers.get('stripe-signature');

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    return new Response(`Webhook Error: ${err.message}`, { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;

    const customerEmail = session.customer_details?.email || 'Unknown';
    const customerName = session.customer_details?.name || 'Unknown';
    const amount = (session.amount_total / 100).toFixed(2);
    const currency = session.currency.toUpperCase();

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
    });
  }

  return new Response('OK', { status: 200 });
}
