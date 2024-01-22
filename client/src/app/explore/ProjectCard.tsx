import Image from 'next/image'
import { ProjectCardType } from '@/types/ProjectCard'

const ProjectCard = ({ projectName, projectDetails, categories, projectIcon }: ProjectCardType) => {
  return (
    <div className='card relative w-[315px] cursor-pointer p-5 pt-10'>
      <div className='project-icon absolute -top-9 h-16 w-16'>
        <Image
          className='max-h-[50px] max-w-[50px] rounded-full object-contain'
          src={projectIcon}
          alt='Project Icon'
          width={50}
          height={50}
        />
      </div>
      <div className='mb-4 flex flex-col gap-2'>
        <h6 className='truncate-2-lines leading-[26px]'>{projectName}</h6>
        <div className='truncate-4-lines font-ibm'>{projectDetails}</div>
      </div>
      <div className='flex max-h-[52px] flex-wrap gap-2 overflow-hidden'>
        {categories.map((category, index) => (
          <div key={index} className='category-tag'>
            {category}
          </div>
        ))}
      </div>
    </div>
  )
}

export default ProjectCard
