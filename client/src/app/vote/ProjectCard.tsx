import Image from 'next/image'

interface ProjectCardProps {
  projectId: number
  projectName: string
  projectDetails: string
  categories: string[]
  projectIcon: string
  setSelectedProjectId: React.Dispatch<React.SetStateAction<number | null>>
  setViewProjectId: React.Dispatch<React.SetStateAction<number | null>>
  selected: boolean
  onProjectView: () => void
}

const ProjectCard = ({
  projectId,
  projectName,
  projectDetails,
  categories,
  projectIcon,
  setSelectedProjectId,
  setViewProjectId,
  selected,
  onProjectView,
}: ProjectCardProps) => {
  const handleViewButtonClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.stopPropagation()
    setViewProjectId(projectId)
    onProjectView()
  }

  return (
    <div className='group flex cursor-pointer flex-col items-center' onClick={() => setSelectedProjectId(projectId)}>
      <div
        className={`card transition-element relative z-10 h-full w-[410px] cursor-pointer p-6 !duration-150 group-hover:border-aquamarine-400 group-hover:shadow-aqua ${
          selected ? 'border-aquamarine-400 shadow-aqua' : ''
        }`}
      >
        <div className='flex items-center gap-3'>
          <div className='project-icon mb-2.5 h-16 w-16'>
            <Image
              className='max-h-[50px] max-w-[50px] rounded-full object-contain'
              src={projectIcon}
              alt='Project Icon'
              width={50}
              height={50}
            />
          </div>
          <div className='project-card-dots' />
        </div>
        <h6 className='truncate-2-lines mb-4'>{projectName}</h6>
        <div className='truncate-4-lines mb-4 font-ibm'>{projectDetails}</div>
        <div className='mb-6 flex max-h-[52px] flex-wrap gap-2 overflow-hidden'>
          {categories.map((category, index) => (
            <div key={index} className='category-tag'>
              {category}
            </div>
          ))}
        </div>
        <button className='button mt-auto' onClick={handleViewButtonClick}>
          View Project
        </button>
      </div>

      <div className='dashes-blue mb-3.5 mt-1.5 rotate-90' />

      <div className={`${selected ? 'select-project-active' : 'select-project'} duration-150`} />
    </div>
  )
}

export default ProjectCard
