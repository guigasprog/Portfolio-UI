import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ImageOff } from 'lucide-react'

export default function ProjectCard({ project, index, onSelect }) {
  const containerRef = useRef(null)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"] 
  })

  // Ajustei levemente a escala máxima de 0.7 para 0.85 para não ficar tão "baixinho"
  const x = useTransform(scrollYProgress, [0, 0.5, 1], ["-200vw", "0vw", "200vw"])
  const rotateY = useTransform(scrollYProgress, [0, 0.5, 1], [45, 0, -45])
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.5, 0.85, 0.5]) // <--- Ajustado
  const z = useTransform(scrollYProgress, [0, 0.5, 1], [-600, 0, -600]) // <--- Z em 0 no centro foca melhor
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.5, 0.8, 1], [0, 1, 1, 1, 0])

  return (
    <div ref={containerRef} className="h-[200vh] relative w-full mb-[-50vh] md:mb-[-100vh]">
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
          className="relative group cursor-pointer"
          onClick={() => onSelect && onSelect(project)}
          // REMOVIDO: layoutId={`card-container-${index}`}
          // Motivo: O container tem rotação 3D. Tentar fazer morph nele causa distorção visual.
          // Removemos aqui para que o fundo do modal apenas faça um Fade-in limpo.
        >
          
          <div className="relative w-[330px] h-[280px] md:w-[650px] md:h-[360px] overflow-hidden bg-neutral-900 border border-white/10 shadow-2xl flex items-center justify-center">
            
            {project.image ? (
              <motion.img 
                // MANTIDO: O layoutId na imagem fica lindo e não buga com a rotação
                layoutId={`card-image-${index}`}
                src={project.image} 
                alt={project.title}
                className="w-full h-full object-cover grayscale-0 md:grayscale transition-all duration-700 md:group-hover:grayscale-0"
              />
            ) : (
              <motion.div 
                 // MANTIDO: Placeholder também faz morph
                 layoutId={`card-image-${index}`}
                 className="flex flex-col items-center justify-center text-white/50 gap-4 w-full h-full bg-neutral-800"
              >
                 <ImageOff className="w-12 h-12" />
                 <span className="font-mono text-xs uppercase tracking-widest text-center px-4">
                   {project.title}
                 </span>
              </motion.div>
            )}
            
            {/* O Texto não precisa de layoutId, ele pode só aparecer no modal */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent p-10 flex flex-col justify-end">
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