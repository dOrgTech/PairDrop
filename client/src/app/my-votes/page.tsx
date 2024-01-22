'use client'
import PairCard from './PairCard'
import { useProjectsData } from '@/hooks/useDataAPI'
import { ProjectType } from '@/types/Project'
import myVotesData from '@/data/my-votes.json'

const MyVotes = () => {
  const { projectsData, isProjectsLoading, isProjectsError } = useProjectsData()

  if (isProjectsLoading) return <div className='subtitle1 mt-32 text-center'>Loading votes data...</div>
  if (isProjectsError) return <div className='subtitle1 mt-32 text-center'>Error loading votes</div>
  if (!projectsData) return <div className='subtitle1 mt-32 text-center'>No votes data available</div>

  const pairCardProps = myVotesData.map((vote) => ({
    status: vote.status as 'voted' | 'vote' | 'hidden',
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
      {pairCardProps.map((props, index) => (
        <PairCard key={index} {...props} />
      ))}
    </div>
  )
}

export default MyVotes
