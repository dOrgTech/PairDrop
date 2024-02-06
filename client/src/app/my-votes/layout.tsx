import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'PairDrop - My Votes',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className='bg side-padding min-h-heroHeight pb-32 pt-[100px]'>
      <div className='mx-auto flex max-w-[1025px] flex-col'>
        <h2 className='mb-4 text-4xl tracking-wide md:text-[44px]'>MY VOTES</h2>
        <div className='mb-12 font-ibm text-lg leading-relaxed'>
          We’ve made your job simpler, anon. Review the next pair and simply vote for the project you perceive as having
          the most impact on public good!
        </div>
        {children}
      </div>
    </main>
  )
}
