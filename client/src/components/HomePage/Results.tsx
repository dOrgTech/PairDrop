import { useState } from 'react'
import { useProjectsData } from '@/hooks/useDataAPI'
import { ProjectType } from '@/types'
import ProjectModal from '@/components/Modals/ProjectModal'
import { useModal } from '@/hooks/useModal'
import { formatNumber } from '@/utils'
import { results } from '@/config'

const TOTAL_FUNDS_AMOUNT = results.totalFundsAmount

// Results Table Component
const Results = () => {
  const { projectsData, isProjectsLoading, isProjectsError } = useProjectsData()
  const [viewAll, setViewAll] = useState(false)
  const [showProjectModal, setShowProjectModal] = useModal()
  const [selectedProjectId, setSelectedProjectId] = useState<number | null>(null)

  if (isProjectsLoading) return <div className='subtitle1 mt-32 text-center'>{results.loadingMessage}</div>
  if (isProjectsError) return <div className='subtitle1 mt-32 text-center'>{results.errorMessage}</div>
  if (!projectsData) return <div className='subtitle1 mt-32 text-center'>{results.noDataMessage}</div>

  const handleProjectClick = (projectId: number) => {
    setSelectedProjectId(projectId)
    setShowProjectModal(true)
  }

  const sortedProjectsData = [...projectsData].sort((a, b) => b.score - a.score)
  const displayedProjects = viewAll ? sortedProjectsData : sortedProjectsData.slice(0, 10)
  const selectedProjectData = sortedProjectsData.find((project: ProjectType) => project.projectId === selectedProjectId)
  const totalScore = sortedProjectsData.reduce((acc: number, project: ProjectType) => acc + project.score, 0)

  return (
    <div className='side-padding mt-32 flex w-full flex-col items-center whitespace-nowrap'>
      <h2 className='mb-10 text-center'>{results.title}</h2>

      <div className='mb-2 flex w-full max-w-[1280px] justify-between gap-2 px-[27px] text-sm font-medium uppercase lg:gap-4'>
        <span className='w-[4%]' />
        <span className='w-[46%] lg:w-[35%]'>Project Name</span>
        <span className='hidden w-[35%] lg:flex'>Categories</span>
        <span className='w-[15%] text-right lg:w-[8%]'>Score</span>
        <span className='w-[35%] text-right lg:w-[18%]'>Funding Received</span>
      </div>

      <div className='mb-10 flex w-full max-w-[1280px] flex-col gap-2'>
        {displayedProjects.length > 0 &&
          displayedProjects.map((project: ProjectType, index: number) => {
            const projectFunding = (project.score / totalScore) * TOTAL_FUNDS_AMOUNT
            return (
              <div key={index} className='card-table-row' onClick={() => handleProjectClick(project.projectId)}>
                <span className='w-[4%] min-w-[24px] text-right text-base font-bold md:text-lg md:font-black'>
                  {index + 1}.
                </span>
                <span className='w-[46%] truncate text-base font-bold md:text-lg md:font-black lg:w-[35%]'>
                  {project.projectName}
                </span>
                <div className='hidden w-[35%] flex-nowrap gap-2 lg:flex'>
                  {project.categories.slice(0, 3).map((category, index) => (
                    <div key={index} className='category-tag'>
                      {category}
                    </div>
                  ))}
                </div>
                <span className='w-[15%] text-right font-ibm md:text-lg lg:w-[8%]'>{project.score.toFixed(2)}</span>
                <span className='w-[35%] text-right text-base font-bold md:text-lg md:font-black lg:w-[18%]'>
                  {formatNumber(projectFunding.toFixed(0))} {results.currencySymbol}
                </span>
              </div>
            )
          })}
      </div>

      <button className='button mx-auto' onClick={() => setViewAll(!viewAll)}>
        {viewAll ? results.viewLessText : results.viewAllText}
      </button>

      <ProjectModal show={showProjectModal} onClose={() => setShowProjectModal(false)} data={selectedProjectData} />
    </div>
  )
}

export default Results
