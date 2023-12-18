'use client'
import React, { useState } from 'react'

interface IFaq {
  question: string
  answer: string
}

const faqs: IFaq[] = [
  {
    question: 'Question #1 goes here and it could be pretty long?',
    answer:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip',
  },
  {
    question: 'Question #2 goes here and it could be pretty long?',
    answer:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip',
  },
  {
    question: 'Question #3 goes here and it could be pretty long?',
    answer:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip',
  },
  {
    question: 'Question #4 goes here and it could be pretty long?',
    answer:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip',
  },
  {
    question: 'Question #5 goes here and it could be pretty long?',
    answer:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip',
  },
  {
    question: 'Question #6 goes here and it could be pretty long?',
    answer:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip',
  },
  {
    question: 'Question #7 goes here and it could be pretty long?',
    answer:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip',
  },
  {
    question: 'Question #8 goes here and it could be pretty long?',
    answer:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip',
  },
]

const FAQ: React.FC = () => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null)

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index)
  }

  return (
    <div className='side-padding mt-32 flex flex-col items-center gap-2'>
      <h2 className='mb-8 text-center'>FAQ</h2>
      {faqs.map((faq, index) => (
        <FaqCard key={index} faq={faq} isOpen={openFaqIndex === index} onToggle={() => toggleFaq(index)} />
      ))}
    </div>
  )
}

export default FAQ

const FaqCard: React.FC<{ faq: IFaq; isOpen: boolean; onToggle: () => void }> = ({ faq, isOpen, onToggle }) => {
  return (
    <div className='card flex cursor-pointer flex-col gap-4 border-[3px]' onClick={onToggle}>
      <div className='flex w-full items-center justify-between'>
        <h5>{faq.question}</h5>
        <div className={`arrow-right-icon ${isOpen && '-rotate-90 transform'}`}></div>
      </div>
      {isOpen && <div>{faq.answer}</div>}
    </div>
  )
}
