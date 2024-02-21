'use client'
import { useRef, RefObject } from 'react'
import useOutsideClick from '@/hooks/useOutsideClick'
import { finishModal } from '@/config'

type FinishModalProps = {
  show: boolean
  onClose: () => void
}

// Finish Modal Component
const FinishModal: React.FC<FinishModalProps> = ({ show, onClose }) => {
  const modalRef: RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null)

  const handleCloseModal = () => {
    onClose()
  }

  // Close modal when clicking outside of it
  useOutsideClick(modalRef, handleCloseModal)

  return show ? (
    <div className='modal-overlay side-padding'>
      <div ref={modalRef} className='card card-white-dots mx-5 h-fit max-w-[1024px] flex-col justify-center p-0'>
        <div className='relative p-8 pb-10 md:px-12 md:pb-16 md:pt-12'>
          <h3>{finishModal.title}</h3>
          <p className='mt-4'>{finishModal.description}</p>
          <button className='button-next absolute -bottom-[24px] left-0 right-0 mx-auto' onClick={handleCloseModal}>
            CLOSE
          </button>
        </div>
        <div className='modal-footer' />
      </div>
    </div>
  ) : null
}

export default FinishModal
