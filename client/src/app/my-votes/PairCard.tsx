import Image from 'next/image'

interface CardProps {
  status: 'voted' | 'vote' | 'hidden'
  projectIcons: (string | undefined)[]
  firstProjectID: number
  secondProjectID: number
  votedProjectID?: number
}

const PairCard = ({ status, projectIcons, votedProjectID, firstProjectID, secondProjectID }: CardProps) => {
  return (
    <div
      className={`bg-aquamarine-400 flex h-[185px] w-[315px] flex-col items-center border-[6px] 
            ${status === 'vote' ? 'border-indigo-600' : 'border-indigo-300'} ${
              status !== 'hidden' && 'cursor-pointer'
            }`}
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
            className={`bg-gradient-teal relative flex min-h-[130px] w-full justify-center border-b-[6px] ${
              status === 'vote' ? 'border-indigo-600' : 'border-indigo-300'
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
              <button className='voted-button absolute -bottom-[22px] w-[160px] -rotate-3'>Voted</button>
            ) : (
              <button className='button absolute -bottom-[24px] w-[180px]'>Review</button>
            )}
            <div className='absolute mt-7 flex h-fit gap-[21px]'>
              {projectIcons.map((icon, index) => {
                const projectID = index === 0 ? firstProjectID : secondProjectID
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
                          votedProjectID === projectID
                            ? 'outline-aquamarine-500 border-indigo-600 outline outline-[6px] outline-offset-[3px]'
                            : 'border-aquamarine-500'
                        }`}
                      />
                      {votedProjectID === projectID && (
                        <div
                          className={`voted-check-icon absolute -bottom-1.5 ${
                            projectID === secondProjectID ? 'right-[21px]' : 'left-[21px]'
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
