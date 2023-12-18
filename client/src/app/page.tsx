import Header from '@/components/Header'
import Heading from '@/components/reusable/Heading'
import WhatIs from '@/components/HomePage/WhatIs'
import FAQ from '@/components/HomePage/FAQ'

export default function Home() {
  return (
    <main className='pb-32'>
      <Heading />
      <WhatIs />
      <FAQ />
    </main>
  )
}
