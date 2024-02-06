import Link from 'next/link'

const WhatIs = () => {
  return (
    <div className='side-padding mt-32 flex flex-col items-center'>
      <h2 className='mb-10 text-center uppercase'>What is PairDrop?</h2>

      <div className='card card-blue-dots p-8 md:p-[46px]'>
        <h4 className='mb-1'>FUNDING REIMAGINED</h4>
        <p className='mb-8 md:mb-12'>
          PairDrop by DAO Drops is a community-driven fund allocation tool using a game-like interface for easy
          governance. It employs machine learning to translate votes into budget distributions, prioritizing top
          projects. The new Voter Scoring Algorithm enhances decision-making by weighting votes based on active
          engagement in the Ethereum ecosystem.
        </p>
        <Link href='/about' className='button mx-auto'>
          Learn More
        </Link>
      </div>
    </div>
  )
}

export default WhatIs
