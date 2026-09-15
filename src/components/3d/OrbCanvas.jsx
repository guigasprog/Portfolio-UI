import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import CodeOrb from './CodeOrb'

// Isolado num arquivo próprio pra ser carregado sob demanda: three.js +
// @react-three/* são a maior parte do peso do bundle, e o texto do hero não
// depende deles pra renderizar.
export default function OrbCanvas() {
  return (
    <Canvas camera={{ position: [0, 0, 20], fov: 45 }}>
      <Suspense fallback={null}>
        <CodeOrb />
      </Suspense>
    </Canvas>
  )
}
