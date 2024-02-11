import { votePage } from '@/config'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: votePage.pageTitle,
}

// Vote Page Layout
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className='bg side-padding flex min-h-heroHeight flex-col items-center pb-8 pt-20'>
      <div className='flex max-w-[1025px] flex-col items-center'>{children}</div>
    </main>
  )
}
