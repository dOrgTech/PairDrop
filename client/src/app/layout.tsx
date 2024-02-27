'use client'
import './globals.css'
import { useState, useEffect } from 'react'
import { Web3Modal } from '@/context/Web3Modal'
import Header from '@/components/Header'
import Heading from '@/components/reusable/Heading'
import { SWRProvider } from '@/providers/swr'
import { rootLayout } from '@/config'
import StartModal from '@/components/Modals/StartModal'
import { useModal } from '@/hooks/useModal'
import { useWeb3ModalAccount } from '@web3modal/ethers5/react'
import useMyScoreStore from '@/stores/useMyScoreStore'
import useShowCountPageStore from '@/stores/useShowCountPageStore'
import { customViewport } from '@/utils'
import { usePathname } from 'next/navigation'

// Root Layout
export default function RootLayout({ children }: { children: React.ReactNode }) {
  const path = usePathname()
  const { showCountPage } = useShowCountPageStore()
  const { userScore } = useMyScoreStore()
  const [showStartModal, setShowStartModal] = useModal()
  const { address } = useWeb3ModalAccount()
  const [isMounted, setIsMounted] = useState(false)

  // Set isMounted to true after first render
  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Set a custom viewport meta tag in every page for mobile view < 500px
  useEffect(() => {
    if (!isMounted || typeof window === 'undefined') return
    customViewport()
  }, [isMounted, path])

  // Show start modal if user is connected and has a score & not finished before
  useEffect(() => {
    if (!isMounted || typeof window === 'undefined') return

    const startModalFinished = localStorage.getItem(`startModalFinished_${address}`)
    if (startModalFinished !== 'true' && userScore !== null && address) {
      setShowStartModal(true)
    } else {
      setShowStartModal(false)
    }
  }, [isMounted, setShowStartModal, userScore, address])

  return (
    <html lang='en'>
      <head>
        <title>{rootLayout.siteTitle}</title>
        <link rel='shortcut icon' href='/favicon.ico' />
        <link rel='icon' type='image/png' sizes='16x16' href='/favicons/favicon-16x16.png' />
        <link rel='icon' type='image/png' sizes='32x32' href='/favicons/favicon-32x32.png' />
        <link rel='apple-touch-icon' sizes='180x180' href='/favicons/apple-touch-icon.png' />
        <link rel='icon' type='image/png' sizes='192x192' href='/favicons/android-chrome-192x192.png' />
        <link rel='icon' type='image/png' sizes='512x512' href='/favicons/android-chrome-512x512.png' />

        {/* Primary Meta Tags */}
        <meta name='title' content='PairDrop' />
        <meta
          name='description'
          content='PairDrop is a forkable template for running community allocation rounds. It leverages random sampling and pairwise comparison to make decision-making fun and efficient while minimizing favoritism and bias.'
        />

        {/* Open Graph / Facebook */}
        <meta property='og:type' content='website' />
        <meta property='og:url' content='https://pairdrop.daodrops.io' />
        <meta property='og:title' content='PairDrop' />
        <meta
          property='og:description'
          content='PairDrop is a forkable template for running community allocation rounds. It leverages random sampling and pairwise comparison to make decision-making fun and efficient while minimizing favoritism and bias.'
        />
        <meta property='og:image' content='/metaimage.png' />

        {/* Twitter */}
        <meta property='twitter:card' content='summary_large_image' />
        <meta property='twitter:url' content='https://pairdrop.daodrops.io' />
        <meta property='twitter:title' content='PairDrop' />
        <meta
          property='twitter:description'
          content='PairDrop is a forkable template for running community allocation rounds. It leverages random sampling and pairwise comparison to make decision-making fun and efficient while minimizing favoritism and bias.'
        />
        <meta property='twitter:image' content='/metaimage.png' />

        <meta name='theme-color' content='#ffffff' />
        <link rel='manifest' href='/manifest.json' />
      </head>
      <body>
        <SWRProvider>
          <Web3Modal>
            <Header />
            {showCountPage ? <Heading countPage={showCountPage} /> : children}
            {showStartModal && (
              <StartModal
                show={showStartModal}
                onClose={() => setShowStartModal(false)}
                userScore={userScore}
                address={address}
              />
            )}
          </Web3Modal>
        </SWRProvider>
      </body>
    </html>
  )
}
