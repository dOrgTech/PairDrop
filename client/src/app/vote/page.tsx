'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import ProjectCard from './ProjectCard'
import ProjectModal from '@/components/Modals/ProjectModal'
import { usePairData, useVote, useUpdateVote, useMyScoreData } from '@/hooks/useDataAPI'
import { useModal } from '@/hooks/useModal'
import { useWeb3ModalAccount } from '@web3modal/ethers5/react'
import { useSearchParams } from 'next/navigation'
import { votePage, pairsCap } from '@/config'
import useShowCountPageStore from '@/stores/useShowCountPageStore'
import useEditVotedPairStore from '@/stores/useEditVotedPairStore'

// Vote Page
const Vote = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { setShowCountPage } = useShowCountPageStore()

  // Search params to check if user is editing a vote
  const edit = searchParams.get('edit') || undefined
  const { votedProjectId } = useEditVotedPairStore()

  const { isConnected, address } = useWeb3ModalAccount()
  const [currentPair, setCurrentPair] = useState(1)
  const [selectedProjectId, setSelectedProjectId] = useState<number | null>(null)
  const [viewProjectId, setViewProjectId] = useState<number | null>(null)
  const [firstProjectId, setFirstProjectId] = useState<number | null>(null)
  const [secondProjectId, setSecondProjectId] = useState<number | null>(null)
  const [showProjectModal, setShowProjectModal] = useModal()
  const [refetchPair, setRefetchPair] = useState(false)
  const [shouldFetchPair, setShouldFetchPair] = useState(true)
  const [loading, setLoading] = useState(false)
  const [pageLoading, setPageLoading] = useState(false)

  // Get user score & Fetch, send or update vote and pair data
  const { pairData, isPairLoading, isPairError } = usePairData(address, shouldFetchPair, refetchPair, Number(edit))
  const { myScoreData, isMyScoreLoading, isMyScoreError } = useMyScoreData(address)
  const { vote } = useVote(address, selectedProjectId)
  const { updateVote } = useUpdateVote(address, firstProjectId, secondProjectId, selectedProjectId)

  // set setShowCountPage to false by default
  useEffect(() => {
    setShowCountPage(false)
  }, [setShowCountPage])

  // Set initial values for pair data
  useEffect(() => {
    if (pairData) {
      pairData.pairIndex && setCurrentPair(pairData.pairIndex)
      pairData.firstProject && setFirstProjectId(pairData.firstProject.projectId)
      pairData.secondProject && setSecondProjectId(pairData.secondProject.projectId)
    }
  }, [pairData])

  // Redirect user if they have no score or if they have voted all pairs & set votedProject if user is editing
  useEffect(() => {
    if (myScoreData && myScoreData.score > 0) {
      if ((pairData && pairData.pairIndex > pairsCap) || (edit && Number(edit) > pairsCap)) {
        setPageLoading(true)
        router.push('/my-votes')
      }
      if (votedProjectId) {
        setSelectedProjectId(Number(votedProjectId))
      }
    }
  }, [edit, pairData, myScoreData, votedProjectId, router])

  // Show not connected, loading, error, no projects messages & redirect if user has no score
  if (!isConnected || !address)
    return <div className='subtitle1 mt-24 text-center'>{votePage.connectWalletMessage}</div>

  if (isPairLoading || isMyScoreLoading || pageLoading)
    return <div className='subtitle1 mt-24 text-center'>{votePage.loadingMessage}</div>

  if (isPairError || isMyScoreError) return <div className='subtitle1 mt-24 text-center'>{votePage.errorMessage}</div>

  if (!address && address && myScoreData && myScoreData.score === 0) {
    router.push('/')
  }

  if (!pairData || myScoreData.score === 0)
    return <div className='subtitle1 mt-24 text-center'>{votePage.noDataMessage}</div>

  // Set the first, second, and viewed projects
  const firstProject = pairData.firstProject
  const secondProject = pairData.secondProject
  const viewedProject = firstProject.projectId === viewProjectId ? firstProject : secondProject

  // Handle next button click
  const handleNext = async () => {
    setLoading(true)
    if (edit) {
      setShouldFetchPair(false)
      await updateVote()
      router.push('/my-votes')
    } else if (currentPair === pairsCap) {
      setShouldFetchPair(false)
      await vote()
      router.push('/my-votes?finished=true')
    } else if (selectedProjectId) {
      await vote()
      setRefetchPair(!refetchPair)
      setSelectedProjectId(null)
    }
    setLoading(false)
  }

  // Render steps for the current pair (dots & dashes)
  const renderSteps = () => {
    let elements = []

    for (let i = 1; i <= pairsCap; i++) {
      elements.push(<div className={i <= currentPair ? 'step-active' : 'step-inactive'} key={`step-${i}`} />)

      if (i < pairsCap) {
        elements.push(<div className={i < currentPair ? 'dashes-blue' : 'dashes-white'} key={`dash-${i}`} />)
      }
    }

    return elements
  }

  return (
    <>
      <div className='mb-6 text-center text-[44px] font-black uppercase leading-[50px] text-white'>
        PAIR {currentPair} <span className='text-[28px]'>OF</span> {pairsCap}
      </div>

      <div className='mb-5 flex items-center gap-1.5'>{renderSteps()}</div>

      <Link
        href='/my-votes'
        className='mb-16 flex w-fit cursor-pointer items-center justify-center gap-2 font-ibm text-sm font-medium leading-tight underline transition-transform hover:-translate-x-1'
      >
        <div className='arrow-left-blue-icon' />
        {votePage.backToMyVotesText}
      </Link>

      <div className='card card-blue-dots mb-24 flex w-full flex-col gap-0.5 p-8 md:p-12'>
        <h4>{votePage.instructionsTitle}</h4>
        <p>{votePage.instructionsDescription}</p>
      </div>

      <div className='flex w-full flex-col justify-between gap-8 lg:flex-row'>
        <ProjectCard
          {...firstProject}
          setSelectedProjectId={setSelectedProjectId}
          setViewProjectId={setViewProjectId}
          selected={selectedProjectId === firstProject.projectId}
          onProjectView={() => setShowProjectModal(true)}
        />
        <ProjectCard
          {...secondProject}
          setSelectedProjectId={setSelectedProjectId}
          setViewProjectId={setViewProjectId}
          selected={selectedProjectId === secondProject.projectId}
          onProjectView={() => setShowProjectModal(true)}
        />
      </div>

      <button className='button my-16 lg:-mt-3' disabled={selectedProjectId === null || loading} onClick={handleNext}>
        {loading ? 'LOADING...' : edit ? 'UPDATE' : currentPair === pairsCap ? 'FINISH' : 'NEXT'}
      </button>

      <ProjectModal show={showProjectModal} onClose={() => setShowProjectModal(false)} data={viewedProject} />
    </>
  )
}

export default Vote
