'use client'
import { useState, useEffect } from 'react'
import Heading from '@/components/reusable/Heading'
import WhatIs from '@/components/HomePage/WhatIs'
import FAQ from '@/components/HomePage/FAQ'
import StartModal from '@/components/Modals/StartModal'
import Results from '@/components/HomePage/Results'
import { useModal } from '@/hooks/useModal'
import { useWeb3ModalAccount } from '@web3modal/ethers5/react'

export default function Home() {
  const [showStartModal, setShowStartModal] = useModal()
  const [showResults, setShowResults] = useState<boolean>(true)
  const [showCountPage, setShowCountPage] = useState<boolean>(false)
  const { isConnected } = useWeb3ModalAccount()

  useEffect(() => {
    const startModalFinished = localStorage.getItem('startModalFinished')

    if (startModalFinished !== 'true' && isConnected) {
      setShowStartModal(true)
    } else {
      setShowStartModal(false)
    }
  }, [isConnected])

  return (
    <main className={`${!showCountPage ? 'pb-32' : ''}`}>
      <Heading countPage={showCountPage} />
      {!showCountPage && (
        <>
          {showResults && <Results />}
          <WhatIs />
          <FAQ />
        </>
      )}
      <StartModal show={showStartModal} onClose={() => setShowStartModal(false)} setShowCountPage={setShowCountPage} />
    </main>
  )
}
