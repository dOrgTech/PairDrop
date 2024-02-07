'use client'
import { useState, useEffect } from 'react'
import Image from 'next/image'

type StartModalProps = {
  show: boolean
  onClose: () => void
  setShowCountPage: (show: boolean) => void
  userScore: number | null
}

const StartModal: React.FC<StartModalProps> = ({ show, onClose, setShowCountPage, userScore }) => {
  const [step, setStep] = useState(-1)

  useEffect(() => {
    userScore === 0 ? setStep(0) : setStep(1)
  }, [userScore])

  const handlePrev = () => {
    if (step > 1) setStep(step - 1)
  }

  const handleNext = () => {
    if (step < 5) {
      setStep(step + 1)
    } else {
      setShowCountPage(true)
      onClose()
      localStorage.setItem('startModalFinished', 'true')
    }
  }

  const handleGoHome = () => {
    onClose()
    localStorage.setItem('startModalFinished', 'true')
  }

  const stepDots = []
  for (let i = 1; i <= 5; i++) {
    const isClickable = i <= step + 1
    stepDots.push(
      <div
        key={i}
        className={`${step === i ? 'step-active' : 'step-inactive'} ${isClickable ? 'cursor-pointer' : ''}`}
        onClick={() => isClickable && setStep(i)}
      />,
    )
  }

  return show ? (
    <div className='modal-overlay side-padding'>
      <div className='card card-white-dots mx-5 mb-8 h-fit max-w-[1024px] flex-col justify-center p-0'>
        <div className='relative p-8 pb-10 md:px-12 md:pb-16 md:pt-12'>
          {/* User has no score, show sorry message */}
          {step === 0 && (
            <>
              <h3>SORRY, ANON</h3>
              <p className='mt-4'>
                It appears you didn’t qualify for this round. But don’t distress, keep sowing your seeds in the
                cybernetic gardens, and soon you’ll be a chosen one.
              </p>
              <button className='button-next absolute -bottom-[24px] left-0 right-0 mx-auto' onClick={handleGoHome}>
                GO HOME
              </button>
            </>
          )}

          {/* User has score, show steps walkthrough */}
          {step === 1 && (
            <>
              <h4>THE CHALLENGE:</h4>
              <p className='mb-6 md:mb-10'>
                Intelligently distribute the funding to projects who demonstrate the most impact.
              </p>
              <h4>WTHAT&#39;S AT STAKE:</h4>
              <p>
                Uncover the lesser known impactooors making Ethereum great.
                <br />
                <br />
                You will earn prestige, a POAP, and newfound knowledge of what’s happening in{' '}
                <a
                  className='underline'
                  href='https://ethereum.foundation/infinitegarden'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  The Infinite Garden!
                </a>
              </p>
            </>
          )}

          {step === 2 && (
            <>
              <h4>HOW TO VOTE:</h4>
              <p className='mb-4 md:mb-8'>A quick demonstration on how to use PairDrop.</p>
              <Image
                className='mb-2 cursor-pointer'
                src='/assets/misc/how-video-placeholder.png'
                alt='How to Vote Video Placeholder'
                width={928}
                height={495}
              />
            </>
          )}

          {step === 3 && (
            <>
              <h4>ESTIMATED TIME TO COMPLETE:</h4>
              <p>
                15 minutes
                <br />
                <br />
                You will be presented with 5 pairs of projects to review side-by-side.
                <br />
                <br />
                Drop your points to the ones you believe will accelerate diverse innovation in the Ethereum ecosystem.
              </p>
            </>
          )}

          {step === 4 && (
            <>
              <h4>EVALUATION GUIDE:</h4>
              <p>
                We’ve prepared a helpful evaluation guide that should help you determine the amount of impact a
                particular has had. Please consider the following evaluation criteria:
                <br />
                <br />
                Given the project’s funding to date and the scale of the problem they’re addressing, how impactful was
                their contribution?
                <br />
                <br />
                If this project was fully resourced, would they significantly move the needle forward on their focus
                issue?
                <br />
                <br />
                How underserved are they? Geographically? Topically? Visibility in the ecosystem?
                <br />
                <br />
                If you are not sure, or are not familiar with the areas the project or person is working in, make your
                best guess.
                <br />
                <br />
                Lastly, you will have an opportunity to leave feedback for each project to support their mission
                effectiveness!
              </p>
            </>
          )}

          {step === 5 && (
            <>
              <h3 className='mb-4 font-bold md:mb-8'>ANON, THE CHOSEN ONE:</h3>
              <p>
                Your on-chain wisdom is legendary. Will you take on this mission to skillfully distribute the funding
                pool?
              </p>
            </>
          )}

          {step > 1 && (
            <button className='button-prev absolute -bottom-[24px] left-12' onClick={handlePrev}>
              {step !== 5 ? 'Previous' : 'No'}
            </button>
          )}
          {step > 0 && (
            <button className='button-next absolute -bottom-[24px] right-12' onClick={handleNext}>
              {step !== 5 ? 'Next' : 'Yes'}
            </button>
          )}
        </div>
        <div className='modal-footer' />
      </div>

      {step > 0 && <div className='flex gap-5'>{stepDots}</div>}
    </div>
  ) : null
}

export default StartModal
