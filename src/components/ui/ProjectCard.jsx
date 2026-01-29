import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ImageOff } from 'lucide-react'

export default function ProjectCard({ project, index, onSelect }) {
  const containerRef = useRef(null)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"] 
  })

  // 1. Posição Horizontal: de -200vw para 200vw (Rápido e limpo)
  const x = useTransform(scrollYProgress, [0, 0.5, 1], ["-200vw", "0vw", "200vw"])
  
  // 2. Rotação 3D: Inclinação agressiva nas pontas
  const rotateY = useTransform(scrollYProgress, [0, 0.5, 1], [45, 0, -45])
  
  // 3. Escala: 0.25 nas pontas para 0.9 no centro (Efeito de ladinho)
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.1, 0.7, 0.1])
  
  // 4. Profundidade: Traz para a frente no centro
  const z = useTransform(scrollYProgress, [0, 0.5, 1], [-600, 200, -600])
  
  // 5. Opacidade: Aparece e some rápido para não poluir
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.5, 0.8, 1], [0, 1, 1, 1, 0])

  return (
    <div ref={containerRef} className="h-[200vh] relative w-full">
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden" style={{ perspective: "1500px" }}>
        <motion.div 
          style={{ 
            x, 
            rotateY, 
            z, 
            scale, 
            opacity, 
            transformStyle: "preserve-3d" 
          }}
          className="relative group"
          onClick={() => onSelect && onSelect(project)} // <--- Proteção para não quebrar se onSelect não for passado
          layoutId={`card-container-${index}`}
        >
          {/* O Card Quadrado Grayscale -> Color */}
          <div className="relative w-[330px] h-[280px] md:w-[650px] md:h-[360px] overflow-hidden bg-neutral-900 border border-white/10 shadow-2xl">
          {project.image ? (
              <motion.img 
                layoutId={`card-image-${index}`}
                src={project.image} 
                alt={project.title}
                className="w-full h-full object-cover grayscale-0 md:grayscale transition-all duration-700 md:group-hover:grayscale-0"
              />
            ) : (
              <motion.div 
                 layoutId={`card-image-${index}`}
                 className="flex flex-col items-center justify-center text-white/50 gap-4 w-full h-full bg-neutral-800"
              >
                 <ImageOff className="w-12 h-12" />
                 <span className="font-mono text-xs uppercase tracking-widest text-center px-4">
                   {project.title}
                 </span>
              </motion.div>
            )}
            
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent p-10 flex flex-col justify-end">
              <h2 className="text-4xl font-black text-white uppercase tracking-tighter italic">
                {project.title}
              </h2>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}