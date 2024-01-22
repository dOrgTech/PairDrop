import { useState, useEffect } from 'react'

export const useModal = (): [boolean, React.Dispatch<React.SetStateAction<boolean>>] => {
  const [isModalOpen, setModalOpen] = useState<boolean>(false)

  useEffect(() => {
    const html = document.documentElement
    const body = document.body

    html.classList.add('hide-scrollbar')
    body.classList.add('hide-scrollbar')

    const updateScroll = () => {
      if (isModalOpen) {
        html.classList.add('hide-scrollbar')
        body.classList.add('hide-scrollbar')
      } else {
        html.classList.remove('hide-scrollbar')
        body.classList.remove('hide-scrollbar')
      }
    }

    updateScroll()

    return () => {
      html.classList.remove('hide-scrollbar')
      body.classList.remove('hide-scrollbar')
    }
  }, [isModalOpen])

  return [isModalOpen, setModalOpen]
}
