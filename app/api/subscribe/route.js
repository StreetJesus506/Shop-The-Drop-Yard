export const dynamic = 'force-dynamic'

export async function POST(req) {
  try {
    const { email } = await req.json()

    if (!email) {
      return Response.json({ error: 'Email required' }, { status: 400 })
    }

    // Add contact to Brevo
    const res = await fetch('https://api.brevo.com/v3/contacts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': process.env.BREVO_API_KEY,
      },
      body: JSON.stringify({
        email,
        listIds: [parseInt(process.env.BREVO_LIST_ID)],
        updateEnabled: true,
      }),
    })

    if (!res.ok && res.status !== 204) {
      const err = await res.json()
      // Contact already exists is fine
      if (err.code !== 'duplicate_parameter') {
        return Response.json({ error: err.message }, { status: 500 })
      }
    }

    // Send welcome email via Resend
    const { Resend } = await import('resend')
    const resend = new Resend(process.env.RESEND_API_KEY)

    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: email,
      subject: 'Welcome to The Drop Yard 🔥',
      html: `
        <div style="font-family: monospace; background: #1c1b19; color: #f4f1ea; padding: 32px; max-width: 600px;">
          <h1 style="color: #ff5a1f; font-size: 28px; font-weight: 900; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 8px;">
            THE DROP YARD
          </h1>
          <p style="color: #6b6b63; font-size: 11px; letter-spacing: 3px; margin-bottom: 32px;">
            EST. 2026
          </p>

          <h2 style="font-size: 20px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 16px;">
            YOU'RE IN THE YARD.
          </h2>

          <p style="font-size: 15px; line-height: 1.7; color: #cfcac0; margin-bottom: 24px;">
            Thanks for joining. Here's your welcome discount — 10% off your first order:
          </p>

          <div style="background: rgba(255,90,31,0.1); border: 1px solid #ff5a1f; padding: 20px; text-align: center; margin-bottom: 32px;">
            <p style="font-size: 11px; letter-spacing: 2px; color: #6b6b63; margin: 0 0 8px;">YOUR CODE</p>
            <p style="font-size: 28px; font-weight: 900; color: #ff5a1f; letter-spacing: 4px; margin: 0;">WELCOME10</p>
          </div>

          <p style="font-size: 14px; line-height: 1.7; color: #cfcac0; margin-bottom: 24px;">
            You'll also get early access to new drops before anyone else.
          </p>

          <a href="https://shopthedropyard.com" 
            style="display: inline-block; padding: 14px 28px; background: #ff5a1f; color: #1c1b19; text-decoration: none; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; font-size: 14px;">
            SHOP THE YARD →
          </a>

          <p style="margin-top: 32px; font-size: 11px; color: #6b6b63; line-height: 1.6;">
            One yard. Every label. P.R.O. — The Nude Farmer — Unpopular Demand — Dead Air — Street Jesus Got Soul
          </p>
        </div>
      `,
    })

    return Response.json({ success: true })

  } catch (err) {
    console.error('Subscribe error:', err)
    return Response.json({ error: err.message }, { status: 500 })
  }
}
