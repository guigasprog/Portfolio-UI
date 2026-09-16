import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { ChevronUp, ChevronDown } from 'lucide-react'
import { PROJECTS } from '../../constants/projects'

export default function ScrollNavigation({ heroRef, aboutRef, projectRefs, footerRef }) {
  const { scrollYProgress } = useScroll()
  const [index, setIndex] = useState(0)

  // Rótulos são estáticos e podem ser lidos no render. As refs ficam separadas
  // e só são acessadas dentro de handlers (scroll/clique) — ler `.current`
  // durante o render não é reativo e o React desencoraja.
  const LABELS = ['Início', 'Sobre', ...PROJECTS.map((projeto) => projeto.title), 'Contato']

  // A ordem aqui é a ordem real das seções na página. Como a seção atual vem da
  // posição de cada elemento, inserir uma seção nova não exige recalcular
  // faixas de scroll na mão.
  //
  // Devolve ELEMENTOS, não objetos de ref: os cartões agora são preenchidos por
  // callback ref, e misturar as duas formas na mesma lista obrigaria quem lê a
  // adivinhar qual é qual.
  const getElementos = () => [
    heroRef.current,
    aboutRef.current,
    ...projectRefs.current,
    footerRef.current,
  ]

  useMotionValueEvent(scrollYProgress, 'change', () => {
    const centroViewport = window.innerHeight / 2
    let maisProximo = 0
    let menorDistancia = Infinity

    getElementos().forEach((el, i) => {
      if (!el) return
      const rect = el.getBoundingClientRect()
      const distancia = Math.abs(rect.top + rect.height / 2 - centroViewport)
      if (distancia < menorDistancia) {
        menorDistancia = distancia
        maisProximo = i
      }
    })

    setIndex(maisProximo)
  })

  const irPara = (i) => {
    getElementos()[i]?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }

  const anterior = LABELS[index - 1]
  const proximo = LABELS[index + 1]

  return (
    <div className="fixed right-4 md:right-10 top-1/2 -translate-y-1/2 z-[40] flex flex-col items-center gap-10 md:gap-14 pointer-events-none">

      {/* Botão UP */}
      <AnimatePresence>
        {anterior && (
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="group flex flex-col items-center gap-2 pointer-events-auto"
            onClick={() => irPara(index - 1)}
          >
            <span className="hidden md:block text-[9px] font-mono uppercase tracking-[0.2em] text-white/20 group-hover:text-white transition-colors duration-300 max-w-[12ch] text-center">
              {anterior}
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
        {proximo && (
          <motion.button
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="group flex flex-col items-center gap-2 pointer-events-auto"
            onClick={() => irPara(index + 1)}
          >
            <motion.div
              animate={{ y: [0, 4, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="p-2 border border-white/10 bg-black/50 backdrop-blur-md rounded-full group-hover:border-white/40 transition-colors"
            >
              <ChevronDown className="w-4 h-4 text-white" />
            </motion.div>
            <span className="hidden md:block text-[9px] font-mono uppercase tracking-[0.2em] text-white/20 group-hover:text-white transition-colors duration-300 max-w-[12ch] text-center">
              {proximo}
            </span>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  )
}
