'use client'
import { useState } from 'react'
import ProjectCard from './ProjectCard'
import ProjectModal from '@/components/Modals/ProjectModal'
import { useProjectsData } from '@/hooks/useDataAPI'
import { ProjectType } from '@/types/Project'
import { ProjectCardType } from '@/types/ProjectCard'
import { useModal } from '@/hooks/useModal'

const Explore = () => {
  const { projectsData, isProjectsLoading, isProjectsError } = useProjectsData()
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [showProjectModal, setShowProjectModal] = useModal()
  const [selectedProjectId, setSelectedProjectId] = useState<number | null>(null)

  if (isProjectsLoading) return <div className='subtitle1'>Loading...</div>
  if (isProjectsError) return <div className='subtitle1'>Error loading projects</div>
  if (!projectsData) return <div className='subtitle1'>No project data available</div>

  const handleProjectClick = (projectId: number) => {
    setSelectedProjectId(projectId)
    setShowProjectModal(true)
  }

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
        placeholder='Search projects...'
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className='search-input'
      />
      <div className='flex flex-wrap gap-x-10 gap-y-16'>
        {filteredProjects.length > 0 ? (
          filteredProjects.map((card: ProjectCardType, index: number) => (
            <div key={index} onClick={() => handleProjectClick(card.projectId)}>
              <ProjectCard {...card} />
            </div>
          ))
        ) : (
          <h5>No Results Found</h5>
        )}
      </div>
      <ProjectModal show={showProjectModal} onClose={() => setShowProjectModal(false)} data={selectedProjectData} />
    </>
  )
}

export default Explore
