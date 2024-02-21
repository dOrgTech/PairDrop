'use client'
import { useState } from 'react'
import Heading from '@/components/reusable/Heading'
import WhatIs from '@/components/HomePage/WhatIs'
import Results from '@/components/HomePage/Results'
import { homeConfig } from '@/config'

// Home Page
export default function Home() {
  const [showResults, setShowResults] = useState<boolean>(homeConfig.showResults)

  return (
    <main className='pb-32'>
      <Heading />
      <WhatIs />
      {showResults && <Results />}
    </main>
  )
}
