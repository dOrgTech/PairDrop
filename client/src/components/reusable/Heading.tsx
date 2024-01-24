'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import ConnectWallet from '@/components/reusable/ConnectWallet'
import { usePathname } from 'next/navigation'
import { useWeb3ModalAccount } from '@web3modal/ethers5/react'
import BlobBackground from './BlobBackground'
import { useRouter } from 'next/navigation'

interface HeadingProps {
  PageNotFound?: boolean
  countPage?: boolean
}

const Heading: React.FC<HeadingProps> = ({ PageNotFound = false, countPage = false }) => {
  const [isMounted, setIsMounted] = useState(false)
  const [countdown, setCountdown] = useState<string | number>(3)
  const { isConnected } = useWeb3ModalAccount()
  const path = usePathname()
  const router = useRouter()

  useEffect(() => {
    setIsMounted(true)

    if (countPage) {
      const interval = setInterval(() => {
        setCountdown((prevCount) => {
          if (prevCount === 1) {
            clearInterval(interval)
            return 'GO!'
          }
          return (prevCount as number) - 1
        })
      }, 1000)

      return () => clearInterval(interval)
    }
  }, [countPage])

  useEffect(() => {
    if (countdown === 'GO!') {
      setTimeout(() => {
        router.push('/vote')
      }, 1000)
    }
  }, [countdown, router])

  return (
    <div className='heading-bg relative flex min-h-heroHeight items-center justify-center'>
      <BlobBackground />
      <div className='z-30 flex flex-col items-center text-center'>
        {/* Page Not Found */}
        {PageNotFound && !countPage && (
          <>
            <h1 className='relative text-white'>404</h1>
            <h2 className='relative text-white'>PAGE NOT FOUND</h2>
            <Link href='/' className='button-transparent relative mt-8 text-xl'>
              GO TO HOME
            </Link>
          </>
        )}

        {/* Count Page */}
        {countPage && <div className='text-[400px] font-bold tracking-tighter text-white'>{countdown}</div>}

        {/* Home Page Heading */}
        {path === '/' && !countPage ? (
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
          path === '/about' &&
          !countPage && (
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
