import Config from '../../../../tailwind.config.ts'
import { Canvas } from '@react-three/fiber'
import { Leva } from 'leva'
import { useEffect, useState } from 'react'
import Scene from './Scene'
import { useProgress } from '@react-three/drei'

export const { indigo, aquamarine, yellow, magenta } = Config.theme.extend.colors

export default function BlobBackground() {
  const [isPerformanceOk, setIsPerformanceOk] = useState(true)
  const { active, loaded, total } = useProgress()
  const [canvasOpacity, setCanvasOpacity] = useState(0)
  const startTime = Date.now()

  useEffect(() => {
    if (!active && loaded === total) {
      const loadDuration = Date.now() - startTime
      console.log(loadDuration)
      if (loadDuration > 50) {
        setIsPerformanceOk(false)
      } else {
        setTimeout(() => {
          setCanvasOpacity(1)
        }, 2000)
      }
    }
  }, [active, loaded, total, startTime])

  if (!isPerformanceOk) {
    return null
  }

  return (
    <>
      <div
        className='absolute bottom-0 left-0 right-0 top-0 min-h-heroHeight transition-opacity duration-1000 ease-in-out'
        style={{ opacity: canvasOpacity }}
      >
        <Canvas>
          <Scene />
        </Canvas>
        <Leva hidden />
        {/* <div className='absolute bottom-2 right-2 rounded-3xl text-xs font-medium'>
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
        </div> */}
      </div>
    </>
  )
}
