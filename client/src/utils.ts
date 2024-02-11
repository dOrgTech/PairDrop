import { addressType } from './types'

// Shorten address for display
export const formatAddress = (address: addressType) => {
  return address && `${address.substring(0, 6)}...${address.substring(address.length - 5)}`
}

// Format number with commas
export const formatNumber = (x: number | string) => x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
