import { Resend } from 'resend'

export const dynamic = 'force-dynamic'

export async function POST(req) {
  try {
    const { name, email, subject, message } = await req.json()

    if (!name || !email || !subject || !message) {
      return Response.json({ error: 'All fields required' }, { status: 400 })
    }

    const resend = new Resend(process.env.RESEND_API_KEY)

    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: process.env.NOTIFICATION_EMAIL,
      subject: `📬 Drop Yard Contact: ${subject}`,
      html: `
        <div style="font-family: monospace; background: #1c1b19; color: #f4f1ea; padding: 32px; border-radius: 8px;">
          <h1 style="color: #ff5a1f; font-size: 20px; margin-bottom: 24px;">THE DROP YARD — NEW MESSAGE</h1>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; color: #6b6b63; width: 100px;">FROM</td>
              <td style="padding: 8px 0;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #6b6b63;">EMAIL</td>
              <td style="padding: 8px 0;">
                <a href="mailto:${email}" style="color: #ff5a1f;">${email}</a>
              </td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #6b6b63;">SUBJECT</td>
              <td style="padding: 8px 0;">${subject}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #6b6b63; vertical-align: top;">MESSAGE</td>
              <td style="padding: 8px 0; line-height: 1.6;">${message.replace(/\n/g, '<br>')}</td>
            </tr>
          </table>
          <p style="margin-top: 24px; color: #6b6b63; font-size: 12px;">
            Reply directly to this email to respond to ${name}.
          </p>
        </div>
      `,
      replyTo: email,
    })

    return Response.json({ success: true })

  } catch (err) {
    console.error('Contact form error:', err)
    return Response.json({ error: err.message }, { status: 500 })
  }
}
