import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { ChevronUp, ChevronDown } from 'lucide-react'
import { PROJECTS } from '../../constants/projects'

export default function ScrollNavigation({ heroRef, projectRefs, footerRef }) {
  const { scrollYProgress } = useScroll()
  const [currentIndex, setCurrentIndex] = useState(-1)

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest < 0.05) setCurrentIndex(-1)
    else if (latest > 0.95) setCurrentIndex(99)
    else {
      const step = 0.9 / PROJECTS.length
      const index = Math.floor((latest - 0.05) / step)
      setCurrentIndex(Math.min(index, PROJECTS.length - 1))
    }
  })

  const handleScroll = (ref) => {
    if (ref?.current) {
        ref.current.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'center' // Isso vai alinhar a âncora no centro exato da tela
        })
    }
  }

  return (
    <>
      {/* SETA TOPO - VOLTAR (MAIOR) */}
      <div className="fixed top-8 left-1/2 -translate-x-1/2 z-[100] pointer-events-none">
        <AnimatePresence>
          {currentIndex !== -1 && (
            <motion.button
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              className="group flex flex-col items-center gap-3 pointer-events-auto cursor-pointer"
              onClick={() => {
                if (currentIndex === 0) handleScroll(heroRef)
                else if (currentIndex === 99) handleScroll(projectRefs.current[PROJECTS.length - 1])
                else handleScroll(projectRefs.current[currentIndex - 1])
              }}
            >
              <motion.div 
                animate={{ y: [0, -6, 0] }} 
                transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
                // Aumento de padding (p-3) e tamanho do border
                className="p-3 md:p-4 border border-white/20 bg-black/60 backdrop-blur-xl rounded-full group-hover:bg-white group-hover:border-white transition-all duration-500 shadow-[0_0_20px_rgba(255,255,255,0.1)] group-hover:shadow-[0_0_30px_rgba(255,255,255,0.3)]"
              >
                {/* Ícone maior (w-6 h-6) */}
                <ChevronUp className="w-6 h-6 md:w-8 md:h-8 text-white group-hover:text-black transition-colors" />
              </motion.div>
              <span className="text-[10px] md:text-xs font-mono uppercase tracking-[0.4em] text-white/40 group-hover:text-white group-hover:tracking-[0.6em] transition-all duration-500">
                {currentIndex === 99 ? PROJECTS[PROJECTS.length-1].title : (currentIndex === 0 ? "Início" : PROJECTS[currentIndex-1]?.title)}
              </span>
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* SETA BASE - AVANÇAR (MAIOR) */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] pointer-events-none">
        <AnimatePresence>
          {currentIndex !== 99 && (
            <motion.button
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              className="group flex flex-col items-center gap-3 pointer-events-auto cursor-pointer"
              onClick={() => {
                if (currentIndex === -1) handleScroll(projectRefs.current[0])
                else if (currentIndex === PROJECTS.length - 1) handleScroll(footerRef)
                else handleScroll(projectRefs.current[currentIndex + 1])
              }}
            >
              <span className="text-[10px] md:text-xs font-mono uppercase tracking-[0.4em] text-white/40 group-hover:text-white group-hover:tracking-[0.6em] transition-all duration-500">
                {currentIndex === -1 ? PROJECTS[0].title : (currentIndex === PROJECTS.length - 1 ? "Contato" : PROJECTS[currentIndex + 1].title)}
              </span>
              <motion.div 
                animate={{ y: [0, 6, 0] }} 
                transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
                // Aumento de padding e brilho no hover
                className="p-3 md:p-4 border border-white/20 bg-black/60 backdrop-blur-xl rounded-full group-hover:bg-white group-hover:border-white transition-all duration-500 shadow-[0_0_20px_rgba(255,255,255,0.1)] group-hover:shadow-[0_0_30px_rgba(255,255,255,0.3)]"
              >
                {/* Ícone maior (w-6 h-6) */}
                <ChevronDown className="w-6 h-6 md:w-8 md:h-8 text-white group-hover:text-black transition-colors" />
              </motion.div>
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </>
  )
}