import Heading from '@/components/reusable/Heading'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'PairDrop - Page Not Found',
}

export default function PageNotFound() {
  return (
    <main>
      <Heading PageNotFound={true} />
    </main>
  )
}
