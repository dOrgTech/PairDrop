'use client'
import React, { useState } from 'react'
import { faq } from '@/config'

interface IFaq {
  question: string
  answer: string | JSX.Element
}

// FAQ Component
const FAQ: React.FC = () => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null)

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index)
  }

  return (
    <div className='side-padding mt-32 flex flex-col items-center gap-2'>
      <h2 className='mb-8 text-center'>{faq.title}</h2>
      {faq.qaList.map((faq, index) => (
        <FaqCard key={index} faq={faq} isOpen={openFaqIndex === index} onToggle={() => toggleFaq(index)} />
      ))}
    </div>
  )
}

export default FAQ

// FAQ Card
const FaqCard: React.FC<{ faq: IFaq; isOpen: boolean; onToggle: () => void }> = ({ faq, isOpen, onToggle }) => {
  return (
    <div className='card flex cursor-pointer flex-col gap-4 border-[3px]' onClick={onToggle}>
      <div className='flex w-full items-center justify-between'>
        <h5>{faq.question}</h5>
        <div className={`arrow-right-icon ml-4 ${isOpen && '-rotate-90 transform'}`}></div>
      </div>
      {isOpen && <div>{faq.answer}</div>}
    </div>
  )
}
