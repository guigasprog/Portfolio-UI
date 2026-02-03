import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { ChevronUp, ChevronDown } from 'lucide-react'
import { PROJECTS } from '../../constants/projects'

export default function ScrollNavigation({ heroRef, projectRefs, footerRef }) {
  const { scrollYProgress } = useScroll()
  const [currentIndex, setCurrentIndex] = useState(-1) // -1: Hero, 0+: Projetos, 99: Footer

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest < 0.1) setCurrentIndex(-1)
    else if (latest > 0.9) setCurrentIndex(99)
    else {
      const index = Math.floor((latest - 0.1) * (PROJECTS.length / 0.8))
      setCurrentIndex(Math.min(index, PROJECTS.length - 1))
    }
  })

  const handleScroll = (ref) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }

  // Labels dinâmicos
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
    <div className="fixed right-4 md:right-10 top-1/2 -translate-y-1/2 z-[40] flex flex-col items-center gap-10 md:gap-14 pointer-events-none">
      
      {/* Botão UP */}
      <AnimatePresence>
        {currentIndex !== -1 && (
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="group flex flex-col items-center gap-2 pointer-events-auto"
            onClick={() => {
              if (currentIndex === 0) handleScroll(heroRef)
              else if (currentIndex === 99) handleScroll(projectRefs.current[PROJECTS.length - 1])
              else handleScroll(projectRefs.current[currentIndex - 1])
            }}
          >
            <span className="text-[0.8rem] font-mono uppercase tracking-[0.2em] text-white/20 group-hover:text-white transition-colors duration-300">
              {getPrevLabel()}
            </span>
            <motion.div 
              animate={{ y: [0, -4, 0] }} 
              transition={{ repeat: Infinity, duration: 2 }}
              className="p-2 border border-white/10 bg-black/50 backdrop-blur-md rounded-full group-hover:border-white/40 transition-colors"
            >
              <ChevronUp className="w-4 h-4 text-white" />
            </motion.div>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Botão DOWN */}
      <AnimatePresence>
        {currentIndex !== 99 && (
          <motion.button
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="group flex flex-col items-center gap-2 pointer-events-auto"
            onClick={() => {
              if (currentIndex === -1) handleScroll(projectRefs.current[0])
              else if (currentIndex === PROJECTS.length - 1) handleScroll(footerRef)
              else handleScroll(projectRefs.current[currentIndex + 1])
            }}
          >
            <motion.div 
              animate={{ y: [0, 4, 0] }} 
              transition={{ repeat: Infinity, duration: 2 }}
              className="p-2 border border-white/10 bg-black/50 backdrop-blur-md rounded-full group-hover:border-white/40 transition-colors"
            >
              <ChevronDown className="w-4 h-4 text-white" />
            </motion.div>
            <span className="text-[0.8rem] font-mono uppercase tracking-[0.2em] text-white/20 group-hover:text-white transition-colors duration-300">
              {getNextLabel()}
            </span>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  )
}