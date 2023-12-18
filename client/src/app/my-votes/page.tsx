import { Metadata } from 'next'
import PairCard from './PairCard'
import projectsData from '@/data/projects.json'
import myVotesData from '@/data/my-votes.json'

export const metadata: Metadata = {
  title: 'Pair2Pair - My Votes',
}

const MyVotes = () => {
  const pairCardProps = myVotesData.map((vote) => ({
    status: vote.status as 'voted' | 'vote' | 'hidden',
    projectIcons: [
      projectsData.find((p) => p.id === vote.firstProjectID)?.projectIcon || '',
      projectsData.find((p) => p.id === vote.secondProjectID)?.projectIcon || '',
    ],
    firstProjectID: vote.firstProjectID,
    secondProjectID: vote.secondProjectID,
    votedProjectID: vote.votedProjectID,
  }))

  while (pairCardProps.length < 5) {
    pairCardProps.push({
      status: 'hidden',
      projectIcons: [],
      votedProjectID: undefined,
      firstProjectID: 0,
      secondProjectID: 0,
    })
  }

  return (
    <main className='bg min-h-header side-padding pb-32 pt-[100px]'>
      <div className='mx-auto flex max-w-[1025px] flex-col'>
        <h2 className='mb-4 text-[44px] tracking-wide'>MY VOTES</h2>
        <p className='font-ibm mb-12 text-lg leading-relaxed'>
          We’ve made your job simpler, anon. Review the next pair and simply vote for the project you perceive as having
          the most impact on public good!
        </p>
        <div className='flex flex-wrap justify-center gap-10'>
          {pairCardProps.map((props, index) => (
            <PairCard key={index} {...props} />
          ))}
        </div>
      </div>
    </main>
  )
}

export default MyVotes
