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
      ref.current.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }

  return (
    <>
      {/* SETA TOPO - VOLTAR */}
      <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[100] pointer-events-none">
        <AnimatePresence>
          {currentIndex !== -1 && (
            <motion.button
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="group flex flex-col items-center gap-1 pointer-events-auto cursor-pointer"
              onClick={() => {
                if (currentIndex === 0) handleScroll(heroRef)
                else if (currentIndex === 99) handleScroll(projectRefs.current[PROJECTS.length - 1])
                else handleScroll(projectRefs.current[currentIndex - 1])
              }}
            >
              <motion.div 
                animate={{ y: [0, -4, 0] }} 
                transition={{ repeat: Infinity, duration: 2 }}
                className="p-1.5 border border-white/10 bg-black/50 backdrop-blur-md rounded-full group-hover:border-white/40 transition-colors"
              >
                <ChevronUp className="w-4 h-4 text-white" />
              </motion.div>
              <span className="text-[8px] font-mono uppercase tracking-[0.2em] text-white/40 group-hover:text-white transition-all">
                {currentIndex === 99 ? PROJECTS[PROJECTS.length-1].title : (currentIndex === 0 ? "Início" : PROJECTS[currentIndex-1]?.title)}
              </span>
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* SETA BASE - AVANÇAR */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] pointer-events-none">
        <AnimatePresence>
          {currentIndex !== 99 && (
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="group flex flex-col items-center gap-1 pointer-events-auto cursor-pointer"
              onClick={() => {
                if (currentIndex === -1) handleScroll(projectRefs.current[0])
                else if (currentIndex === PROJECTS.length - 1) handleScroll(footerRef)
                else handleScroll(projectRefs.current[currentIndex + 1])
              }}
            >
              <span className="text-[8px] font-mono uppercase tracking-[0.2em] text-white/40 group-hover:text-white transition-all">
                {currentIndex === -1 ? PROJECTS[0].title : (currentIndex === PROJECTS.length - 1 ? "Contato" : PROJECTS[currentIndex + 1].title)}
              </span>
              <motion.div 
                animate={{ y: [0, 4, 0] }} 
                transition={{ repeat: Infinity, duration: 2 }}
                className="p-1.5 border border-white/10 bg-black/50 backdrop-blur-md rounded-full group-hover:border-white/40 transition-colors"
              >
                <ChevronDown className="w-4 h-4 text-white" />
              </motion.div>
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </>
  )
}