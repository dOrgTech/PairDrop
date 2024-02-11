'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import ConnectWallet from '@/components/reusable/ConnectWallet'
import { useRouter, usePathname } from 'next/navigation'
import { useWeb3ModalAccount } from '@web3modal/ethers5/react'
import BlobBackground from './BlobBackground'
import { heading } from '@/config'

interface HeadingProps {
  PageNotFound?: boolean
  countPage?: boolean
}

// Heading Component
const Heading: React.FC<HeadingProps> = ({ PageNotFound = false, countPage = false }) => {
  const [isMounted, setIsMounted] = useState(false)
  const [countdown, setCountdown] = useState<string | number>(heading.countdownInitialValue)
  const { isConnected } = useWeb3ModalAccount()
  const router = useRouter()
  const path = usePathname()

  // Count Page
  useEffect(() => {
    setIsMounted(true)

    if (countPage) {
      const interval = setInterval(() => {
        setCountdown((prevCount) => {
          if (prevCount === 1) {
            clearInterval(interval)
            return heading.countdownGoText
          }
          return (prevCount as number) - 1
        })
      }, 1000)

      return () => clearInterval(interval)
    }
  }, [countPage])

  useEffect(() => {
    if (countdown === heading.countdownGoText) {
      setTimeout(() => {
        router.push('/vote')
      }, 1000)
    }
  }, [countdown, router])

  return (
    <div className='heading-bg relative flex min-h-[800px] items-center justify-center lg:min-h-heroHeight'>
      <BlobBackground />
      <div className='z-30 flex flex-col items-center text-center'>
        {/* Page Not Found */}
        {PageNotFound && !countPage && (
          <>
            <h1 className='relative text-white'>{heading.pageNotFound.title}</h1>
            <h2 className='relative text-white'>{heading.pageNotFound.subtitle}</h2>
            <Link href={heading.pageNotFound.goHomeLink} className='button-transparent relative mt-8 text-xl'>
              {heading.pageNotFound.goHomeText}
            </Link>
          </>
        )}

        {/* Count Page */}
        {countPage && <div className='text-[400px] font-bold tracking-tighter text-white'>{countdown}</div>}

        {/* Home Page Heading */}
        {path === '/' && !countPage ? (
          <>
            <h1 className='pointer-events-none relative mb-6 whitespace-pre-line text-6xl leading-[0.9] text-white md:text-7xl lg:text-[120px] lg:leading-[0.8]'>
              {heading.homePage.title}
            </h1>

            {!isConnected && isMounted && (
              <>
                <div className='subtitle1 pointer-events-none relative mb-6 whitespace-pre-line text-white'>
                  {heading.homePage.subtitle}
                </div>
                <div className='relative'>
                  <ConnectWallet buttonText='Connect' />
                </div>
              </>
            )}

            <Link
              href={heading.homePage.learnMoreLink}
              className='button-transparent relative mt-6 [text-shadow:_0_1px_16px_rgba(60,29,254,0.25)]'
            >
              {heading.homePage.learnMoreButtonText}
            </Link>
          </>
        ) : (
          // About Page Heading
          path === heading.aboutPage.learnPagePath &&
          !countPage && (
            <>
              <h1 className='text-white'>{heading.aboutPage.title}</h1>
              <h2 className='text-white'>{heading.aboutPage.subtitle}</h2>
            </>
          )
        )}
      </div>
    </div>
  )
}

export default Heading
