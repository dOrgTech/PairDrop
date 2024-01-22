import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Pair2Pair - Vote',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className='bg side-padding flex min-h-heroHeight flex-col items-center pb-8 pt-14'>
      <div className='flex max-w-[1025px] flex-col items-center'>{children}</div>
    </main>
  )
}
