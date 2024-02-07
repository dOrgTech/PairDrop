'use client'
import { createWeb3Modal, defaultConfig } from '@web3modal/ethers5/react'

const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || ''

const mainnet = {
  chainId: 1,
  name: 'Ethereum',
  currency: 'ETH',
  explorerUrl: 'https://etherscan.io',
  rpcUrl: 'https://cloudflare-eth.com',
}

const metadata = {
  name: 'PairDrop',
  description: '',
  url: '',
  icons: [''],
}

createWeb3Modal({
  ethersConfig: defaultConfig({ metadata }),
  chains: [mainnet],
  projectId,
})

export function Web3Modal({ children }: { children: React.ReactNode }) {
  return children
}
