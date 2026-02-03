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

  // Configuração de animação para os botões
  const buttonVariants = {
    initial: { scale: 0.8, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    hover: { scale: 1.1, backgroundColor: "rgba(255, 255, 255, 0.1)" },
    tap: { scale: 0.95 }
  }

  return (
    <div className="fixed right-6 md:right-12 top-1/2 -translate-y-1/2 z-[50] flex flex-col items-center gap-8 pointer-events-none mix-blend-difference">
      
      {/* Botão UP */}
      <AnimatePresence mode='wait'>
        {currentIndex !== -1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="flex flex-col items-center gap-3 pointer-events-auto group cursor-pointer"
            onClick={() => {
              if (currentIndex === 0) handleScroll(heroRef)
              else if (currentIndex === 99) handleScroll(projectRefs.current[PROJECTS.length - 1])
              else handleScroll(projectRefs.current[currentIndex - 1])
            }}
          >
            {/* Label */}
            <span className="text-xs font-bold tracking-widest text-gray-500 group-hover:text-white transition-colors duration-300 uppercase drop-shadow-md">
              {getPrevLabel()}
            </span>

            {/* Circle Button */}
            <motion.div 
              variants={buttonVariants}
              initial="initial"
              animate="animate"
              whileHover="hover"
              whileTap="tap"
              className="w-12 h-12 flex items-center justify-center rounded-full border border-white/20 bg-black/40 backdrop-blur-md shadow-[0_0_15px_rgba(0,0,0,0.5)] group-hover:border-white transition-colors duration-300"
            >
              <ChevronUp className="w-6 h-6 text-white" strokeWidth={1.5} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Linha conectora estética (opcional, dá um ar mais tech) */}
      <div className="w-px h-12 bg-gradient-to-b from-transparent via-white/20 to-transparent" />

      {/* Botão DOWN */}
      <AnimatePresence mode='wait'>
        {currentIndex !== 99 && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex flex-col items-center gap-3 pointer-events-auto group cursor-pointer"
            onClick={() => {
              if (currentIndex === -1) handleScroll(projectRefs.current[0])
              else if (currentIndex === PROJECTS.length - 1) handleScroll(footerRef)
              else handleScroll(projectRefs.current[currentIndex + 1])
            }}
          >
            {/* Circle Button */}
            <motion.div 
              variants={buttonVariants}
              initial="initial"
              animate="animate"
              whileHover="hover"
              whileTap="tap"
              className="w-12 h-12 flex items-center justify-center rounded-full border border-white/20 bg-black/40 backdrop-blur-md shadow-[0_0_15px_rgba(0,0,0,0.5)] group-hover:border-white transition-colors duration-300"
            >
              <ChevronDown className="w-6 h-6 text-white" strokeWidth={1.5} />
            </motion.div>

            {/* Label */}
            <span className="text-xs font-bold tracking-widest text-gray-500 group-hover:text-white transition-colors duration-300 uppercase drop-shadow-md text-center max-w-[120px]">
              {getNextLabel()}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}