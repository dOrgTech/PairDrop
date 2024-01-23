import Config from '../../../../tailwind.config.ts'
import { useThree } from '@react-three/fiber'
import { Environment, OrbitControls } from '@react-three/drei'
import { LayerMaterial, Color, Noise, Gradient } from 'lamina'
import { EffectComposer, DepthOfField, Noise as PostNoise } from '@react-three/postprocessing'
import { BlendFunction } from 'postprocessing'
import Blob from './Blob'
import Ripples from './Ripples'
import * as THREE from 'three'
import { useEffect, useState } from 'react'
// import { Perf } from 'r3f-perf'

export const { indigo, aquamarine, yellow, magenta } = Config.theme.extend.colors

export default function Scene({ showAnimation, setShowAnimation }) {
  const { gl } = useThree()
  const [performanceLevel, setPerformanceLevel] = useState('high')

  useEffect(() => {
    const assessPerformance = () => {
      const fps = (gl.info.render.frame * 1000) / gl.info.render.time
      if (fps < 50) {
        setPerformanceLevel('low')
      } else {
        setPerformanceLevel('high')
      }
    }

    const interval = setInterval(assessPerformance, 5000)
    return () => clearInterval(interval)
  }, [gl.info.render.frame, gl.info.render.time])

  if (performanceLevel === 'low') {
    setShowAnimation(false)
  }

  const isHighPerformance = performanceLevel === 'high' && showAnimation

  return (
    <>
      <ambientLight />
      <Environment background resolution={32} frames={1}>
        <mesh scale={100}>
          <sphereGeometry args={[1, 16, 16]} />
          <LayerMaterial side={THREE.BackSide}>
            <Color color={indigo[600]} alpha={1} mode='normal' />
            <Noise
              scale={0.8}
              colorA={magenta[500]}
              colorB={magenta[500]}
              colorC={aquamarine[400]}
              colorD='#fff'
              alpha={0.9}
            />
            <Gradient colorA={aquamarine[400]} colorB={indigo[600]} start={0} end={1} mode='softlight' />
          </LayerMaterial>
        </mesh>
      </Environment>
      <Ripples isHighPerformance={isHighPerformance} />
      <Blob isHighPerformance={isHighPerformance} />
      <OrbitControls target={[0, 0.4, 0]} enableRotate={false} enablePan={false} enableZoom={false} />
      <EffectComposer multisampling={isHighPerformance}>
        <PostNoise opacity={0.2} blendFunction={BlendFunction.OVERLAY} />
      </EffectComposer>
      {/* <Perf /> */}
    </>
  )
}
