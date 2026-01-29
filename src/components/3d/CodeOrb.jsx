import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Text, Billboard } from '@react-three/drei'
import * as THREE from 'three'

export default function CodeOrb({ speed }) {
  const meshRef = useRef()
  const rotationY = useRef(0)
  
  const COUNT = 150
  const RADIUS = 7
  const CODE_SNIPPETS = ["{ }", "</>", "=>", "static", "void", "async", "React", "Node", "SQL", "useEffect", "Angular", "Java", "Native", "Dataflex", "PHP", "Adianti", "Spring-boot"]

  const particles = useMemo(() => {
    const temp = []
    for (let i = 0; i < COUNT; i++) {
      const phi = Math.acos(-1 + (2 * i) / COUNT)
      const theta = Math.sqrt(COUNT * Math.PI) * phi
      
      const x = RADIUS * Math.cos(theta) * Math.sin(phi)
      const y = RADIUS * Math.sin(theta) * Math.sin(phi)
      const z = RADIUS * Math.cos(phi)
      
      temp.push({
        pos: [x, y, z],
        text: CODE_SNIPPETS[i % CODE_SNIPPETS.length],
        fontSize: 0.22, // Um pouco maior para preencher melhor
        opacity: 0.2 + Math.random() * 0.4
      })
    }
    return temp
  }, [])

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.1 * delta
      meshRef.current.rotation.x += 0.05 * delta
    }
  })

  return (
    <group ref={meshRef}>
      {particles.map((p, i) => (
        /* O Billboard faz com que o que estiver dentro dele sempre aponte para a câmera */
        <Billboard
          key={i}
          follow={true}
          lockX={false}
          lockY={false}
          lockZ={false}
          position={p.pos}
        >
          <Text
            fontSize={p.fontSize}
            color="#ffffff"
            fillOpacity={p.opacity}
            anchorX="center"
            anchorY="middle"
          >
            {p.text}
          </Text>
        </Billboard>
      ))}
    </group>
  )
}