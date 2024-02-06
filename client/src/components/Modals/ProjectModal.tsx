import { useRef, RefObject } from 'react'
import Image from 'next/image'
import useOutsideClick from '@/hooks/useOutsideClick'
import { SocialLink, Metric, ProjectLink, Funding } from '@/types'

type ProjectModalProps = {
  show: boolean
  onClose: () => void
  data: any
}

const ProjectModal: React.FC<ProjectModalProps> = ({ show, onClose, data }) => {
  const modalRef: RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null)

  const handleCloseModal = () => {
    onClose()
  }

  useOutsideClick(modalRef, handleCloseModal)

  return show ? (
    <div className='modal-overlay z-50 items-start justify-start pt-0'>
      <div className='close-icon absolute right-4 top-6 z-50 hidden xl:block' onClick={handleCloseModal} />
      <div
        ref={modalRef}
        className='relative mr-16 flex h-fit min-h-screen w-full max-w-[1024px] flex-col overflow-y-auto border-r-[6px] border-indigo-600 bg-gradient-teal p-12 pt-[72px]'
      >
        <div className='close-blue-icon absolute right-6 top-6 z-50 block xl:hidden' onClick={handleCloseModal} />

        {/* Project Icon & Social Links */}
        <div className='relative mb-5 flex items-center gap-6'>
          <div className='project-icon h-[72px] w-[72px]'>
            <Image
              className='max-h-[58px] max-w-[58px] rounded-full object-contain'
              src={data.projectIcon}
              alt='project icon'
              width={58}
              height={58}
            />
          </div>
          <div className='project-modal-dots' />

          <div className='absolute right-0 flex gap-8'>
            {data.projectSocials.map((social: SocialLink, index: number) => {
              const platform = Object.keys(social)[0]
              const url = social[platform]

              return (
                <a
                  key={index}
                  href={url}
                  target='_blank'
                  rel='nofollow noopener noreferrer'
                  className={`${platform}-icon`}
                />
              )
            })}
          </div>
        </div>

        {/* Project Title */}
        <div className='mb-4 text-[28px] font-extrabold'>{data.projectName}</div>

        {/* Project Categories */}
        <div className='mb-16 flex flex-wrap gap-2'>
          {data.categories.map((category: string, index: number) => (
            <div key={index} className='category-tag h-[34px] p-3 pt-2.5 text-xs'>
              {category}
            </div>
          ))}
        </div>

        {/* Project Details */}
        <div className='mb-8 flex flex-col gap-4'>
          <div className='font-black'>PROJECT DETAILS</div>
          <div className='whitespace-pre-line font-ibm leading-relaxed'>{data.projectDetails}</div>
        </div>

        {/* Project Metrics */}
        <div className='mb-8 flex flex-col gap-4'>
          <div className='font-black'>PROJECT METRICS</div>
          <div className='flex w-full flex-wrap gap-6'>
            {data.projectMetrics.map((metric: Metric, index: number) => {
              const metricName = Object.keys(metric)[0]
              const metricValue = metric[metricName]

              return (
                <div className='card-metric' key={index}>
                  <div className='font-ibm text-sm'>{metricName}</div>
                  <div className='font-black'>
                    {metricName.includes('Funding') ? '$' : ''}
                    {metricValue.toLocaleString()}
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Project Demo Video & Links */}
        <div className='mb-16 flex flex-col gap-4'>
          <div className='font-black'>PROJECT LINKS</div>
          <Image
            className='cursor-pointer'
            src='/assets/misc/project-overview-video-placeholder.png'
            alt='Project Overview Demo Video Placeholder'
            width={929}
            height={494}
          />

          <div className='flex flex-col gap-2'>
            {data.projectLinks.map((link: ProjectLink, index: number) => {
              const linkText = Object.keys(link)[0]
              const linkUrl = link[linkText]

              return (
                <div className='card-link justify-between gap-4' key={index}>
                  <a href={linkUrl} target='_blank' rel='nofollow noopener noreferrer'>
                    {linkText}
                  </a>
                  <div className='link-icon' />
                </div>
              )
            })}
          </div>
        </div>

        {/* Project Impact Details */}
        <div className='mb-8 flex flex-col gap-4'>
          <div className='text-2xl font-black'>IMPACT DETAILS</div>
          <div className='whitespace-pre-line font-ibm leading-relaxed'>{data.impactDetails}</div>
        </div>

        {/* Project Impact Metrics */}
        <div className='mb-16 flex flex-col gap-5'>
          <div className='font-black'>IMPACT METRICS</div>
          <div className='flex w-full flex-wrap gap-6'>
            {data.impactMetrics.map((metric: Metric, index: number) => {
              const metricName = Object.keys(metric)[0]
              const metricValue = metric[metricName]

              return (
                <div className='card-metric' key={index}>
                  <div className='font-ibm text-sm'>{metricName}</div>
                  <div className='font-black'>{metricValue.toLocaleString()}</div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Project Funding */}
        <div className='flex flex-col gap-5'>
          <div className='font-black'>FUNDING</div>

          <div className='flex flex-col'>
            <div className='font-ibm text-sm'>TOTAL FUNDING TO DATE</div>
            {data.funding && (
              <div className='font-black'>
                $
                {data.funding
                  .reduce((total: number, fund: Funding) => {
                    const fundValue = fund[Object.keys(fund)[0]]
                    return total + fundValue
                  }, 0)
                  .toLocaleString()}
              </div>
            )}
          </div>

          <div className='flex flex-col gap-2'>
            {data.funding.map((fund: Funding, index: number) => {
              const fundName = Object.keys(fund)[0]
              const fundValue = fund[fundName]

              return (
                <div className='card-metric w-full' key={index}>
                  <div className='font-ibm text-sm'>{fundName}</div>
                  <div className='font-black'>${fundValue.toLocaleString()}</div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  ) : null
}

export default ProjectModal
