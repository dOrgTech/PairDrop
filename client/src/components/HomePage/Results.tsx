import { useState } from 'react'
import { useProjectsData } from '@/hooks/useDataAPI'
import { ProjectType } from '@/types/Project'
import ProjectModal from '@/components/Modals/ProjectModal'
import { useModal } from '@/hooks/useModal'
import { numberWithCommas } from '@/utils'

const TOTAL_FUNDS_AMOUNT = 100000

const Results = () => {
  const { projectsData, isProjectsLoading, isProjectsError } = useProjectsData()
  const [viewAll, setViewAll] = useState(false)
  const [showProjectModal, setShowProjectModal] = useModal()
  const [selectedProjectId, setSelectedProjectId] = useState<number | null>(null)

  if (isProjectsLoading) return <div className='subtitle1 mt-32 text-center'>Loading projects...</div>
  if (isProjectsError) return <div className='subtitle1 mt-32 text-center'>Error loading projects</div>
  if (!projectsData) return <div className='subtitle1 mt-32 text-center'>No project data available</div>

  const handleProjectClick = (projectId: number) => {
    setSelectedProjectId(projectId)
    setShowProjectModal(true)
  }

  const sortedProjectsData = [...projectsData].sort((a, b) => b.score - a.score)
  const displayedProjects = viewAll ? sortedProjectsData : sortedProjectsData.slice(0, 10)
  const selectedProjectData = sortedProjectsData.find((project: ProjectType) => project.projectId === selectedProjectId)
  const totalScore = sortedProjectsData.reduce((acc: number, project: ProjectType) => acc + project.score, 0)

  return (
    <div className='side-padding mt-32 flex w-full flex-col items-center'>
      <h2 className='mb-10 text-center'>RESULTS</h2>

      <div className='mb-2 flex w-full max-w-[1280px] justify-between gap-4 px-[27px] text-sm font-medium uppercase'>
        <span className='w-[4%]' />
        <span className='w-[35%]'>Project Name</span>
        <span className='w-[35%]'>Categories</span>
        <span className='w-[8%] text-right'>Score</span>
        <span className='w-[18%] text-right'>Fuding Received</span>
      </div>

      <div className='mb-10 flex w-full max-w-[1280px] flex-col gap-2'>
        {displayedProjects.length > 0 &&
          displayedProjects.map((project: ProjectType, index: number) => {
            const projectFunding = (project.score / totalScore) * TOTAL_FUNDS_AMOUNT
            return (
              <div key={index} className='card-table-row' onClick={() => handleProjectClick(project.projectId)}>
                <span className='w-[4%] text-right text-lg font-black'>{index + 1}.</span>
                <span className='w-[35%] truncate text-lg font-black'>{project.projectName}</span>
                <div className='flex w-[35%] flex-nowrap gap-2'>
                  {project.categories.slice(0, 4).map((category, index) => (
                    <div key={index} className='category-tag'>
                      {category}
                    </div>
                  ))}
                </div>
                <span className='w-[8%] text-right font-ibm'>{project.score.toFixed(2)}</span>
                <span className='w-[18%] text-right text-lg font-black'>
                  {numberWithCommas(projectFunding.toFixed(0))} USDC
                </span>
              </div>
            )
          })}
      </div>

      <button className='button mx-auto' onClick={() => setViewAll(!viewAll)}>
        {viewAll ? 'View Less' : 'View All'}
      </button>

      <ProjectModal show={showProjectModal} onClose={() => setShowProjectModal(false)} data={selectedProjectData} />
    </div>
  )
}

export default Results
