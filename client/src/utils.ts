import { addressType } from './types'

// Shorten address for display
export const formatAddress = (address: addressType) => {
  return address && `${address.substring(0, 6)}...${address.substring(address.length - 5)}`
}

// Format number with commas
export const formatNumber = (x: number | string) => x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')

// Custom viewport meta tag for mobile
export function customViewport() {
  const targetContent = 'width=500, shrink-to-fit=yes, maximum-scale=1, user-scalable=0'
  const viewports = document.querySelectorAll('meta[name="viewport"]')

  // Check and update each viewport meta element
  viewports.forEach((viewport) => {
    const vp = viewport as HTMLMetaElement
    if (vp.content !== targetContent) {
      vp.content = targetContent
    }
  })

  // If no viewport meta tags exist, add the target one
  if (viewports.length === 0) {
    const viewportMeta = document.createElement('meta')
    viewportMeta.name = 'viewport'
    viewportMeta.content = targetContent
    document.head.appendChild(viewportMeta)
  }
}
