'use client'
import { useEffect, useState, useRef, RefObject } from 'react'
import Link from 'next/link'
import { useWeb3Modal, useWeb3ModalState } from '@web3modal/wagmi/react'
import { useAccount, useDisconnect } from 'wagmi'
import { formatAddress } from '@/utils'
import useOutsideClick from '@/hooks/useOutsideClick'

export default function ConnectWallet({ buttonText }: { buttonText: string }) {
  const [isMounted, setIsMounted] = useState(false)
  const [walletDropdown, setWalletDropdown] = useState(false)
  const { open } = useWeb3Modal()
  const { open: isModalOpen } = useWeb3ModalState()
  const { address, isConnecting, isConnected } = useAccount()
  const { disconnect } = useDisconnect()

  const dropdownRef: RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null)

  useOutsideClick(dropdownRef, () => {
    if (walletDropdown) setWalletDropdown(false)
  })

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return <button className='button'>Loading...</button>
  }

  return (
    <>
      {isConnected ? (
        <>
          <div
            className='wallet-address-dropdown relative'
            onClick={() => setWalletDropdown(!walletDropdown)}
            ref={dropdownRef}
          >
            <div className='hover:text-magenta-500'>{formatAddress(address)}</div>
            {walletDropdown && (
              <div className='card absolute right-0 top-10 flex w-[226px] flex-col justify-center p-0 shadow'>
                <Link href='/my-votes' className='group flex gap-2 p-4'>
                  <div className='my-votes-icon' />
                  <div className='group-hover:text-magenta-500'>MY VOTES</div>
                </Link>
                <hr className='h-[3px] w-full bg-indigo-500' />
                <div className=' group flex gap-2 p-4' onClick={() => disconnect()}>
                  <div className='disconnect-icon' />
                  <div className='group-hover:text-magenta-500'>DISCONNECT</div>
                </div>
              </div>
            )}
          </div>
        </>
      ) : isConnecting && isModalOpen ? (
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
