'use client'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import ConnectWallet from '@/components/reusable/ConnectWallet'

const Header = () => {
  const path = usePathname()
  const [showBanner, setShowBanner] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem('showBanner')
    setShowBanner(saved !== null ? JSON.parse(saved) : true)
  }, [])

  const hideBannerClick = () => {
    setShowBanner(false)
    localStorage.setItem('showBanner', JSON.stringify(false))
  }

  return (
    <>
      <header className='side-padding relative z-50 flex h-[82px] items-center justify-between border-b-[3px] border-indigo-600 bg-white py-4 font-extrabold'>
        {/* Logo */}
        <Link href='/' className='flex items-center gap-3'>
          <Image src='/assets/logos/logo.svg' alt='Logo' width={35} height={35} />
          <div className='text-4xl leading-10 md:text-[44px]'>
            <span className='text-magenta-500'>PAIR</span>DROP
          </div>
        </Link>

        {/* Navigation Links */}
        <div className='flex items-center gap-12'>
          <Link
            href='/about'
            className={`header-link transition-element hidden lg:block ${path === '/about' && 'header-link-active'}`}
          >
            About
          </Link>
          <Link
            href='/explore'
            className={`header-link transition-element hidden lg:block ${path === '/explore' && 'header-link-active'}`}
          >
            Explore
          </Link>

          {/* Connect Wallet */}
          <ConnectWallet buttonText='Connect' />
        </div>
      </header>

      {/* Banner */}
      {showBanner && (
        <div className='banner relative z-[49] justify-between md:absolute md:top-[80px]'>
          <div className='flex flex-col text-sm lg:flex-row lg:gap-1.5 lg:text-base'>
            <span className='font-medium'>PairDrop demo is for demonstration purposes only.</span>
            <span>
              To fork the codebase, visit the open source repo{' '}
              <a
                href='https://github.com/dOrgTech/PairDrop'
                target='_blank'
                rel='noopener noreferrer'
                className='font-medium underline'
              >
                Here
              </a>
            </span>
          </div>
          <div className='close-2-icon' onClick={() => hideBannerClick()} />
        </div>
      )}
    </>
  )
}

export default Header
