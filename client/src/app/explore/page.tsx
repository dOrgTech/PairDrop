'use client'
import { useState } from 'react'
import ProjectCard from './ProjectCard'
import ProjectModal from '@/components/Modals/ProjectModal'
import { useProjectsData } from '@/hooks/useDataAPI'
import { ProjectType, ProjectCardType } from '@/types'
import { useModal } from '@/hooks/useModal'
import { explorePage } from '@/config'

// Explore Page
const Explore = () => {
  const { projectsData, isProjectsLoading, isProjectsError } = useProjectsData()
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [showProjectModal, setShowProjectModal] = useModal()
  const [selectedProjectId, setSelectedProjectId] = useState<number | null>(null)

  // Loading, Error & No Data handling
  if (isProjectsLoading) return <div className='subtitle1'>{explorePage.loadingMessage}</div>
  if (isProjectsError) return <div className='subtitle1'>{explorePage.errorMessage}</div>
  if (!projectsData) return <div className='subtitle1'>{explorePage.noDataMessage}</div>

  const handleProjectClick = (projectId: number) => {
    setSelectedProjectId(projectId)
    setShowProjectModal(true)
  }

  // Filter projects based on search query
  const selectedProjectData = projectsData.find((project: ProjectType) => project.projectId === selectedProjectId)

  const filteredProjects = projectsData.filter(
    (project: ProjectType) =>
      project.projectName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.projectDetails.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.categories.some((category: string) => category.toLowerCase().includes(searchQuery.toLowerCase())),
  )

  return (
    <>
      <input
        type='search'
        placeholder={explorePage.searchPlaceholder}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className='search-input'
      />
      <div className='flex flex-wrap justify-center gap-x-10 gap-y-16'>
        {filteredProjects.length > 0 ? (
          filteredProjects.map((card: ProjectCardType, index: number) => (
            <div key={index} onClick={() => handleProjectClick(card.projectId)}>
              <ProjectCard {...card} />
            </div>
          ))
        ) : (
          <h5>{explorePage.noResultsMessage}</h5>
        )}
      </div>
      <ProjectModal show={showProjectModal} onClose={() => setShowProjectModal(false)} data={selectedProjectData} />
    </>
  )
}

export default Explore
