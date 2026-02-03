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
      // Ajuste de sensibilidade para a lista de projetos
      const step = 0.9 / PROJECTS.length
      const index = Math.floor((latest - 0.05) / step)
      setCurrentIndex(Math.min(index, PROJECTS.length - 1))
    }
  })

  const handleScroll = (ref) => {
    if (ref?.current) {
      ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  // Helpers de Label
  const getNextLabel = () => {
    if (currentIndex === -1) return PROJECTS[0].title
    if (currentIndex >= PROJECTS.length - 1) return "Contato"
    return PROJECTS[currentIndex + 1].title
  }

  const getPrevLabel = () => {
    if (currentIndex === 0) return "Início"
    if (currentIndex === 99) return PROJECTS[PROJECTS.length - 1].title
    return PROJECTS[currentIndex - 1]?.title || "Início"
  }

  return (
    <>
      {/* --- SETA TOPO (VOLTAR) --- */}
      {/* Posicionada no Topo Central */}
      <div className="fixed top-8 left-1/2 -translate-x-1/2 z-[50] pointer-events-none">
        <AnimatePresence>
          {currentIndex !== -1 && (
            <motion.button
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="group flex flex-col items-center gap-2 pointer-events-auto cursor-pointer"
              onClick={() => {
                if (currentIndex === 0) handleScroll(heroRef)
                else if (currentIndex === 99) handleScroll(projectRefs.current[PROJECTS.length - 1])
                else handleScroll(projectRefs.current[currentIndex - 1])
              }}
            >
              <motion.div 
                animate={{ y: [0, -6, 0] }} 
                transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
                className="p-3 border border-white/20 bg-black/60 backdrop-blur-xl rounded-full group-hover:bg-white group-hover:border-white transition-all duration-500"
              >
                <ChevronUp className="w-6 h-6 text-white group-hover:text-black transition-colors" />
              </motion.div>
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/40 group-hover:text-white transition-colors">
                {getPrevLabel()}
              </span>
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* --- SETA BASE (AVANÇAR) --- */}
      {/* Posicionada na Base Central */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[50] pointer-events-none">
        <AnimatePresence>
          {currentIndex !== 99 && (
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="group flex flex-col items-center gap-2 pointer-events-auto cursor-pointer"
              onClick={() => {
                if (currentIndex === -1) handleScroll(projectRefs.current[0])
                else if (currentIndex === PROJECTS.length - 1) handleScroll(footerRef)
                else handleScroll(projectRefs.current[currentIndex + 1])
              }}
            >
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/40 group-hover:text-white transition-colors">
                {getNextLabel()}
              </span>
              <motion.div 
                animate={{ y: [0, 6, 0] }} 
                transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
                className="p-3 border border-white/20 bg-black/60 backdrop-blur-xl rounded-full group-hover:bg-white group-hover:border-white transition-all duration-500"
              >
                <ChevronDown className="w-6 h-6 text-white group-hover:text-black transition-colors" />
              </motion.div>
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </>
  )
}