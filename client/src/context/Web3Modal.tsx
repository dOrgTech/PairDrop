'use client'
import { createWeb3Modal, defaultConfig } from '@web3modal/ethers5/react'
import { web3ModalConfig } from '@/config'

const { projectId, mainnet, metadata } = web3ModalConfig

createWeb3Modal({
  ethersConfig: defaultConfig({ metadata }),
  chains: [mainnet],
  projectId,
})

export function Web3Modal({ children }: { children: React.ReactNode }) {
  return children
}
