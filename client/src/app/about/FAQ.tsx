'use client'
import React, { useState } from 'react'

interface IFaq {
  question: string
  answer: string | JSX.Element
}

const faqs: IFaq[] = [
  {
    question: 'Is this a real round?',
    answer:
      'No, this is a demo site so you can see what a round looks like. PairDrop is a forkable primitive for public goods funding - copy the codebase to run your own community grants round! PairDrop uses pair-to-pair comparisons to help voters evaluate the most deserving projects. This helps minimize the “popularity voting” dynamic common in retroactive funding rounds.',
  },
  {
    question: 'How can I run a round?',
    answer: (
      <>
        Go to{' '}
        <a
          href='https://github.com/dOrgTech/PairDrop'
          target='_blank'
          rel='noopener noreferrer'
          className='font-medium underline'
          onClick={(e) => e.stopPropagation()}
        >
          https://github.com/dOrgTech/PairDrop
        </a>{' '}
        You’ll find everything you need there to fork the codebase and run your own round. From there, you just need to
        choose what the focus or scope of your round will be, and prepare how you will handle nominations and
        communications for the round. You’ll find general guidance for running rounds here - Gitcoin’s modules for
        EasyRetroPGF - the PairDrop team co-created that training.
      </>
    ),
  },
  {
    question: 'How does PairDrop work?',
    answer:
      'Once you’ve loaded in the nominated projects and voters’ points, voters who have points can log in to the app and check if they have points. When they do, they will see a step-by-step guide for how to vote. To vote, they will review 5 pairs of projects, comparing them side-by-side and selecting the one they believe is most deserving of funding. Under the hood, a machine learning algorithm calculates the highest ranking projects and gives them a number. Your funding pool can then be distributed proportionally to each project.',
  },
  {
    question: 'How does the voting algorithm work?',
    answer:
      'Thousands of addresses have been assigned voting power based on on-chain activity (maximum 100 points per address per category).',
  },
  {
    question: 'How does the scoring algorithm work?',
    answer:
      'Each voter has a set number of points proportional to their qualifying on-chain activity. Their points are distributed evenly to each project they select from their pairs. For example, if an address has a total of 100 points, each project they select will receive 20 points. If an address has a total of 10 points, each project they select will receive 2 points.',
  },
  {
    question: 'What happens if a user logs in and they don’t have points?',
    answer:
      'A cute message will pop up for them to try again the next round. It’s important to let voters know they should check multiple addresses to see if they have points. Only addresses that participated in activities included in the PairDrop data sources will have points. You are free to generate your own custom set of addresses.',
  },
  {
    question: 'Who is behind this?',
    answer: (
      <>
        PairDrop is part of DAO Drops. The aim of DAO Drops is to Drop open source tools for decentralized communities.
        DAO Drops is the public goods arm of dOrg, a web3 development services provider operating as a DAO since 2019.{' '}
        <a
          href='https://www.dorg.tech'
          target='_blank'
          rel='noopener noreferrer'
          className='font-medium underline'
          onClick={(e) => e.stopPropagation()}
        >
          https://www.dorg.tech
        </a>
      </>
    ),
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
        <div className={`arrow-right-icon ml-4 ${isOpen && '-rotate-90 transform'}`}></div>
      </div>
      {isOpen && <div>{faq.answer}</div>}
    </div>
  )
}
