import Config from '../../../../tailwind.config.ts'
import { Canvas } from '@react-three/fiber'
import { Leva } from 'leva'
import { useEffect, useState } from 'react'
import Scene from './Scene'

export const { indigo, aquamarine, yellow, magenta } = Config.theme.extend.colors

export default function BlobBackground() {
  const [loaded, setLoaded] = useState(false)
  const [canvasOpacity, setCanvasOpacity] = useState(0)
  const [showAnimation, setShowAnimation] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setCanvasOpacity(1)
    }, 2500)
    if (!loaded) {
      setLoaded(true)
    }
  }, [loaded])

  const handleAnimationToggle = () => {
    setShowAnimation(!showAnimation)
  }

  return (
    <>
      <div className='bg absolute bottom-0 left-0 right-0 top-0 min-h-heroHeight'>
        <Canvas className='transition-opacity duration-[2000ms] ease-in-out' style={{ opacity: canvasOpacity }}>
          <Scene showAnimation={showAnimation} setShowAnimation={setShowAnimation} />
        </Canvas>
        <Leva hidden />
        <div className='absolute bottom-2 right-2 rounded-3xl text-xs font-medium'>
          <label className='inline-flex cursor-pointer items-center space-x-2' onClick={handleAnimationToggle}>
            <span className='ms-3 translate-y-px transform text-sm font-medium leading-none text-white'>Animation</span>
            <div
              className={`
              relative h-5 w-9 rounded-full bg-gray-200
              after:absolute after:start-[2px] after:top-[2px] after:h-4 after:w-4
              after:rounded-full after:border after:border-gray-300 after:bg-white
              after:transition-all after:duration-200 after:ease-in-out after:content-['']
              ${showAnimation && 'bg-indigo-600 after:translate-x-full after:border-white'}
              `}
            ></div>
          </label>
        </div>
      </div>
    </>
  )
}
