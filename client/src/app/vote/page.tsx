'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import ProjectCard from './ProjectCard'
import ProjectModal from '@/components/Modals/ProjectModal'
import { useProjectsData, usePairData, useVote } from '@/hooks/useDataAPI'
import { ProjectType } from '@/types/Project'
import { useModal } from '@/hooks/useModal'

const MyVotes = () => {
  const router = useRouter()
  const { projectsData, isProjectsLoading, isProjectsError } = useProjectsData()
  const [currentPair, setCurrentPair] = useState(1)
  const [selectedProjectId, setSelectedProjectId] = useState<number | null>(null)
  const [showProjectModal, setShowProjectModal] = useModal()
  const [refetchPair, setRefetchPair] = useState(false)
  const { pairData, isPairLoading, isPairError } = usePairData(refetchPair)
  const { vote } = useVote(selectedProjectId)

  if (isProjectsLoading || isPairLoading)
    return <div className='subtitle1 mt-24 text-center'>Loading projects pairs...</div>
  if (isProjectsError || isPairError)
    return <div className='subtitle1 mt-24 text-center'>Error loading projects pairs</div>
  if (!projectsData || !pairData)
    return <div className='subtitle1 mt-24 text-center'>No projects pairs data available</div>

  const project1 = pairData.project1
  const project2 = pairData.project2

  const renderSteps = () => {
    const totalPairs = 5
    let elements = []

    for (let i = 1; i <= totalPairs; i++) {
      elements.push(<div className={i <= currentPair ? 'step-active' : 'step-inactive'} key={`step-${i}`} />)

      if (i < totalPairs) {
        elements.push(<div className={i < currentPair ? 'dashes-blue' : 'dashes-white'} key={`dash-${i}`} />)
      }
    }

    return elements
  }

  const handleNext = async () => {
    // if (selectedProjectId !== null) {
    //   await vote()
    // }

    if (currentPair === 5) {
      router.push('/my-votes')
    } else {
      setRefetchPair(!refetchPair)
      setCurrentPair(currentPair + 1)
      setSelectedProjectId(null)
    }
  }

  const handleProjectClick = (projectId: number) => {
    setSelectedProjectId(projectId)
    setShowProjectModal(true)
  }

  const selectedProjectData = projectsData.find((project: ProjectType) => project.projectId === selectedProjectId)

  return (
    <>
      <div className='mb-6 text-center text-[44px] font-black uppercase leading-[50px] text-white'>
        PAIR {currentPair} <span className='text-[28px]'>OF</span> 5
      </div>

      <div className='mb-5 flex items-center gap-1.5'>{renderSteps()}</div>

      <Link
        href='/my-votes'
        className='mb-16 flex w-fit cursor-pointer items-center justify-center gap-2 font-ibm text-sm font-medium leading-tight underline transition-transform hover:-translate-x-1'
      >
        <div className='arrow-left-blue-icon' />
        View All Pairs
      </Link>

      <div className='card card-blue-dots mb-24 flex w-full flex-col gap-0.5 p-12'>
        <h4>WHICH ONE DO YOU CHOOSE?</h4>
        <p>Review our guide on how to vote to ensure you’re reviewing each in consideration of public impact.</p>
      </div>

      <div className='flex w-full justify-between'>
        <ProjectCard
          {...project1}
          setSelectedProjectId={setSelectedProjectId}
          selected={selectedProjectId === project1.projectId}
          onProjectView={() => handleProjectClick(project1.projectId)}
        />
        <ProjectCard
          {...project2}
          setSelectedProjectId={setSelectedProjectId}
          selected={selectedProjectId === project2.projectId}
          onProjectView={() => handleProjectClick(project2.projectId)}
        />
      </div>

      <button className='button -mt-3' disabled={selectedProjectId === null} onClick={handleNext}>
        {currentPair === 5 ? 'FINISH' : 'NEXT'}
      </button>

      <ProjectModal show={showProjectModal} onClose={() => setShowProjectModal(false)} data={selectedProjectData} />
    </>
  )
}

export default MyVotes
