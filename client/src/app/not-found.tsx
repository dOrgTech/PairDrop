import Heading from '@/components/reusable/Heading'
import { notFoundPage } from '@/config'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: notFoundPage.pageTitle,
}

// Page Not Found
export default function PageNotFound() {
  return (
    <main>
      <Heading PageNotFound={true} />
    </main>
  )
}
