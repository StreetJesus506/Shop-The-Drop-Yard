export default function sitemap() {
  const baseUrl = 'https://shopthedropyard.com'
  
  const brands = ['pro', 'nudefarmer', 'unpopular', 'deadair', 'streetjesus']
  
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
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/policies`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
  url: `${baseUrl}/about/streetjesus`,
  lastModified: new Date(),
  changeFrequency: 'monthly',
  priority: 0.7,
},

    ...brandPages,
  ]
}
