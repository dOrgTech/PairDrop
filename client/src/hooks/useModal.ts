import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'

// useModal hook to show/hide scrollbar based on modal open state
export const useModal = (): [boolean, React.Dispatch<React.SetStateAction<boolean>>] => {
  const [isModalOpen, setModalOpen] = useState<boolean>(false)
  const pathname = usePathname()

  useEffect(() => {
    const executeAfterMount = () => {
      const html = document.documentElement
      const body = document.body

      if (isModalOpen) {
        html.classList.add('hide-scrollbar')
        body.classList.add('hide-scrollbar')
      } else {
        html.classList.remove('hide-scrollbar')
        body.classList.remove('hide-scrollbar')
      }

      return () => {
        html.classList.remove('hide-scrollbar')
        body.classList.remove('hide-scrollbar')
      }
    }

    const timer = setTimeout(executeAfterMount, 0)

    return () => clearTimeout(timer)
  }, [isModalOpen, pathname])

  return [isModalOpen, setModalOpen]
}
