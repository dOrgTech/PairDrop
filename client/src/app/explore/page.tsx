'use client'
import { useState } from 'react'
import Image from 'next/image'
import projectsData from '@/data/projects.json'

interface CardProps {
  title: string
  description: string
  categories: string[]
  projectIcon: string
}

const Explore = () => {
  const [searchQuery, setSearchQuery] = useState('')

  const filteredProjects = projectsData.filter(
    (project) =>
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.categories.some((category) => category.toLowerCase().includes(searchQuery.toLowerCase())),
  )

  return (
    <main className='bg min-h-header side-padding pb-32 pt-[100px]'>
      <div className='mx-auto flex max-w-[1025px] flex-col items-center'>
        <h2 className='mb-10 text-[44px] tracking-wide'>EXPLORE</h2>
        <input
          type='search'
          placeholder='Search projects...'
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className='search-input'
        />
        <div className='flex flex-wrap gap-x-10 gap-y-16'>
          {filteredProjects.length > 0 ? (
            filteredProjects.map((card, index) => <Card key={index} {...card} />)
          ) : (
            <h5>No Results Found</h5>
          )}
        </div>
      </div>
    </main>
  )
}

export default Explore

const Card = ({ title, description, categories, projectIcon }: CardProps) => {
  return (
    <div className='card relative w-[315px] cursor-pointer p-5 pt-10'>
      <div className='absolute -top-9 flex h-16 w-16 items-center justify-center rounded-full border-[6px] border-indigo-600 bg-white p-2'>
        <Image
          className='max-h-[40px] max-w-[40px] object-contain'
          src={projectIcon}
          alt='Project Icon'
          width={40}
          height={40}
        />
      </div>
      <div className='mb-4 flex flex-col gap-2'>
        <h6>{title}</h6>
        <p className='font-ibm'>{description}</p>
      </div>
      <div className='flex flex-wrap gap-2'>
        {categories.map((category, index) => (
          <div key={index} className='category-tag'>
            {category}
          </div>
        ))}
      </div>
    </div>
  )
}
