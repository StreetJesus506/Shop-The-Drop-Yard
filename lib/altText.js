export function generateAltText({ title, brandName, brandEthos, description, category }) {
  // Extract key words from description (strip HTML, get first sentence)
  const cleanDesc = description
    ?.replace(/<[^>]*>/g, '')
    ?.replace(/&[^;]+;/g, ' ')
    ?.split('.')[0]
    ?.trim()
    ?.slice(0, 100) || ''

  // Extract meaningful keywords from title
  const titleKeywords = title
    ?.replace(/[^a-zA-Z0-9\s]/g, ' ')
    ?.trim() || ''

  // Build alt text components
  const parts = [
    titleKeywords,
    category && category !== 'EVERYTHING ELSE' ? category.toLowerCase() : '',
    brandName,
    'independent streetwear',
    'The Drop Yard',
  ].filter(Boolean)

  const base = parts.join(' — ')

  // Add description snippet if available and not too long
  if (cleanDesc && base.length + cleanDesc.length < 200) {
    return `${base} | ${cleanDesc}`
  }

  return base
}

export function generateProductImageAlt({ title, brandName, index, color }) {
  const view = index === 0 ? 'front view' : 
                index === 1 ? 'back view' :
                index === 2 ? 'detail view' : 
                `view ${index + 1}`
  
  const colorPart = color ? ` in ${color}` : ''
  
  return `${title}${colorPart} ${view} — ${brandName} | The Drop Yard`
}
