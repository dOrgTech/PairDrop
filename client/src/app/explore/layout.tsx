import { explorePage } from '@/config'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: explorePage.pageTitle,
}

// Explore Page Layout
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className='bg side-padding min-h-heroHeight pb-32 pt-[100px]'>
      <div className='mx-auto flex max-w-[1025px] flex-col items-center'>
        <h2 className='mb-10 text-[44px] tracking-wide'>{explorePage.title}</h2>
        {children}
      </div>
    </main>
  )
}
