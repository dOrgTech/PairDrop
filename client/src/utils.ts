export const formatAddress = (address: `0x${string}` | undefined) => {
  return address && `${address.substring(0, 6)}...${address.substring(address.length - 5)}`
}

export const withHttp = (url: string) => (!/^https?:\/\//i.test(url) ? `http://${url}` : url)

export const numberWithCommas = (x: number | string) => x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
