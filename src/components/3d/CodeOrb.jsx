import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Text, Billboard } from '@react-three/drei'

// Constantes de módulo, e não do componente: declaradas dentro, o array de
// palavras era recriado a cada render e o useMemo que depende dele passava a
// pedir uma dependência que muda sempre — que é o mesmo que não memoizar nada.
const COUNT = 150
const RADIUS = 7
const CODE_SNIPPETS = [
  '{ }',
  '</>',
  '=>',
  'static',
  'void',
  'async',
  'React',
  'Node',
  'SQL',
  'useEffect',
  'Angular',
  'Java',
  'Native',
  'Dataflex',
  'PHP',
  'Adianti',
  'Spring-boot',
]

/**
 * Ruído determinístico no lugar de Math.random().
 *
 * Sortear durante o render é função impura: o React pode renderizar duas vezes
 * (StrictMode faz isso em desenvolvimento) e cada passada sortearia opacidades
 * diferentes. Um gerador semeado pelo índice dá sempre o mesmo valor para a
 * mesma partícula, e a esfera fica idêntica em toda montagem.
 */
function ruido(i) {
  const x = Math.sin(i * 12.9898) * 43758.5453
  return x - Math.floor(x)
}

export default function CodeOrb() {
  const meshRef = useRef()

  const particles = useMemo(() => {
    const temp = []
    for (let i = 0; i < COUNT; i++) {
      // Espiral de Fibonacci: distribui os pontos pela esfera sem aglomerar
      // nos polos, que é o que acontece sorteando latitude e longitude.
      const phi = Math.acos(-1 + (2 * i) / COUNT)
      const theta = Math.sqrt(COUNT * Math.PI) * phi

      temp.push({
        pos: [
          RADIUS * Math.cos(theta) * Math.sin(phi),
          RADIUS * Math.sin(theta) * Math.sin(phi),
          RADIUS * Math.cos(phi),
        ],
        text: CODE_SNIPPETS[i % CODE_SNIPPETS.length],
        fontSize: 0.22,
        opacity: 0.2 + ruido(i) * 0.4,
      })
    }
    return temp
  }, [])

  useFrame((state, delta) => {
    if (!meshRef.current) return
    meshRef.current.rotation.y += 0.1 * delta
    meshRef.current.rotation.x += 0.05 * delta
  })

  return (
    <group ref={meshRef}>
      {particles.map((p, i) => (
        /* O Billboard mantém o texto sempre virado para a câmera. */
        <Billboard key={i} follow position={p.pos}>
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
