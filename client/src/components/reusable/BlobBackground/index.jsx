import Config from '../../../../tailwind.config.ts'
import { Canvas } from '@react-three/fiber'
import { Environment, Loader } from '@react-three/drei'
import { LayerMaterial, Color, Noise, Gradient } from 'lamina'
import { EffectComposer, DepthOfField, Noise as PostNoise } from '@react-three/postprocessing'
import { BlendFunction } from 'postprocessing'
import Blob from './Blob'
import Ripples from './Ripples'
import * as THREE from 'three'

export const { indigo, aquamarine, yellow, magenta } = Config.theme.extend.colors

export default function BlobBackground() {
  // const devicePixelRatio = useRef(window.devicePixelRatio)

  // useEffect(() => {
  //   devicePixelRatio.current = window.devicePixelRatio
  // })

  return (
    <>
      <div className='bg fixed bottom-0 left-0 right-0 top-0 -mt-[82px] h-screen'>
        <Canvas>
          <ambientLight intensity={Math.PI / 2} />
          <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />
          <spotLight
            position={[10, 10, 10]}
            angle={0.15}
            penumbra={1}
            decay={0}
            intensity={Math.PI * 8}
            color={magenta[500]}
          />
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
          <EffectComposer>
            <DepthOfField />
            <PostNoise opacity={0.3} blendFunction={BlendFunction.OVERLAY} />
          </EffectComposer>
        </Canvas>
      </div>
    </>
  )
}
