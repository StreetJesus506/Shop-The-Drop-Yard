export default function sitemap() {
  const baseUrl = 'https://shopthedropyard.com'
  
  const brands = ['pro', 'nudefarmer', 'unpopular', 'deadair']
  
  const brandPages = brands.map(brand => ({
    url: `${baseUrl}/brands/${brand}`,
    lastModified: new Date(),
    changeFrequency: 'daily',
    priority: 0.8,
  }))

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    ...brandPages,
  ]
}
