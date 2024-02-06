import Config from '../../../../tailwind.config.ts'
import { Canvas } from '@react-three/fiber'
import { Leva } from 'leva'
import { useEffect, useState } from 'react'
import Scene from './Scene'
import { useProgress } from '@react-three/drei'
import usePersistentState from '@/hooks/usePersistentState'

export const { indigo, aquamarine, yellow, magenta } = Config.theme.extend.colors

export default function BlobBackground() {
  const [isPerformanceOk, setIsPerformanceOk] = useState(true)
  const { active, loaded, total } = useProgress()
  const [canvasOpacity, setCanvasOpacity] = useState(0)
  const [showAnimation, setShowAnimation] = usePersistentState('showAnimation', true)
  const [isMounted, setIsMounted] = useState(false)
  const CanvasOpacityDelay = 2000
  const startTime = Date.now()

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    if (!active && loaded === total && showAnimation) {
      const loadDuration = Date.now() - startTime
      // console.log(loadDuration)
      if (loadDuration > 50) {
        setIsPerformanceOk(false)
      } else {
        setTimeout(() => {
          setCanvasOpacity(1)
        }, CanvasOpacityDelay)
      }
    }
  }, [active, loaded, total, startTime])

  useEffect(() => {
    if (showAnimation) {
      setCanvasOpacity(0)
      setTimeout(() => setCanvasOpacity(1), CanvasOpacityDelay)
    }
  }, [showAnimation])

  const handleAnimationToggle = () => {
    setShowAnimation(!showAnimation)
  }

  if (!isPerformanceOk || !isMounted) {
    return null
  }

  return (
    <>
      {showAnimation && (
        <div
          className='absolute bottom-0 left-0 right-0 top-0 min-h-heroHeight transition-opacity duration-1000 ease-in-out'
          style={{ opacity: canvasOpacity }}
        >
          <Canvas>
            <Scene />
          </Canvas>
          <Leva hidden />
        </div>
      )}
      <div className='absolute bottom-2 right-2 rounded-3xl text-xs font-medium'>
        <label className='inline-flex cursor-pointer items-center space-x-2' onClick={handleAnimationToggle}>
          <span className='ms-3 translate-y-px transform text-sm font-medium leading-none text-white'>Animation</span>
          <div className={`toggle ${showAnimation && 'toggle-active'}`} />
        </label>
      </div>
    </>
  )
}
