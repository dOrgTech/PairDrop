import Config from '../../../../tailwind.config.ts'
import { useThree } from '@react-three/fiber'
import { Environment, OrbitControls, Preload } from '@react-three/drei'
import { LayerMaterial, Color, Noise, Gradient } from 'lamina'
import { EffectComposer, DepthOfField, Noise as PostNoise } from '@react-three/postprocessing'
import { BlendFunction } from 'postprocessing'
import Blob from './Blob'
import Ripples from './Ripples'
import * as THREE from 'three'
import { useEffect, useState } from 'react'
// import { Perf } from 'r3f-perf'

export const { indigo, aquamarine, yellow, magenta } = Config.theme.extend.colors

export default function Scene() {
  return (
    <>
      <Preload all />
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
      <Ripples />
      <Blob />
      <OrbitControls target={[0, 0.4, 0]} enableRotate={false} enablePan={false} enableZoom={false} />
      <EffectComposer>
        <PostNoise opacity={0.2} blendFunction={BlendFunction.OVERLAY} />
      </EffectComposer>
      {/* <Perf /> */}
    </>
  )
}
