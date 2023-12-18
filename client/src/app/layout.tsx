import type { Metadata } from 'next'
import './globals.css'
import { Web3Modal } from '@/context/Web3Modal'
import Header from '@/components/Header'

export const metadata: Metadata = {
  title: 'Pair2Pair',
  description: '',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <head>
        <link rel='shortcut icon' href='/favicon.ico' />
        <link rel='icon' type='image/png' sizes='16x16' href='/favicons/favicon-16x16.png' />
        <link rel='icon' type='image/png' sizes='32x32' href='/favicons/favicon-32x32.png' />
        <link rel='apple-touch-icon' sizes='180x180' href='/favicons/apple-touch-icon.png' />
        <link rel='icon' type='image/png' sizes='192x192' href='/favicons/android-chrome-192x192.png' />
        <link rel='icon' type='image/png' sizes='512x512' href='/favicons/android-chrome-512x512.png' />
        <meta name='theme-color' content='#ffffff' />
        <link rel='manifest' href='/manifest.json' />
      </head>
      <body>
        <Web3Modal>
          <Header />
          {children}
        </Web3Modal>
      </body>
    </html>
  )
}
