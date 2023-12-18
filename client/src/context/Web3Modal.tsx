'use client'
import { createWeb3Modal, defaultWagmiConfig } from '@web3modal/wagmi/react'

import { WagmiConfig } from 'wagmi'
import { mainnet } from 'viem/chains'

const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || ''

const metadata = {
  name: 'Pair2Pair',
  description: '',
  url: '',
  icons: [''],
}

const chains = [mainnet]
const wagmiConfig = defaultWagmiConfig({ chains, projectId, metadata })

createWeb3Modal({ wagmiConfig, projectId, chains, themeMode: 'light' })

export function Web3Modal({ children }: { children: React.ReactNode }) {
  return <WagmiConfig config={wagmiConfig}>{children}</WagmiConfig>
}
