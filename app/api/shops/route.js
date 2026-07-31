export const dynamic = 'force-dynamic'

export async function GET() {
  const response = await fetch('https://api.printify.com/v1/shops.json', {
    headers: {
      'Authorization': `Bearer ${process.env.PRINTIFY_API_KEY}`,
    },
  })

  const data = await response.json()
  return Response.json(data)
}
