import { useRef } from 'react'
import { RGBELoader } from 'three-stdlib'
import { useFrame, useLoader } from '@react-three/fiber'
import { CubeCamera, Float, useMatcapTexture, useTexture } from '@react-three/drei'
import { Displace, Fresnel, Gradient, LayerMaterial, Matcap, Noise } from 'lamina'
import { useControls } from 'leva'
import { MathUtils } from 'three'
import { indigo, aquamarine, yellow, magenta } from './index'

export default function Blob({ ...props }) {
  const strength = useRef(0.5)
  const speed = useRef(1.2)
  const isHovering = useRef(false)
  const displaceRef = useRef(null)
  const blobRef = useRef()
  const cubeRef = useRef()

  const matcap = useMatcapTexture(2)
  const displace = useTexture('./assets/textures/disp_texture.webp')
  const texture = useLoader(RGBELoader, './assets/hdri/art_studio_1k.hdr')

  const {
    transmission,
    bumpScale,
    sheenColor,
    sheen,
    clearcoat,
    clearcoatRoughness,
    metalness,
    roughness,
    envMapIntensity,
  } = useControls({
    transmission: { min: 0, max: 1, value: 0.15 }, //0.67
    bumpScale: { min: 0, max: 0.01, value: 0.005 },
    sheenColor: { value: indigo[600] },
    sheen: { min: 0, max: 10, value: 4.5 },
    clearcoat: { min: 0, max: 1, value: 0.5 },
    clearcoatRoughness: { min: 0, max: 1, value: 0.9 },
    metalness: { min: 0, max: 1, value: 0.7 },
    roughness: { min: 0, max: 3, value: 1.15 },
    envMapIntensity: { min: 0, max: 5, value: 2.8 }, //3.9
  })

  const handlePointerEnter = () => {
    isHovering.current = true
    strength.current = 0.7
    speed.current = 1.6
  }

  const handlePointerLeave = () => {
    isHovering.current = false
    strength.current = 0.5
    speed.current = 1.2
  }

  useFrame((state, dt) => {
    displaceRef.current.strength = MathUtils.lerp(displaceRef.current.strength, strength.current, 0.05)
    displaceRef.current.offset.x += speed.current * dt
    displaceRef.current.offset.y += (speed.current / 4) * dt
    displaceRef.current.offset.z += (speed.current / 4) * dt
    if (cubeRef.current) {
      cubeRef.current.rotation.y += (speed.current / 8) * -dt
    }
  })

  return (
    <group ref={cubeRef}>
      <CubeCamera resolution={128} frames={1} envMap={texture}>
        {(texture) => (
          <Float position-y={0.75} floatingRange={[-0.08, 0.08]} speed={12.41830199164322423} rotationIntensity={0}>
            <mesh {...props} ref={blobRef} onPointerEnter={handlePointerEnter} onPointerOut={handlePointerLeave}>
              <sphereGeometry args={[2, 256, 256]} />
              <LayerMaterial
                lighting='physical'
                transmission={transmission}
                bumpMap={displace}
                bumpScale={bumpScale}
                sheenColor={sheenColor}
                sheen={sheen}
                clearcoat={clearcoat}
                clearcoatRoughness={clearcoatRoughness}
                metalness={metalness}
                roughness={roughness}
                roughnessMap={displace}
                envMap={texture}
                envMapIntensity={envMapIntensity}
              >
                <Gradient colorA={aquamarine[400]} colorB={sheenColor} start={0} end={1} mode='hardlight' alpha={0.9} />
                <Displace ref={displaceRef} strength={strength.current} scale={0.5} />
                <Fresnel color={magenta[400]} mode={'softlight'} bias={Math.random() + 0.5 * 2} alpha={0.9} />
                <Noise
                  scale={Math.random() * 0.5 + 0.4}
                  colorA={aquamarine[300]}
                  colorB={magenta[500]}
                  colorC={aquamarine[400]}
                  colorD={sheenColor}
                  alpha={0.8}
                />
                <Matcap map={matcap} alpha={0.4} />
              </LayerMaterial>
            </mesh>
          </Float>
        )}
      </CubeCamera>
    </group>
  )
}
