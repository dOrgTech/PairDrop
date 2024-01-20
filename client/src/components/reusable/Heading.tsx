'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import ConnectWallet from '@/components/reusable/ConnectWallet'
import { usePathname } from 'next/navigation'
import { useAccount } from 'wagmi'
import BlobBackground from './BlobBackground'

const Heading = ({ PageNotFound = false }: { PageNotFound?: boolean }) => {
  const [isMounted, setIsMounted] = useState(false)
  const { isConnected } = useAccount()
  const path = usePathname()

  useEffect(() => {
    setIsMounted(true)
  }, [])

  return (
    <div className='bg relative flex min-h-heroHeight items-center justify-center'>
      <BlobBackground />
      <div className='flex flex-col items-center text-center'>
        {/* Page Not Found */}
        {PageNotFound && (
          <>
            <h1 className='relative text-white'>404</h1>
            <h2 className='relative text-white'>PAGE NOT FOUND</h2>
            <Link href='/' className='button-transparent relative mt-8 text-xl'>
              GO TO HOME
            </Link>
          </>
        )}

        {/* Home Page Heading */}
        {path === '/' ? (
          <>
            <h1 className='pointer-events-none relative mb-6 text-6xl leading-[0.8] text-white md:text-[120px]'>
              FUNDING
              <br />
              REIMAGINED
            </h1>

            {!isConnected && isMounted && (
              <>
                <div className='subtitle1 pointer-events-none relative mb-6 text-white'>
                  Connect your wallet to begin <br /> your pairwise adventure.
                </div>
                <div className='relative'>
                  <ConnectWallet buttonText='Connect' />
                </div>
              </>
            )}

            <Link
              href='/about'
              className='button-transparent relative mt-6 [text-shadow:_0_1px_16px_rgba(60,29,254,0.25)]'
            >
              LEARN MORE
            </Link>
          </>
        ) : (
          // About Page Heading
          path === '/about' && (
            <>
              <h1 className='text-white'>PAIR2PAIR</h1>
              <h2 className='text-white'>BY DAO DROPS</h2>
            </>
          )
        )}
      </div>
    </div>
  )
}

export default Heading
