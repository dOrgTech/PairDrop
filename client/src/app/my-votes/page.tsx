'use client'
import PairCard from './PairCard'
import { useProjectsData, useMyVotesData } from '@/hooks/useDataAPI'
import { ProjectType } from '@/types/Project'

type VoteType = {
  firstProjectId: number
  secondProjectId: number
  status: 'displayed' | 'voted' | 'hidden'
  votedProjectId: number
  vote: number
}

interface PairCardType {
  firstProjectID: number
  secondProjectID: number
  status: 'voted' | 'displayed' | 'hidden'
  votedProjectId?: number
  projectIcons: (string | undefined)[]
}

const MyVotes = () => {
  const { projectsData, isProjectsLoading, isProjectsError } = useProjectsData()
  const { myVotesData, isMyVotesLoading, isMyVotesError } = useMyVotesData()

  if (isProjectsLoading || isMyVotesLoading)
    return <div className='subtitle1 mt-32 text-center'>Loading votes data...</div>
  if (isProjectsError || isProjectsError) return <div className='subtitle1 mt-32 text-center'>Error loading votes</div>
  if (!projectsData || !myVotesData) return <div className='subtitle1 mt-32 text-center'>No votes data available</div>

  const pairCardProps = myVotesData.map((vote: VoteType) => ({
    status: vote.status as 'voted' | 'displayed' | 'hidden',
    projectIcons: [
      projectsData.find((p: ProjectType) => p.projectId === vote.firstProjectId)?.projectIcon || '',
      projectsData.find((p: ProjectType) => p.projectId === vote.secondProjectId)?.projectIcon || '',
    ],
    firstProjectID: vote.firstProjectId,
    secondProjectID: vote.secondProjectId,
    votedProjectID: vote.votedProjectId,
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
    <div className='flex flex-wrap justify-center gap-10'>
      {pairCardProps.map((props: PairCardType, index: number) => (
        <PairCard key={index} {...props} />
      ))}
    </div>
  )
}

export default MyVotes
