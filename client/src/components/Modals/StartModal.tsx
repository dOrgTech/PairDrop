'use client'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import { startModal } from '@/config'

type StartModalProps = {
  show: boolean
  onClose: () => void
  setShowCountPage: (show: boolean) => void
  userScore: number | null
}

// Start Modal Component
const StartModal: React.FC<StartModalProps> = ({ show, onClose, setShowCountPage, userScore }) => {
  const [step, setStep] = useState(-1)

  // Set step based on user score (sorry message or walkthrough steps)
  useEffect(() => {
    userScore === 0 ? setStep(0) : setStep(1)
  }, [userScore])

  // Handle previous step
  const handlePrev = () => {
    if (step > 1) setStep(step - 1)
  }

  // Handle next step
  const handleNext = () => {
    if (step < 5) {
      setStep(step + 1)
    } else {
      setShowCountPage(true)
      onClose()
      localStorage.setItem('startModalFinished', 'true')
    }
  }

  // Handle go home
  const handleGoHome = () => {
    onClose()
    localStorage.setItem('startModalFinished', 'true')
  }

  // Step dots
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
              <h3>{startModal.steps[0].title}</h3>
              <p className='mt-4'>{startModal.steps[0].description}</p>
              <button className='button-next absolute -bottom-[24px] left-0 right-0 mx-auto' onClick={handleGoHome}>
                GO HOME
              </button>
            </>
          )}

          {/* User has score, show steps walkthrough */}
          {step === 1 && (
            <>
              <h4>{startModal.steps[1].title}</h4>
              <p className='mb-6 md:mb-10'>{startModal.steps[1].description}</p>
              <h4>{startModal.steps[1].subtitle}</h4>
              <p>
                {startModal.steps[1].additionalInfo?.text}
                <a
                  className='underline'
                  href={startModal.steps[1].additionalInfo?.linkUrl}
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  {startModal.steps[1].additionalInfo?.linkText}
                </a>
              </p>
            </>
          )}

          {step === 2 && (
            <>
              <h4>{startModal.steps[2].title}</h4>
              <p className='mb-4 md:mb-8'>{startModal.steps[2].description}</p>
              <Image
                className='mb-2 cursor-pointer'
                src={startModal.steps[2].imageSrc ?? ''}
                alt={startModal.steps[2].altText ?? ''}
                width={928}
                height={495}
              />
            </>
          )}

          {step === 3 && (
            <>
              <h4>{startModal.steps[3].title}</h4>
              <p>{startModal.steps[3].description}</p>
            </>
          )}

          {step === 4 && (
            <>
              <h4>{startModal.steps[4].title}</h4>
              <p>{startModal.steps[4].description}</p>
            </>
          )}

          {step === 5 && (
            <>
              <h3 className='mb-4 font-bold md:mb-8'>{startModal.steps[5].title}</h3>
              <p>{startModal.steps[5].description}</p>
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
