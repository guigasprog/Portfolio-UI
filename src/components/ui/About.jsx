import { motion } from 'framer-motion'

const STACK = [
  {
    area: 'Frontend',
    itens: ['React', 'React Native', 'Tailwind CSS', 'Framer Motion', 'Three.js / R3F'],
  },
  {
    area: 'Backend',
    itens: ['Node.js', 'Express', 'Socket.io', 'PostgreSQL', 'Firebase'],
  },
  {
    area: 'Produto',
    itens: ['UI/UX', 'Arquitetura de Software', 'Design System', 'Stripe'],
  },
]

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
}

const item = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
}

export default function About() {
  return (
    // pr maior no mobile: a navegação lateral é fixed e passaria por cima do texto
    <section className="relative min-h-screen w-full flex items-center pl-6 pr-16 md:px-6 py-24 md:py-32">
      {/* A esfera 3D é uma nuvem de palavras em movimento — sem um painel forte
          atrás, ela compete com o texto e destrói a legibilidade. As bordas em
          gradiente evitam que isso vire uma caixa preta chapada no meio da rolagem. */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-black/90 backdrop-blur-md" />
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black to-transparent" />
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-120px' }}
        className="relative z-10 w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20"
      >
        {/* Coluna esquerda: manifesto */}
        <div className="min-w-0">
          <motion.span
            variants={item}
            className="block text-[10px] md:text-xs font-mono text-white/30 uppercase tracking-[0.3em] mb-8"
          >
            01 / Sobre
          </motion.span>

          <motion.h2
            variants={item}
            className="text-5xl md:text-7xl font-black uppercase tracking-tighter italic leading-[0.8] text-white"
          >
            Construo <br /> Sistemas <br />
            <span className="text-neutral-600">Que Aguentam.</span>
          </motion.h2>

          <motion.div variants={item} className="mt-10 flex items-center gap-4">
            <span className="h-px w-12 bg-white/20" />
            <span className="text-[10px] md:text-xs font-mono text-white/30 uppercase tracking-[0.2em]">
              Assis, SP • Brasil
            </span>
          </motion.div>
        </div>

        {/* Coluna direita: bio + stack */}
        <div className="flex flex-col gap-12 min-w-0">
          <div className="space-y-5">
            <motion.p variants={item} className="text-white/60 font-mono text-sm leading-relaxed max-w-md">
              Tech Lead fullstack. Meu trabalho vive na fronteira entre arquitetura e interface —
              mensageria em tempo real, apps mobile que aguentam uso diário e plataformas de venda
              que precisam funcionar no primeiro clique.
            </motion.p>
            <motion.p variants={item} className="text-white/40 font-mono text-sm leading-relaxed max-w-md">
              Gosto de projeto onde a decisão técnica aparece na experiência: latência que some,
              interface que não trava, fluxo que o usuário entende sem manual.
            </motion.p>
          </div>

          <div className="flex flex-col gap-8">
            {STACK.map((grupo) => (
              <motion.div key={grupo.area} variants={item}>
                <span className="block text-[10px] font-mono text-white/30 uppercase tracking-[0.2em] mb-4">
                  {grupo.area}
                </span>
                <div className="flex flex-wrap gap-2">
                  {grupo.itens.map((nome) => (
                    <span
                      key={nome}
                      className="border border-white/10 bg-white/5 px-3 py-2 text-xs font-mono uppercase tracking-wider text-white/70 hover:border-white/40 hover:text-white transition-colors"
                    >
                      {nome}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  )
}
