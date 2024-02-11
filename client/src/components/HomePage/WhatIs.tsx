import Link from 'next/link'
import { whatIs } from '@/config'

// WhatIs Component
const WhatIs = () => {
  return (
    <div className='side-padding mt-32 flex flex-col items-center'>
      <h2 className='mb-10 text-center uppercase'>{whatIs.title}</h2>

      <div className='card card-blue-dots p-8 md:p-[46px]'>
        <h4 className='mb-1'>{whatIs.subtitle}</h4>
        <p className='mb-8 md:mb-12'>{whatIs.description}</p>
        <Link href={whatIs.learnMoreLink} className='button mx-auto'>
          {whatIs.learnMoreText}
        </Link>
      </div>
    </div>
  )
}

export default WhatIs
