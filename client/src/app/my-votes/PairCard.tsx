import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { MyVoteCardType } from '@/types'

const PairCard = ({ firstProject, secondProject, status, votedProject, pairIndex }: MyVoteCardType) => {
  const router = useRouter()

  const firstProjectId = firstProject?.projectId
  const secondProjectId = secondProject?.projectId
  const votedProjectId = votedProject?.projectId
  const projectIcons = [firstProject?.projectIcon, secondProject?.projectIcon]

  return (
    <div
      className={`flex h-[185px] w-[315px] flex-col items-center border-[6px] bg-aquamarine-400 
            ${status === 'displayed' ? 'border-indigo-600' : 'border-indigo-300'} ${
              status !== 'hidden' && 'cursor-pointer'
            }`}
      onClick={() => {
        status === 'displayed'
          ? router.push(`/vote`)
          : status === 'voted'
            ? router.push(`/vote?edit=${pairIndex}`)
            : null
      }}
    >
      {status === 'hidden' ? (
        <div className='flex h-full w-full items-center justify-center opacity-50'>
          <Image
            className='h-fit'
            src='/assets/svgs/my-votes-pair-hidden.svg'
            alt={`Hidden Pair`}
            width={161}
            height={80}
          />
        </div>
      ) : (
        <>
          <div
            className={`relative flex min-h-[130px] w-full justify-center border-b-[6px] bg-gradient-teal ${
              status === 'displayed' ? 'border-indigo-600' : 'border-indigo-300'
            }`}
          >
            <Image
              className='mt-[18px] h-fit'
              src='/assets/svgs/my-votes-pair.svg'
              alt={`${status} Pair`}
              width={161}
              height={80}
            />
            {status === 'voted' ? (
              <button className='button-voted absolute -bottom-[22px] w-[160px] -rotate-3'>Voted</button>
            ) : (
              <button className='button absolute -bottom-[24px] w-[180px]'>Review</button>
            )}
            <div className='absolute mt-7 flex h-fit gap-[21px]'>
              {projectIcons.map((icon, index) => {
                const projectID = index === 0 ? firstProjectId : secondProjectId
                return (
                  icon && (
                    <>
                      <Image
                        key={icon}
                        src={icon}
                        alt={`${status} Icon`}
                        width={60}
                        height={60}
                        className={`h-[60px] w-[60px] rounded-full border-[3px] object-contain ${
                          votedProjectId === projectID
                            ? 'border-indigo-600 outline outline-[6px] outline-offset-[3px] outline-aquamarine-500'
                            : 'border-aquamarine-500'
                        }`}
                      />
                      {votedProjectId === projectID && (
                        <div
                          className={`voted-check-icon absolute -bottom-1.5 ${
                            projectID === secondProjectId ? 'right-[21px]' : 'left-[21px]'
                          }`}
                        />
                      )}
                    </>
                  )
                )
              })}
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default PairCard
