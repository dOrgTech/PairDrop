'use client'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import ConnectWallet from '@/components/reusable/ConnectWallet'
import { header } from '@/config'

// Header Component
const Header = () => {
  const path = usePathname()
  const [showBanner, setShowBanner] = useState(false)

  // Show banner if not hidden before
  useEffect(() => {
    const saved = localStorage.getItem('showBanner')
    setShowBanner(saved !== null ? JSON.parse(saved) : true)
  }, [])

  // Hide banner & save to local storage
  const hideBannerClick = () => {
    setShowBanner(false)
    localStorage.setItem('showBanner', JSON.stringify(false))
  }

  return (
    <>
      <header className='side-padding relative z-50 flex h-[82px] items-center justify-between border-b-[3px] border-indigo-600 bg-white py-4 font-extrabold'>
        {/* Logo */}
        <Link href='/' className='flex items-center gap-3'>
          <Image src={header.logoSrc} alt={header.logoAlt} width={header.logoWidth} height={header.logoHeight} />
          <div className='text-4xl leading-10 md:text-[44px]'>
            <span className={header.siteNameSpanClass}>{header.siteName}</span>
            {header.siteNameSuffix}
          </div>
        </Link>

        {/* Navigation Links */}
        <div className='flex items-center gap-12'>
          {header.navigationLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`header-link transition-element hidden lg:block ${path === link.href && 'header-link-active'}`}
            >
              {link.label}
            </Link>
          ))}

          {/* Connect Wallet */}
          <ConnectWallet buttonText={header.connectWalletButtonText} />
        </div>
      </header>

      {/* Banner */}
      {showBanner && (
        <div className='banner relative z-[49] justify-between md:absolute md:top-[80px]'>
          <div className='flex flex-col text-sm lg:flex-row lg:gap-1.5 lg:text-base'>
            <span className='font-medium'>{header.bannerMessage}</span>
            <span>
              {header.bannerRepoText}{' '}
              <a
                href={header.bannerRepoLink}
                target='_blank'
                rel='noopener noreferrer'
                className='font-medium underline'
              >
                {header.bannerRepoLinkText}
              </a>
            </span>
          </div>
          <div className='close-2-icon' onClick={hideBannerClick} />
        </div>
      )}
    </>
  )
}

export default Header
