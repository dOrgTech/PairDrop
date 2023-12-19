import React, { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Torus } from '@react-three/drei'

const AnimatedCircle = ({ radius, amplitude, frequency, phaseOffset }) => {
  const ref = useRef(null)
  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.position.y = amplitude * Math.sin(frequency * clock.getElapsedTime() + phaseOffset)
    }
  })

  return (
    <Torus rotation={[Math.PI / 2.3, 0, 0]} args={[radius, 0.006, 8, 100]} ref={ref}>
      <meshStandardMaterial roughness={0.9} transparent opacity={0.4} />
    </Torus>
  )
}

const Ripples = () => {
  const numCircles = 40
  const spacing = 0.25
  const maxAmplitude = 0.1
  const minAmplitude = 0.02
  const frequency = 3

  const circles = useMemo(() => {
    return Array.from({ length: numCircles }, (_, i) => {
      const distanceFromMid = Math.sqrt(i) + i
      const amplitude = (maxAmplitude - minAmplitude) * (1 - distanceFromMid / numCircles) + minAmplitude
      const phaseOffset = (distanceFromMid * Math.PI) / 5
      const radius = (i + 1) * spacing
      return { radius, amplitude, frequency, phaseOffset }
    })
  }, [numCircles, spacing, maxAmplitude, minAmplitude, frequency])

  return (
    <group position-y={-2} opacity={0.5}>
      {circles.map((props, index) => (
        <AnimatedCircle key={index} {...props} />
      ))}
    </group>
  )
}

export default Ripples
