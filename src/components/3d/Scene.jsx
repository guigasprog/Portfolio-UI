import { Canvas } from '@react-three/fiber'
import { OrbitControls, Stars } from '@react-three/drei'
import { Suspense } from 'react'
import CodeOrb from './CodeOrb'

export default function Scene() {
  return (
    <div className="fixed inset-0 z-0">
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        <color attach="background" args={['#0a0a0a']} />
        <ambientLight intensity={0.5} />
        
        <Suspense fallback={null}>
          <CodeOrb />
          <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        </Suspense>

        {/* OrbitControls apenas para debug inicial, depois tiramos para o Scroll controlar */}
        <OrbitControls enableZoom={false} />
      </Canvas>
    </div>
  )
}