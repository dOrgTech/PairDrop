'use client'
import { useEffect, useState, useRef, RefObject } from 'react'
import Link from 'next/link'
import {
  useWeb3Modal,
  useWeb3ModalState,
  useWeb3ModalAccount,
  useDisconnect,
  useWeb3ModalProvider,
  useWeb3ModalTheme,
} from '@web3modal/ethers5/react'
import { ethers, Signer } from 'ethers'
import Web3Token from 'web3-token'
import { formatAddress } from '@/utils'
import useOutsideClick from '@/hooks/useOutsideClick'

export default function ConnectWallet({ buttonText }: { buttonText: string }) {
  const [isMounted, setIsMounted] = useState(false)
  const [walletDropdown, setWalletDropdown] = useState(false)
  const { open } = useWeb3Modal()
  const { open: isModalOpen } = useWeb3ModalState()
  const { address, isConnected } = useWeb3ModalAccount()
  const { disconnect } = useDisconnect()
  const { walletProvider } = useWeb3ModalProvider()
  const { setThemeMode } = useWeb3ModalTheme()
  let signer: Signer
  setThemeMode('light')

  const dropdownRef: RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Sign message to obtain auth token
  useEffect(() => {
    if (!walletProvider) return
    const provider = new ethers.providers.Web3Provider(walletProvider)
    signer = provider.getSigner()
  }, [walletProvider])

  useEffect(() => {
    if (isModalOpen && document.body.clientHeight > window.innerHeight) {
      document.documentElement.classList.add('show-scrollbar')
    } else {
      document.documentElement.classList.remove('show-scrollbar')
    }
  }, [isModalOpen])

  useEffect(() => {
    const obtainAndStoreToken = async () => {
      if (isConnected && signer) {
        const existingToken = localStorage.getItem('auth')
        if (existingToken) {
          return
        }

        try {
          const token = await Web3Token.sign(async (msg: string) => await signer.signMessage(msg), {
            statement: 'This is a signed message',
            expires_in: '1y',
          })
          localStorage.setItem('auth', token)
        } catch (error) {
          console.error('Error obtaining token:', error)
        }
      }
    }

    obtainAndStoreToken()
  }, [isConnected])

  useOutsideClick(dropdownRef, () => {
    if (walletDropdown) setWalletDropdown(false)
  })

  if (!isMounted) {
    return <button className='button'>Loading...</button>
  }

  return (
    <>
      {isConnected ? (
        <>
          <div
            className='wallet-address-dropdown group/address relative'
            onClick={() => setWalletDropdown(!walletDropdown)}
            ref={dropdownRef}
          >
            <div
              className={`${
                walletDropdown ? 'text-magenta-500' : ''
              } transition-element group-hover/address:text-magenta-500`}
            >
              {formatAddress(address)}
            </div>
            {walletDropdown && (
              <div className='card absolute right-0 top-10 flex h-auto w-[226px] flex-col justify-center p-0 shadow'>
                <Link href='/my-votes' className='group flex gap-2 p-4'>
                  <div className='my-votes-icon' />
                  <div className='transition-element group-hover:text-magenta-500'>MY VOTES</div>
                </Link>
                <hr className='h-[3px] w-full bg-indigo-500' />
                <div className='group flex gap-2 p-4' onClick={() => disconnect()}>
                  <div className='disconnect-icon' />
                  <div className='transition-element group-hover:text-magenta-500'>DISCONNECT</div>
                </div>
              </div>
            )}
          </div>
        </>
      ) : !isConnected && isModalOpen ? (
        <button className='button'>Connecting...</button>
      ) : (
        !isConnected && (
          <button className='button' onClick={() => open()}>
            {buttonText}
          </button>
        )
      )}
    </>
  )
}
