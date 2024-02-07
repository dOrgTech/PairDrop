'use client'
import PairCard from './PairCard'
import { useMyVotesData, useMyScoreData } from '@/hooks/useDataAPI'
import { MyVoteCardType } from '@/types'
import { useWeb3ModalAccount } from '@web3modal/ethers5/react'
import { useRouter } from 'next/navigation'

const MyVotes = () => {
  const router = useRouter()
  const { isConnected, address } = useWeb3ModalAccount()
  const { myVotesData, isMyVotesLoading, isMyVotesError } = useMyVotesData(address)
  const { myScoreData, isMyScoreLoading, isMyScoreError } = useMyScoreData(address)

  // Show not connected, loading, error, no projects messages & redirect if user has no score
  if (!isConnected || !address) return <div className='subtitle1 mt-32 text-center'>Please connect your wallet</div>
  if (isMyVotesLoading || isMyScoreLoading)
    return <div className='subtitle1 mt-32 text-center'>Loading votes data...</div>

  if (isMyVotesError || isMyScoreError) return <div className='subtitle1 mt-32 text-center'>Error loading votes</div>

  if (address && myScoreData && myScoreData.score === 0) {
    router.push('/')
  }

  if (!myVotesData || myScoreData.score === 0)
    return <div className='subtitle1 mt-32 text-center'>No votes data available</div>

  const pairCards: MyVoteCardType[] = myVotesData
  while (pairCards.length < 5) {
    pairCards.push({
      firstProject: null,
      secondProject: null,
      status: 'hidden',
      votedProject: null,
      pairIndex: null,
    })
  }

  return (
    <div className='flex flex-wrap justify-center gap-10'>
      {pairCards.slice(0, 5).map((card: MyVoteCardType, index: number) => (
        <PairCard key={index} {...card} />
      ))}
    </div>
  )
}

export default MyVotes
