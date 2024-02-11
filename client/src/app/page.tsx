'use client'
import { useState, useEffect } from 'react'
import Heading from '@/components/reusable/Heading'
import WhatIs from '@/components/HomePage/WhatIs'
import StartModal from '@/components/Modals/StartModal'
import Results from '@/components/HomePage/Results'
import { useModal } from '@/hooks/useModal'
import { useWeb3ModalAccount } from '@web3modal/ethers5/react'
import { useMyScoreData } from '@/hooks/useDataAPI'
import { homeConfig } from '@/config'

// Home Page
export default function Home() {
  const [showStartModal, setShowStartModal] = useModal()
  const [showResults, setShowResults] = useState<boolean>(homeConfig.showResults)
  const [showCountPage, setShowCountPage] = useState<boolean>(false)
  const { isConnected, address } = useWeb3ModalAccount()
  const { myScoreData, isMyScoreLoading, isMyScoreError } = useMyScoreData(address)
  const [userScore, setUserScore] = useState<number | null>(null)

  // Set user score
  useEffect(() => {
    if (myScoreData && !isMyScoreLoading && !isMyScoreError) {
      setUserScore(myScoreData.score)
    }
  }, [myScoreData, isMyScoreLoading, isMyScoreError])

  // Show start modal if user is connected and has a score & not finished before
  useEffect(() => {
    const startModalFinished = localStorage.getItem('startModalFinished')

    if (startModalFinished !== 'true' && isConnected && userScore !== null) {
      setShowStartModal(true)
    } else {
      setShowStartModal(false)
    }
  }, [isConnected, userScore])

  return (
    <main className={`${!showCountPage ? 'pb-32' : ''}`}>
      <Heading countPage={showCountPage} />
      {!showCountPage && (
        <>
          <WhatIs />
          {showResults && <Results />}
        </>
      )}
      <StartModal
        show={showStartModal}
        onClose={() => setShowStartModal(false)}
        setShowCountPage={setShowCountPage}
        userScore={userScore}
      />
    </main>
  )
}
