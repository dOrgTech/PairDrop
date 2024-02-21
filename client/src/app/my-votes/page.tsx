'use client'
import { useEffect, useState } from 'react'
import PairCard from './PairCard'
import { useMyVotesData, useMyScoreData } from '@/hooks/useDataAPI'
import { MyVoteCardType } from '@/types'
import { useWeb3ModalAccount } from '@web3modal/ethers5/react'
import { useRouter } from 'next/navigation'
import { myVotesPage, pairsCap } from '@/config'
import { useSearchParams } from 'next/navigation'
import FinishModal from '@/components/Modals/FinishModal'

// My Votes Page
const MyVotes = () => {
  const router = useRouter()

  // Check if the user has finished all pair votes & show finish modal
  const searchParams = useSearchParams()
  const [showFinishModal, setShowFinishModal] = useState(false)
  const finished = searchParams.get('finished') || undefined

  const { isConnected, address } = useWeb3ModalAccount()
  const { myVotesData, isMyVotesLoading, isMyVotesError } = useMyVotesData(address)
  const { myScoreData, isMyScoreLoading, isMyScoreError } = useMyScoreData(address)

  useEffect(() => {
    if (finished === 'true') {
      setShowFinishModal(true)
    }
  }, [finished])

  // Show not connected, loading, error, no projects messages & redirect if user has no score
  if (!isConnected || !address)
    return <div className='subtitle1 mt-32 text-center'>{myVotesPage.connectWalletMessage}</div>
  if (isMyVotesLoading || isMyScoreLoading)
    return <div className='subtitle1 mt-32 text-center'>{myVotesPage.loadingMessage}</div>

  if (isMyVotesError || isMyScoreError)
    return <div className='subtitle1 mt-32 text-center'>{myVotesPage.errorMessage}</div>

  if (address && myScoreData && myScoreData.score === 0) {
    router.push('/')
  }

  if (!myVotesData || myScoreData.score === 0)
    return <div className='subtitle1 mt-32 text-center'>{myVotesPage.noDataMessage}</div>

  // Fill pairCards with empty cards if there are less than pairsCap
  const pairCards: MyVoteCardType[] = myVotesData
  while (pairCards.length < pairsCap) {
    pairCards.push({
      firstProject: null,
      secondProject: null,
      status: 'hidden',
      votedProject: null,
      pairIndex: null,
    })
  }

  return (
    <>
      <div className='flex flex-wrap justify-center gap-10'>
        {pairCards.slice(0, pairsCap).map((card: MyVoteCardType) => (
          <PairCard key={card.pairIndex} {...card} />
        ))}
      </div>
      <FinishModal show={showFinishModal} onClose={() => setShowFinishModal(false)} />
    </>
  )
}

export default MyVotes
