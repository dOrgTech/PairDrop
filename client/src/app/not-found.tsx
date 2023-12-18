import Heading from '@/components/reusable/Heading'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Pair2Pair - Page Not Found',
}

export default function PageNotFound() {
  return (
    <main>
      <Heading PageNotFound={true} />
    </main>
  )
}
