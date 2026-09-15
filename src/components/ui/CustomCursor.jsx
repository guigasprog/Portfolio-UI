import { useEffect } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

// Precisa bater com o tamanho de .cursor-inverted no index.css — o offset
// de metade do tamanho é o que centraliza o círculo no ponteiro.
const SIZE = 32

export default function CustomCursor() {
  const x = useMotionValue(-SIZE)
  const y = useMotionValue(-SIZE)
  const springX = useSpring(x, { stiffness: 700, damping: 45, mass: 0.35 })
  const springY = useSpring(y, { stiffness: 700, damping: 45, mass: 0.35 })

  useEffect(() => {
    const handleMove = (e) => {
      x.set(e.clientX - SIZE / 2)
      y.set(e.clientY - SIZE / 2)
    }
    window.addEventListener('mousemove', handleMove, { passive: true })
    return () => window.removeEventListener('mousemove', handleMove)
  }, [x, y])

  return <motion.div className="cursor-inverted" style={{ x: springX, y: springY }} />
}
