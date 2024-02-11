import type { Metadata } from 'next'
import { myVotesPage } from '@/config'

export const metadata: Metadata = {
  title: myVotesPage.pageTitle,
}

// MyVotes Page Layout
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className='bg side-padding min-h-heroHeight pb-32 pt-[100px]'>
      <div className='mx-auto flex max-w-[1025px] flex-col'>
        <h2 className='mb-4 text-4xl tracking-wide md:text-[44px]'>{myVotesPage.title}</h2>
        <div className='mb-12 font-ibm text-lg leading-relaxed'>{myVotesPage.description}</div>
        {children}
      </div>
    </main>
  )
}
