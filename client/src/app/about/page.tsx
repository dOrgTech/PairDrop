import Heading from '@/components/reusable/Heading'
import FAQ from './FAQ'
import { aboutPage } from '@/config'

import { Metadata } from 'next'

export const metadata: Metadata = {
  title: aboutPage.pageTitle,
}

// About Page
export default function About() {
  return (
    <main className='pb-32'>
      <Heading />

      <div className='side-padding mt-32 flex flex-col items-center'>
        <h2 className='mb-10 text-center uppercase'>{aboutPage.firstTitle}</h2>
        <p className='card card-blue-dots white p-8 md:p-[46px]'>{aboutPage.firstContent}</p>
      </div>

      <div className='side-padding mt-32 flex flex-col items-center'>
        <h2 className='mb-10 text-center'>{aboutPage.secondTitle}</h2>
        <p className='card card-blue-dots p-8 md:p-[46px]'>{aboutPage.secondContent}</p>
      </div>

      <FAQ />
    </main>
  )
}
