'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import ConnectWallet from '@/components/reusable/ConnectWallet'
import { usePathname } from 'next/navigation'
import { useAccount } from 'wagmi'

const Heading = ({ PageNotFound = false }: { PageNotFound?: boolean }) => {
  const [isMounted, setIsMounted] = useState(false)
  const { isConnected } = useAccount()
  const path = usePathname()

  useEffect(() => {
    setIsMounted(true)
  }, [])

  return (
    <div className='heading-bg flex items-center justify-center'>
      <div className='mt-[82px] flex flex-col items-center text-center'>
        {/* Page Not Found */}
        {PageNotFound && (
          <>
            <h1 className='text-white'>404</h1>
            <h2 className='text-white'>PAGE NOT FOUND</h2>
            <Link href='/' className='button-transparent mt-8 text-xl'>
              GO TO HOME
            </Link>
          </>
        )}

        {/* Home Page Heading */}
        {path === '/' ? (
          <>
            <h1 className='mb-14 text-white'>
              FUNDING
              <br />
              REIMAGINED
            </h1>

            {!isConnected && isMounted && (
              <>
                <div className='subtitle1 mb-14 text-white'>
                  Connect your wallet to begin <br /> your pairwise adventure.
                </div>
                <ConnectWallet buttonText='Connect' />
              </>
            )}

            <Link href='/about' className='button-transparent mt-6'>
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
