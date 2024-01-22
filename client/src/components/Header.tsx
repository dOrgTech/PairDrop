'use client'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import ConnectWallet from '@/components/reusable/ConnectWallet'

const Header = () => {
  const path = usePathname()
  return (
    <header className='side-padding relative z-50 flex h-[82px] items-center justify-between border-b-[3px] border-indigo-600 bg-white py-4 font-extrabold'>
      {/* Logo */}
      <Link href='/' className='flex items-center gap-4'>
        <Image src='/assets/logos/logo.svg' alt='Logo' width={46} height={34} />
        <div className='text-[44px] leading-10'>
          PAIR<span className='text-magenta-500'>2</span>PAIR
        </div>
      </Link>

      {/* Navigation Links */}
      <div className='flex items-center gap-12'>
        <Link href='/about' className={`header-link transition-element ${path === '/about' && 'header-link-active'}`}>
          About
        </Link>
        <Link
          href='/explore'
          className={`header-link transition-element ${path === '/explore' && 'header-link-active'}`}
        >
          Explore
        </Link>

        {/* Connect Wallet */}
        <ConnectWallet buttonText='Connect' />
      </div>
    </header>
  )
}

export default Header
