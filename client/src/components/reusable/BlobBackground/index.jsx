import Config from '../../../../tailwind.config.ts'
import { Canvas } from '@react-three/fiber'
import { Environment, OrbitControls } from '@react-three/drei'
import { LayerMaterial, Color, Noise, Gradient } from 'lamina'
import { EffectComposer, DepthOfField, Noise as PostNoise } from '@react-three/postprocessing'
import { BlendFunction } from 'postprocessing'
import { Leva } from 'leva'
import Blob from './Blob'
import Ripples from './Ripples'
import * as THREE from 'three'
import { useEffect, useState } from 'react'

export const { indigo, aquamarine, yellow, magenta } = Config.theme.extend.colors

export default function BlobBackground() {
  const [loaded, setLoaded] = useState(false)
  const [canvasOpacity, setCanvasOpacity] = useState(0)

  useEffect(() => {
    setTimeout(() => {
      setCanvasOpacity(1)
    }, 2500)
    if (!loaded) {
      setLoaded(true)
    }
  }, [loaded])

  return (
    <>
      <div className='bg absolute bottom-0 left-0 right-0 top-0 min-h-heroHeight'>
        <Canvas className='transition-opacity duration-[2000ms] ease-in-out' style={{ opacity: canvasOpacity }}>
          <ambientLight />
          <Environment background resolution={64}>
            <mesh scale={100}>
              <sphereGeometry args={[1, 64, 64]} />
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
          <Ripples />
          <Blob />
          <OrbitControls target={[0, 0.4, 0]} enableRotate={false} enablePan={false} enableZoom={false} />
          <EffectComposer>
            <DepthOfField />
            <PostNoise opacity={0.2} blendFunction={BlendFunction.OVERLAY} />
          </EffectComposer>
        </Canvas>
        <Leva hidden />
      </div>
    </>
  )
}
